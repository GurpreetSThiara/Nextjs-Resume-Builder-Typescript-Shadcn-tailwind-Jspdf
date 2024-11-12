"use client"
import Head from 'next/head'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from 'lucide-react'

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      // This is a placeholder for the actual email sending logic
      // You would need to implement this on your server or use a service like EmailJS
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      console.log('Sending email to yourfreeresumebuilder@gmail.com', data)
      setFormStatus('sent')
    } catch (error) {
      console.error('Failed to send email', error)
      setFormStatus('error')
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us | Free ATS-Friendly Resume Builder</title>
        <meta name="description" content="Get in touch with our team for any questions or support regarding our free ATS-friendly resume builder." />
        <meta name="keywords" content="contact, support, resume builder, ATS-friendly" />
      </Head>
      <div className="min-h-screen bg-gray-100">

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Mail className="mr-2 text-purple-500" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input id="name" name="name" placeholder="Your Name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <Input id="subject" name="subject" placeholder="How can we help?" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-500 text-white hover:bg-purple-600"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
                {formStatus === 'sent' && (
                  <p className="text-green-600 text-center">Message sent successfully!</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
                )}
              </form>
            </CardContent>
          </Card>
        </main>
    
      </div>
    </>
  )
}