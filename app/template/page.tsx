'use client'

import React, { useState, useCallback, useMemo } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, ArrowRight } from 'lucide-react'

import resume1 from '../../public/images/1.png'
import resume2 from '../../public/images/2.png'
import resume3 from '../../public/images/3.png'
import TemplatesRouteHead from '@/components/seo/TemplatesRouteHead'




const templates = [
  {
    id: 1,
    name: 'Classic Professional',
    description: 'A timeless design suitable for traditional industries.',
    image: resume1,
  },
  {
    id: 2,
    name: 'Modern Professional',
    description: 'A contemporary layout ideal for creative professionals.',
    image: resume2,
  },
  {
    id: 3,
    name: 'Impact Professional',
    description: 'A contemporary layout ideal for creative professionals.',
    image: resume3,
  },
]

const Template = React.memo(({ name, description, image }: { name: string, description: string, image: StaticImageData }) => (
  <Card className="w-full shadow-lg border-none max-w-md bg-white hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-gray-800">{name}</CardTitle>
      <CardDescription className="text-gray-600">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Image
        src={image}
        alt={`${name} resume template`}
        width={300}
        height={400}
        layout="responsive"
        className="rounded-md border"
      />
    </CardContent>
    <CardFooter className="flex justify-between">
      <Link href={`/template/${name.split(' ')[0].toLowerCase()}`}>
        <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">Details</Button>
      </Link>
      <Link href={`/template/${name.split(' ')[0].toLowerCase()}/create`}>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Use This Template
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </CardFooter>
  </Card>
))

Template.displayName = 'Template'

export default function ResumeTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTemplates = useMemo(() => {
    return templates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <>
    <TemplatesRouteHead/>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 text-gray-900">
            Professional <span className="text-purple-600">Resume</span> Templates
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose from our collection of professional resume templates. Find the perfect design to showcase your skills and experience.
          </p>
          <div className="max-w-md mx-auto">
            <Label htmlFor="search" className="sr-only">Search Templates</Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                id="search"
                placeholder="Search by name or description"
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow"
              />
              <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <Template key={template.id} {...template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No templates found matching your search criteria.</p>
        )}

        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Create Your Perfect <span className="text-purple-600">Resume</span>?
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Start building your career-changing resume with our easy-to-use templates.
            100% free - no catches, no hidden fees.
          </p>
          <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
      </div>
    </div></>
  )
}