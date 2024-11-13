'use client'

import React, { useState, useCallback, useMemo } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from 'lucide-react'

// Assuming you have these images in your public folder
import resume1 from '../../public/images/1.png'
import resume2 from '../../public/images/2.png'
import Link from 'next/link'

// SEO metadata
//  const metadata = {
//   title: 'Professional Resume Templates | Create Your Perfect CV',
//   description: 'Choose from our collection of professional resume templates. Find the perfect design to showcase your skills and experience.',
//   keywords: 'resume templates, CV designs, professional resumes, job application',
// }

// Template data
const templates = [
  {
    id: 1,
    name: 'Classic Professional',
    description: 'A timeless design suitable for traditional industries.',
    image: resume1,
  },
  {
    id: 2,
    name: 'Modern Creative',
    description: 'A contemporary layout ideal for creative professionals.',
    image: resume2,
  },

  // Add more templates as needed
]

// Memoized Template component
const Template = React.memo(({ name, description, image }:{name:string,description:string, image:StaticImageData}) => (
  <Card className="w-full shadow-none border-none max-w-md">
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{description}</CardDescription>
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
    <CardFooter>
     <Link href={`/template/${name.split(' ')[0]}/create`}>
     <Button>Use This Template</Button>
     </Link>
     <Link href={`/template/${name.split(' ')[0]}`}>
     <Button>Details</Button>
     </Link>
    </CardFooter>
  </Card>
))

Template.displayName = 'Template'

const ResumeTemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Memoized filtered templates
  const filteredTemplates = useMemo(() => {
    return templates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Callback for search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Professional Resume Templates</h1>
      
      <div className="mb-8">
        <Label htmlFor="search">Search Templates</Label>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            id="search"
            placeholder="Search by name or description"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map(template => (
          <Template key={template.id} {...template} />
        ))}
      </div>
    </div>
  )
}

export default ResumeTemplatesPage