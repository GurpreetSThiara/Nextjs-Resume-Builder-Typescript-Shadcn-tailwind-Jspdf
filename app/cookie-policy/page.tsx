import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy | Free ATS-Friendly Resume Builder</title>
        <meta name="description" content="Learn about our Cookie Policy and how we respect your privacy while using our free ATS-friendly resume builder." />
        <meta name="keywords" content="cookie policy, no cookies, resume builder, privacy" />
      </Head>
      <div className="flex flex-col min-h-screen">
    
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-purple-500 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
              <p className="text-xl mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </section>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Card>
                <CardHeader>
                  <CardTitle>1. No Cookies in Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We do not use cookies or similar tracking technologies on our website. As we do not require signups or store any personal data, we do not collect any information through cookies.</p>
                </CardContent>
              </Card>
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>2. Why We Don&apos;t Use Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our website focuses on providing a simple and efficient resume-building tool, and we respect your privacy. Since there is no need for user accounts or cloud storage, there are no cookies used to track or store information about your activity.</p>
                </CardContent>
              </Card>
            </div>
          </section>
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Questions About Our Cookie Policy?</h2>
              <p className="text-xl mb-8">If you have any questions about our Cookie Policy, please don&apos;t hesitate to contact us.</p>
              <Button className="bg-purple-500 text-white hover:bg-purple-600">Contact Us</Button>
            </div>
          </section>
        </main>
     
      </div>
    </>
  )
}
