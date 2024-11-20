"use client"

import { FileText, Menu, X } from 'lucide-react'
import Link from "next/link"
import React, { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)
  const closeDrawer = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-[10000] w-full backdrop-blur-lg bg-white/75 border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleDrawer}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
            <nav className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
              <div className="p-6 border-b border-gray-200">
                <Link className="flex items-center" href="/" onClick={closeDrawer}>
                  <FileText className="h-8 w-8 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    Free{" "}
                    <span className="bg-gradient-to-r from-yellow-500 to-yellow-800 font-extrabold text-3xl text-transparent bg-clip-text bg-[length:100%_100%] bg-no-repeat selection:bg-yellow-400 selection:text-white">
                      Resume
                    </span>{" "}
                    ATS
                  </span>
                </Link>
              </div>
              <div className="flex-grow overflow-y-auto py-6">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    className={cn(
                      "flex items-center text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors p-4 border-l-4 border-transparent hover:border-purple-600 hover:bg-purple-50",
                      index === 0 && "mt-2"
                    )}
                    href={item.href}
                    onClick={closeDrawer}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="p-6 border-t border-gray-200">
                <Button className="w-full" onClick={closeDrawer}>
                  Close Menu
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link className="flex items-center justify-center md:absolute md:left-4" href="/">
          <FileText className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Free{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-800 font-extrabold text-3xl text-transparent bg-clip-text bg-[length:100%_100%] bg-no-repeat selection:bg-yellow-400 selection:text-white">
              Resume
            </span>{" "}
            ATS
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8 items-center justify-center flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="text-base font-bold text-gray-700 hover:text-purple-600 transition-colors"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:absolute md:right-4">
          {/* Placeholder for potential right-side content */}
        </div>
      </div>
    </header>
  )
}

export default Navbar