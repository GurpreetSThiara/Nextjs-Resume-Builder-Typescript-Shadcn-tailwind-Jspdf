'use client'

import React, { useState, useRef } from 'react'
import { PDFDocument, PageSizes, degrees } from 'pdf-lib'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Trash, Plus, Save } from 'lucide-react'

export default function PDFEditor() {
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const loadPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    setPdfDoc(pdf)
    setPageCount(pdf.getPageCount())
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) loadPDF(file)
  }

  const convertImageToPDF = async (file: File) => {
    const image = await file.arrayBuffer()
    const pdf = await PDFDocument.create()
    const page = pdf.addPage(PageSizes.A4)
    
    let embeddedImage
    if (file.type === 'image/jpeg') {
      embeddedImage = await pdf.embedJpg(image)
    } else if (file.type === 'image/png') {
      embeddedImage = await pdf.embedPng(image)
    } else {
      throw new Error('Unsupported image type')
    }

    const { width, height } = embeddedImage.scale(1)
    const aspectRatio = width / height
    const pageAspectRatio = page.getWidth() / page.getHeight()

    let scaleFactor
    if (aspectRatio > pageAspectRatio) {
      scaleFactor = page.getWidth() / width
    } else {
      scaleFactor = page.getHeight() / height
    }

    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: width * scaleFactor,
      height: height * scaleFactor,
    })

    setPdfDoc(pdf)
    setPageCount(pdf.getPageCount())
  }

  const addImageToPDF = async (file: File) => {
    if (!pdfDoc) return

    const image = await file.arrayBuffer()
    let embeddedImage
    if (file.type === 'image/jpeg') {
      embeddedImage = await pdfDoc.embedJpg(image)
    } else if (file.type === 'image/png') {
      embeddedImage = await pdfDoc.embedPng(image)
    } else {
      throw new Error('Unsupported image type')
    }

    const page = pdfDoc.addPage(PageSizes.A4)
    const { width, height } = embeddedImage.scale(1)
    const aspectRatio = width / height
    const pageAspectRatio = page.getWidth() / page.getHeight()

    let scaleFactor
    if (aspectRatio > pageAspectRatio) {
      scaleFactor = page.getWidth() / width
    } else {
      scaleFactor = page.getHeight() / height
    }

    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: width * scaleFactor,
      height: height * scaleFactor,
    })

    setPdfDoc(pdfDoc)
    setPageCount(pdfDoc.getPageCount())
  }

  const removePage = (pageIndex: number) => {
    if (!pdfDoc) return
    pdfDoc.removePage(pageIndex)
    setPdfDoc(pdfDoc)
    setPageCount(pdfDoc.getPageCount())
  }

  const movePage = (fromIndex: number, toIndex: number) => {
    if (!pdfDoc) return
    const page = pdfDoc.removePage(fromIndex)
    pdfDoc.insertPage(toIndex, page)
    setPdfDoc(pdfDoc)
  }

  const savePDF = async () => {
    if (!pdfDoc) return
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'edited_document.pdf'
    link.click()
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>PDF Maker and Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="pdf-upload">Upload PDF</Label>
            <Input 
              id="pdf-upload" 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange} 
              ref={fileInputRef}
            />
          </div>
          
          <div>
            <Label htmlFor="image-upload">Upload Image</Label>
            <Input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              ref={imageInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  if (pdfDoc) {
                    addImageToPDF(file)
                  } else {
                    convertImageToPDF(file)
                  }
                }
              }}
            />
          </div>

          {pageCount > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Pages</h3>
              {Array.from({ length: pageCount }, (_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span>Page {i + 1}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => removePage(i)}
                    aria-label={`Remove page ${i + 1}`}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => movePage(i, Math.max(0, i - 1))}
                    disabled={i === 0}
                    aria-label={`Move page ${i + 1} up`}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => movePage(i, Math.min(pageCount - 1, i + 1))}
                    disabled={i === pageCount - 1}
                    aria-label={`Move page ${i + 1} down`}
                  >
                    <ArrowUpDown className="h-4 w-4 rotate-180" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex space-x-2">
            <Button onClick={() => fileInputRef.current?.click()}>
              <Plus className="mr-2 h-4 w-4" /> Add PDF
            </Button>
            <Button onClick={() => imageInputRef.current?.click()}>
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
            <Button onClick={savePDF} disabled={!pdfDoc}>
              <Save className="mr-2 h-4 w-4" /> Save PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}