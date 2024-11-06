"use client"

import Link from 'next/link'
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Edit, Download, Share2,  ArrowRight, Search, Users, BarChart,  Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter();

  const navigate = () => {
    router.push('/create')
  }
  return (
    <>
      <Head>
        <title>Free Resume Builder | Create ATS-Friendly Resumes | FreeResumeATS</title>
        <meta name="description" content="Create professional, ATS-friendly resumes for free with FreeResumeATS. Our AI-powered resume builder helps you craft the perfect CV to land your dream job." />
        <meta name="keywords" content="resume, resume builder, free resume, CV, curriculum vitae, free CV, resume maker, ATS-friendly resume, job application" />
        <link rel="canonical" href="https://freeresumeats.com" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/75 border-b border-gray-200">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link className="flex items-center justify-center" href="/">
              <FileText className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">FreeResumeATS</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="#features">Features</Link>
              <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="#how-it-works">How It Works</Link>
              <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="#testimonials">Testimonials</Link>
              <Link className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors" href="#faq">FAQ</Link>
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
          </div>
        </header>
        
        <main className="flex-1 z-50">
          <section className="relative overflow-hidden py-20 md:py-32 lg:py-48">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 pointer-events-none" />
            <div className="relative container mx-auto px-4 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 text-white">
                Create Your Perfect <span className="text-yellow-400">Resume</span> for Free
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Craft ATS-friendly <span className="font-semibold text-yellow-400">resumes</span> that land interviews. 
                Powered by AI, 100% free, no hidden charges.
              </p>

<div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={navigate} size="lg" className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                  Build Your Resume Now
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px] pointer-events-none" />
          </section>
          
          <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Powerful <span className="text-purple-600">Resume</span> Building Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: Search, title: "ATS-Optimized Templates", description: "Our resume templates are designed to pass through Applicant Tracking Systems with ease." },
                  { icon: Edit, title: "Easy Resume Editing", description: "Intuitive interface for quick and easy resume creation and editing." },
                  { icon: Download, title: "Multiple CV Formats", description: "Download your resume or CV in PDF, DOCX, or TXT formats - all for free." },
                  { icon: Share2, title: "Easy Resume Sharing", description: "Share your resume directly with employers or on social media at no cost." },
                  { icon: Users, title: "Industry-Specific Templates", description: "Choose from a variety of free resume templates tailored to your industry." },
                  { icon: BarChart, title: "Resume Analytics", description: "Get insights on how your resume performs - completely free." },
                ].map((feature, index) => (
                  <Card key={index} className="bg-gray-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <feature.icon className="h-8 w-8 text-purple-600 mb-2" />
                      <CardTitle className="text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-100 to-indigo-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                How Our Free <span className="text-purple-600">Resume</span> Maker Works
              </h2>
              <div className="max-w-4xl mx-auto">
                {[
                  { title: "Choose a Resume Template", description: "Select from our wide range of ATS-friendly resume templates." },
                  { title: "Fill in Your CV Details", description: "Our AI assists you in adding your information effectively to your curriculum vitae." },
                  { title: "Download and Apply", description: "Get your polished resume or CV instantly - no payment required!" },
                ].map((step, index) => (
                  <div key={index} className="flex items-start mb-8">
                    <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>


</div>
                ))}
              </div>
            </div>
          </section>
          
          <section id="testimonials" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                What Users Say About Our Free <span className="text-purple-600">Resume</span> Builder
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Alex Johnson",
                    role: "Software Engineer",
                    content: "I can't believe this amazing resume builder is completely free! FreeResumeATS helped me land interviews at top tech companies."
                  },
                  {
                    name: "Sarah Lee",
                    role: "Marketing Specialist",
                    content: "The ATS-friendly resume templates and AI suggestions made my CV stand out. I got calls from 3 companies within a week!"
                  },
                  {
                    name: "Michael Brown",
                    role: "Recent Graduate",
                    content: "As a recent grad, I was struggling with my resume. This free resume maker made the process so easy, and it didn't cost me a dime!"
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="bg-gray-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <p className="text-gray-600 mb-4">{testimonial.content}</p>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          <section id="faq" className="py-20 bg-gradient-to-br from-purple-100 to-indigo-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto">
                {[
                  {
                    question: "Is FreeResumeATS really a free resume builder?",
                    answer: "Yes, FreeResumeATS is 100% free. We don't have any hidden charges or premium features. All our resume building tools and services are available to everyone at no cost."
                  },
                  {
                    question: "How does this free resume maker generate income?",
                    answer: "We're supported by partnerships with job boards and educational institutions. This allows us to keep our resume builder services completely free for job seekers."
                  },
                  {
                    question: "Can I really create an ATS-friendly resume for free?",
                    answer: "Our platform is designed to create resumes and CVs that are optimized for Applicant Tracking Systems, and it's all available for free."
                  },
                  {
                    question: "How often can I update my resume or CV?",
                    answer: "You can update your resume or CV as often as you like. There are no limits on edits or downloads with our free resume builder."
                  },
                  {
                    question: "Is my information secure on this free resume maker?",
                    answer: "Yes, we take data security very seriously. We use encryption and follow best practices to keep your resume information safe."
                  },
                  {
                    question: "Can I get help if I'm stuck while creating my resume?",


answer: "Of course! We offer free customer support and have a comprehensive help center to assist you with our resume builder."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="mb-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-800">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Build Your Perfect <span className="text-yellow-400">Resume</span> for Free?
                </h2>
                <p className="text-xl mb-8 text-purple-100">
                  Join thousands of job seekers who have successfully landed their dream jobs with our free resume builder. 
                  Remember, {"it's"} 100% free - no catches, no hidden fees..
                </p>
                <Button  onClick={navigate}  className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                  Create Your Free Resume Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Press</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
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
      </div>
    </>
  )
}