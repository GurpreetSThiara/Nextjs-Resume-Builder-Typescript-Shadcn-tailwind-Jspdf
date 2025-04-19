"use client";

import { Button } from "@/components/ui/button";
import { signInWithPopup, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function GoogleSignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const { user } = useAuth();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, googleProvider);
      router.refresh();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const showBenefitsModal = () => {
    setShowBenefits(true);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {user ? (
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sign Out
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sign in with Google
          </Button>
        )}
      </div>

      <Dialog open={showBenefits} onOpenChange={setShowBenefits}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Benefits of Signing In</DialogTitle>
            <DialogDescription>
              <ul className="list-disc pl-4 space-y-2 mt-4">
                <li>Save up to 3 resumes in the cloud</li>
                <li>Access your resumes from any device</li>
                <li>Edit and download your resumes anytime</li>
                <li>No need to save files locally</li>
                <li>Automatic backup of your resume data</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={handleSignIn} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign in with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 