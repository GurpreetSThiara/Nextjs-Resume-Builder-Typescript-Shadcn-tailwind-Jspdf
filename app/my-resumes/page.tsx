"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Edit2, Download } from "lucide-react";
import { decompressResumeData } from "@/utils/resumeUtils";
import { ResumeData } from "@/lib/types";

interface SavedResume {
  id: string;
  title: string;
  createdAt: Date;
  data: Uint8Array;
}

export default function MyResumes() {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchResumes = async () => {
  //     if (!auth.currentUser) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const q = query(
  //         collection(db, "resumes"),
  //         where("userId", "==", auth.currentUser.uid)
  //       );
  //       const querySnapshot = await getDocs(q);
  //       const fetchedResumes = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //         createdAt: doc.data().createdAt.toDate(),
  //       })) as SavedResume[];
  //       setResumes(fetchedResumes);
  //     } catch (error) {
  //       console.error("Error fetching resumes:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchResumes();
  // }, []);

  const handleDelete = async (resumeId: string) => {
    try {
      await deleteDoc(doc(db, "resumes", resumeId));
      setResumes((prev) => prev.filter((r) => r.id !== resumeId));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const handleEdit = async (resume: SavedResume) => {
    try {
      const decompressedData = await decompressResumeData(resume.data);
      localStorage.setItem("resumeData", JSON.stringify(decompressedData));
      router.push(`/resume-templates/${resume.title.toLowerCase()}/create`);
    } catch (error) {
      console.error("Error decompressing resume data:", error);
    }
  };

  const handleDownload = async (resume: SavedResume) => {
    try {
      const decompressedData = await decompressResumeData(resume.data);
      localStorage.setItem("resumeData", JSON.stringify(decompressedData));
      router.push(`/resume-templates/${resume.title.toLowerCase()}/create?download=true`);
    } catch (error) {
      console.error("Error decompressing resume data:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Resumes</h1>
      {resumes.length === 0 ? (
        <p className="text-gray-500">We are introducing cloud storage for resumes. Please check back soon. Till you can download your resume and save it to your device. if you want to edit your resume in future you can download a encrypted version of your resume and upload it again to continue editing.</p>
      ) : (
        <div className="grid gap-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{resume.title}</h2>
                <p className="text-gray-500">
                  Created on {resume.createdAt.toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(resume)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDownload(resume)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(resume.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 