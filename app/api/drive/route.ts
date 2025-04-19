import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { googleServiceAccount } from './googleConfig';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const FOLDER_NAME = 'Free_Resume_Builder_000000001';

let driveInstance: ReturnType<typeof google.drive> | null = null;

function getDriveInstance() {
  if (!driveInstance) {
    const auth = new google.auth.JWT({
      email: googleServiceAccount.client_email,
      key: googleServiceAccount.private_key,
      scopes: SCOPES,
    });
    driveInstance = google.drive({ version: 'v3', auth });
  }
  return driveInstance;
}

async function ensureFolder() {
  const drive = getDriveInstance();
  
  try {
    // Check if folder exists
    const response = await drive.files.list({
      q: `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id)',
    });

    if (response.data.files && response.data.files.length > 0) {
      return response.data.files[0].id;
    }

    // Create folder if it doesn't exist
    const fileMetadata = {
      name: FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id',
    });

    return file.data.id;
  } catch (error) {
    console.error('Error ensuring folder exists:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action, fileName, content, fileId } = await req.json();
    const drive = getDriveInstance();

    switch (action) {
      case 'upload': {
        const folderId = await ensureFolder();
        const fileMetadata = {
          name: fileName,
          parents: [folderId],
        };

        const media = {
          mimeType: 'application/octet-stream',
          body: Buffer.from(content, 'base64'),
        };

        const file = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id',
        });

        return NextResponse.json({ fileId: file.data.id });
      }

      case 'download': {
        const response = await drive.files.get(
          { fileId, alt: 'media' },
          { responseType: 'arraybuffer' }
        );
        const buffer = Buffer.from(response.data as ArrayBuffer);
        return NextResponse.json({ content: buffer.toString('base64') });
      }

      case 'delete': {
        await drive.files.delete({ fileId });
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Drive API error:', error);
    return NextResponse.json(
      { error: 'Failed to process Drive API request' },
      { status: 500 }
    );
  }
} 