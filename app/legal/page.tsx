import Head from 'next/head'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Lock } from 'lucide-react'

export default function Legal() {
  return (
    <>
      <Head>
        <title>Legal Information | Free ATS-Friendly Resume Builder</title>
        <meta name="description" content="Important legal information about resume.giveaways4u.com, including our terms of service, privacy policy, and cookie policy." />
        <meta name="keywords" content="legal, terms of service, privacy policy, cookie policy, resume builder" />
      </Head>
      <div className="flex flex-col min-h-screen">
  
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-purple-500 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal Information</h1>
              <p className="text-xl mb-8">Transparency and trust are at the core of our service. Find all our legal documents here.</p>
            </div>
          </section>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 text-purple-500" />
                      Terms of Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Our Terms of Service outline the rules and guidelines for using our resume builder platform.</p>
                    <Link href="/terms" className="text-purple-500 hover:underline">Read Terms of Service</Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 text-purple-500" />
                      Privacy Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Learn how we collect, use, and protect your personal information when you use our services.</p>
                    <Link href="/privacy-policy" className="text-purple-500 hover:underline">Read Privacy Policy</Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 text-purple-500" />
                      Cookie Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Understand how we use cookies and similar technologies to enhance your experience on our website.</p>
                    <Link href="/cookie-policy" className="text-purple-500 hover:underline">Read Cookie Policy</Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Your Data, Your Control</h2>
              <p className="text-center text-xl mb-8">
                Currently, we do not store any of your data on our cloud. You can create resumes without signing up. We plan to introduce cloud services soon, so stay tuned!
              </p>
              <div className="p-2 text-center">
         <Link href={'/create'}>  <Button size="lg" className="text-white bg-purple-600 hover:bg-purple-500  ">
              <h1 className='text-2xl font-bold'>Build Your Resume Now</h1>
            </Button></Link>
           </div>
            </div>
          </section>
        </main>
   
      </div>
    </>
  )
}
