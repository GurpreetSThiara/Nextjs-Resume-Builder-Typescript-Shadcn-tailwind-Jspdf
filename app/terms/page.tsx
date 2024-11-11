import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service | Free ATS-Friendly Resume Builder</title>
        <meta name="description" content="Read our Terms of Service to understand the rules and guidelines for using resume.giveaways4u.com, our free ATS-friendly resume builder." />
        <meta name="keywords" content="terms of service, user agreement, resume builder, legal terms" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-indigo-700 to-indigo-900 text-white py-24">
            <div className="container mx-auto px-8 text-center">
              <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
              <p className="text-xl opacity-80">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </section>
          <section className="py-16 px-4 md:px-8">
            <div className="container mx-auto">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">1. Acceptance of Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      By accessing or using resume.giveaways4u.com, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">2. Use of Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Our resume builder is provided free of charge for personal, non-commercial use. You may not use this service for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-8 md:grid-cols-2 mt-8">
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">3. User Accounts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      You may be required to create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">4. Intellectual Property</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      The content, features, and functionality of resume.giveaways4u.com are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-8 mt-8">
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">5. Limitation of Liability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      resume.giveaways4u.com and its owners, employees, or affiliates shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg rounded-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">6. Changes to Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      We reserve the right to modify or replace these Terms of Service at any time. It is your responsibility to check these Terms periodically for changes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Questions About Our Terms?</h2>
              <p className="text-xl text-gray-600 mb-8">If you have any questions about these Terms of Service, please contact us.</p>
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 py-3 px-6 rounded-lg font-medium">Contact Us</Button>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
