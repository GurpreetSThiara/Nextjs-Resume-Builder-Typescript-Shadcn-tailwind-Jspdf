import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, limit } from 'firebase/firestore';
import { driveService } from './driveService';
import { compressResumeData } from '@/utils/resumeUtils';
import { ResumeData } from './types';

const RESUMES_COLLECTION = 'resumes';
const MAX_RESUMES_PER_USER = 3;

export class ResumeService {
  static async saveResume(userId: string, resumeData: ResumeData): Promise<string> {
    try {
      // Check if user has reached the limit
      const userResumes = await this.getUserResumes(userId);
      if (userResumes.length >= MAX_RESUMES_PER_USER) {
        throw new Error(`You can only save up to ${MAX_RESUMES_PER_USER} resumes.`);
      }

      // Compress and encrypt resume data
      const compressedData = await compressResumeData(resumeData);
      
      // Upload to Google Drive
      const fileName = `resume_${Date.now()}.enc`;
      const fileId = await driveService.uploadFile(fileName, Buffer.from(compressedData));

      // Save reference in Firestore
      const resumeRef = await addDoc(collection(db, RESUMES_COLLECTION), {
        userId,
        fileName,
        fileId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: resumeData.title || 'Untitled Resume',
      });

      return resumeRef.id;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    }
  }

  static async getUserResumes(userId: string) {
    try {
      const resumesQuery = query(
        collection(db, RESUMES_COLLECTION),
        where('userId', '==', userId),
        limit(MAX_RESUMES_PER_USER)
      );

      const snapshot = await getDocs(resumesQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user resumes:', error);
      throw error;
    }
  }

  static async deleteResume(resumeId: string, fileId: string) {
    try {
      // Delete from Google Drive
      await driveService.deleteFile(fileId);
      
      // Delete from Firestore
      await deleteDoc(doc(db, RESUMES_COLLECTION, resumeId));
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  }

  static async downloadResume(fileId: string): Promise<Buffer> {
    try {
      return await driveService.downloadFile(fileId);
    } catch (error) {
      console.error('Error downloading resume:', error);
      throw error;
    }
  }
} 