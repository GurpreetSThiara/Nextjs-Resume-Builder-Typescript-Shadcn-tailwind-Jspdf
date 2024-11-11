import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Free ATS-Friendly Resume Builder</title>
        <meta name="description" content="Read our Privacy Policy to understand how we collect, use, and protect your personal information when you use our free ATS-friendly resume builder." />
        <meta name="keywords" content="privacy policy, data protection, personal information, resume builder" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-indigo-700 to-indigo-900 text-white py-24">
            <div className="container mx-auto px-8 text-center">
              <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-xl opacity-80">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </section>
          <section className="py-16 px-4 md:px-8">
            <div className="container mx-auto">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">1. Information We Collect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      We currently do not store any of your data on our cloud. When you create resumes, no sign-up is required. Any information you enter is not saved unless you choose to download it.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">2. How We Use Your Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      We do not store or misuse your data. Any information entered is only used to generate resumes, and we do not share your personal data with any third parties.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-8 md:grid-cols-2 mt-8">
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">3. Information Sharing and Disclosure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Your data is not shared or sold to third parties. We respect your privacy, and any data you input is only used within the platform for creating resumes.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">4. Data Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Currently, we do not store data on the cloud. We plan to introduce cloud services soon, at which point enhanced data protection measures will be implemented.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-8 mt-8">
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">5. Your Rights and Choices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      You have full control over your data. Since we do not require sign-up or data storage, you can choose to download your resume without creating an account.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">6. Changes to This Policy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      We may update this policy as our services evolve. Any changes will be posted here, so please check this page periodically for updates.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Privacy Matters to Us</h2>
              <p className="text-xl text-gray-600 mb-8">If you have any questions about our Privacy Policy, please don't hesitate to contact us.</p>
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 py-3 px-6 rounded-lg font-medium">Contact Us</Button>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
