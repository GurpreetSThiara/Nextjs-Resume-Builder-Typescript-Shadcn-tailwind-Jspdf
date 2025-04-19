"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Navbar() {
  const [user, setUser] = useState(auth.currentUser);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      setShowSignInModal(true);
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/")}>
            Resume Builder
          </Button>
          {user && (
            <Button variant="ghost" onClick={() => router.push("/my-resumes")}>
              My Resumes
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save as File</DialogTitle>
                <DialogDescription>
                  This option allows you to save your resume data as an encrypted file.
                  You can use this file later to continue editing your resume without signing in.
                  The file is encrypted for security and can only be opened by our application.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/my-resumes")}>
                  My Resumes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => auth.signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <GoogleSignIn />
          )}
        </div>
      </div>

      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
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
            <GoogleSignIn />
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
} 