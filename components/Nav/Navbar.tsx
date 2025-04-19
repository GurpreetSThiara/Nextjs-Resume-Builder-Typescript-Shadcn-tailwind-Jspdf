"use client"

import { FileText, Menu, X, Info } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GoogleSignIn } from "@/components/auth/GoogleSignIn"
import { useAuth } from "@/lib/context/AuthContext"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const [showSignInModal, setShowSignInModal] = useState(false)

  return (
    <header className="sticky top-0 z-[10000] w-full backdrop-blur-lg bg-white/75 border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-1 text-lg hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline">Resume Builder</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/resume-templates"
            className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Create Resume
          </Link>
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
                <DropdownMenuItem asChild>
                  <Link href="/my-resumes">My Resumes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/create" className="md:hidden">Create Resume</Link>
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
    </header>
  )
}

export default Navbar