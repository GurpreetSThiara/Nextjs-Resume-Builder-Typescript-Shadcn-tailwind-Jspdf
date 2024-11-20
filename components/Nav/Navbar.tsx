import { FileText, Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-[10000] w-full backdrop-blur-lg bg-white/75 border-b border-gray-200">
    <div className="container mx-auto px-4 h-16 flex items-center gap-6 ">
      <Link className="flex items-start justify-center" href="/">
        <FileText className="h-8 w-8 text-purple-600" />
        <span className=" l-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Free <span className=" bg-gradient-to-r from-yellow-500 to-yellow-800 font-extrabold text-3xl text-transparent bg-clip-text bg-[length:100%_100%] bg-no-repeat selection:bg-yellow-400 selection:text-white">
Resume
</span> ATS</span>
      </Link>
      <nav className="hidden md:flex items-baseline justify-end space-x-8 ">
      <Link className="text-base font-bold text-gray-700 hover:text-purple-600 hover:text-base transition-colors" href="/">Home</Link>

        <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="/#features">Features</Link>
        <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="/#how-it-works">How It Works</Link>
        {/* <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="/#testimonials">Testimonials</Link> */}
        <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="/blog">Blog</Link>

        <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="/#faq">FAQ</Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col space-y-4">
            <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="#features">Features</Link>
            <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="#how-it-works">How It Works</Link>
            <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="#testimonials">Testimonials</Link>
            <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="#faq">FAQ</Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className=""></div>
    </div>
 
  </header>
  )
}

export default Navbar