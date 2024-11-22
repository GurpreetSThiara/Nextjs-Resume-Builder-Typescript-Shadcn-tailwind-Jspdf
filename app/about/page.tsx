"use client"
import Head from 'next/head'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Rocket, Heart, CheckCircle } from 'lucide-react'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title:"About"
}
export default function AboutUs() {
    const benefits = [
        "ATS-Friendly Templates",
        "Easy-to-Use Builder",
        "Professional Designs",
        "Instant Download",
        "Free to Use"
      ]
    
  return (
    <>
      <Head>
        <title>About Us | Free ATS-Friendly Resume Builder</title>
        <meta name="description" content="Learn about resume.giveaways4u.com, our mission to help job seekers create professional, ATS-friendly resumes, and our commitment to your career success." />
        <meta name="keywords" content="about us, resume builder, career help, ATS-friendly resumes, job search assistance" />
      </Head>
      <div className="flex flex-col min-h-screen">
     
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-purple-500 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About resume.giveaways4u.com</h1>
              <p className="text-xl mb-8">Empowering job seekers with professional, ATS-friendly resumes since 2024</p>
            </div>
          </section>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                  <p className="mb-4">
                  Founded in 2024, resume.giveaways4u.com was born out of a simple yet powerful idea: everyone deserves access to tools that can help them land their dream job, regardless of their financial situation                  </p>
                  <p className="mb-4">
                  Our team of career experts, HR professionals, and tech enthusiasts came together with a shared mission to democratize the job application process. We recognized that many talented individuals were being overlooked simply because their resumes weren&apos;t optimized for modern hiring practices.                  </p>
                  <p>
                  Today, {"we're "}proud to be helping job seekers create professional, ATS-friendly resumes that open doors to exciting career opportunities.                  </p>
                </div>
                <div className="relative">
                <div>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Create Your ATS-Friendly Resume Today
            </h2>
            <p className="text-xl mb-8">
              Stand out from the crowd with a professionally designed resume that beats applicant tracking systems.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
           <div className="p-2">
           <Button size="lg" className="text-white bg-purple-600 hover:bg-purple-500  ">
              <h1 className='text-2xl font-bold'>Build Your Resume Now</h1>
            </Button>
           </div>
          </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 text-purple-500" />
                      Accessibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>We believe that everyone should have access to high-quality resume-building tools, regardless of their financial situation.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Rocket className="mr-2 text-purple-500" />
                      Innovation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>We continuously improve our platform to stay ahead of evolving hiring practices and applicant tracking systems.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="mr-2 text-purple-500" />
                      User-Centric
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Our {"users' success is our success. We're"} committed to providing the best possible experience and support.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="py-16 bg-purple-500 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Launching Soon: Our Community Platform!

</h2>
              <p className="text-xl mb-8">{"We’re "}excited to announce that a new community platform for job seekers and career enthusiasts is coming soon! Until then, feel free to explore this site and download free resume templates to help you land your next role.</p>
              <Button size="lg" className=" text-white ">Create Your Free Resume</Button>
            </div>
          </section>
        </main>
   
      </div>
    </>
  )
}