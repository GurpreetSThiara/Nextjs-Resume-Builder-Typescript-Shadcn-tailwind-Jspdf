import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 flex justify-center items-center">
    <div className="container  px-4">
      <div className="grid mx-auto grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Templates</Link></li>
            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/legal" className="text-gray-300 hover:text-white transition-colors">Legal</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="cookie-policy" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

<div className="mt-12 pt-8 border-t border-gray-700">
        <p className="text-center text-gray-400">
          © 2024 FreeResumeATS. All rights reserved. Free <span className="font-bold text-white">Resume</span> Builder | CV Maker | ATS-Friendly Templates
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer