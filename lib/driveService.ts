class DriveService {
  private static instance: DriveService;

  private constructor() {}

  public static getInstance(): DriveService {
    if (!DriveService.instance) {
      DriveService.instance = new DriveService();
    }
    return DriveService.instance;
  }

  public async uploadFile(fileName: string, content: Buffer): Promise<string> {
    try {
      const response = await fetch('/api/drive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'upload',
          fileName,
          content: content.toString('base64'),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload file');
      }

      const data = await response.json();
      return data.fileId;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  public async downloadFile(fileId: string): Promise<Buffer> {
    try {
      const response = await fetch('/api/drive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'download',
          fileId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const data = await response.json();
      return Buffer.from(data.content, 'base64');
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  public async deleteFile(fileId: string): Promise<void> {
    try {
      const response = await fetch('/api/drive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          fileId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}

export const driveService = DriveService.getInstance(); 