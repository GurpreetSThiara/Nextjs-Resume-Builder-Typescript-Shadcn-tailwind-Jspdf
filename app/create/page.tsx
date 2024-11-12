'use client'

import React, { useState, useRef, useCallback, useMemo } from 'react'

//import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { jsPDF } from "jspdf"
import { PlusCircle,  ChevronDown, File, FileImage } from 'lucide-react'
import { ResumeData } from '@/lib/types'
import { fonts, initialResumeData, themes } from '@/lib/constants'
import ATS1 from '@/components/resume/Ats_1'
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PersonalInfo } from '@/components/Forms/ResumeEditForm/PersonalInfo/PersonalInfo'
import { Section } from '@/components/Forms/ResumeEditForm/Section/Section'
import html2canvas from 'html2canvas'
import { PastelCirclesResume } from '@/components/resume/creative'
import { GoogleDocsResume } from '@/components/resume/google'
import { TechTimelineResume } from '@/components/resume/softwareEng'
import { BoldHeaderResume, ElegantResume, TimelineResume } from '@/components/resume/Precision'
import { ATSOptimizedResume } from '@/components/resume/microsoft'
// import { BoldHeaderResume, ClassicResume, CompactResume, ElegantResume, MinimalistResume, ModernCardResume, ModernGridResume, SidebarResume, TimelineResume, TwoColumnResume } from '@/components/resume/Precision'
// import { ClassicTechResume, CleanCodeResume, MinimalistTechResume, ModernTechResume, ProjectShowcaseResume, TechnicalFocusResume, TechTimelineResume } from '@/components/resume/softwareEng'
// import { BoldTypographyResume, GeometricPatternsResume, MinimalistAccentResume, NeonGlowResume, PastelCirclesResume, VibrantBlocksResume, WatercolorSplashResume } from '@/components/resume/creative'
// import { ArtisticCollageResume, FuturisticHologramResume, InfographicResume, MagazineResume, MinimalistTimelineResume, RetroPixelResume, TechCircuitResume } from '@/components/resume/unique'
// import { AlternatingSidesTimeline, CircularTimeline, ClassicVerticalTimeline, ColorfulCardTimeline, MetroStyleTimeline, MinimalistDotTimeline, ModernHorizontalTimeline, ZigzagTimeline } from '@/components/resume/timeline'
// import { GoogleCalendarResume, GoogleDocsResume, GoogleDriveResume, GoogleKeepResume, GoogleMaterialYouResume, GoogleSearchResume, MaterialCardResume } from '@/components/resume/google'
// import { ATSOptimizedResume, ClassicProfessionalResume, CleanCompactResume, ExecutiveStyleResume, ModernMinimalistResume, ProfessionalSerifResume } from '@/components/resume/microsoft'

// Header Component
//  const Header = React.memo(({ theme, setTheme, font, setFont }) => (
//   <div className="mb-6 space-y-4">
//     <div className="flex space-x-4">
//       <div className="w-1/2">
//         <Label>Theme</Label>
//         <Select value={theme} onValueChange={(value: ThemeType) => setTheme(value)}>
//           <SelectTrigger>
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="modern">Modern</SelectItem>
//             <SelectItem value="traditional">Traditional</SelectItem>
//             <SelectItem value="minimal">Minimal</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div className="w-1/2">
//         <Label>Font</Label>
//         <Select value={font} onValueChange={(value: FontType) => setFont(value)}>
//           <SelectTrigger>
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="inter">Inter</SelectItem>
//             <SelectItem value="times">Times New Roman</SelectItem>
//             <SelectItem value="helvetica">Helvetica</SelectItem>
//             <SelectItem value="georgia">Georgia</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   </div>
// ))
// Header.displayName = 'Header';

// PersonalInfo Component

// Section Component

// Main Component
export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  // const [theme, setTheme] = useState<ThemeType>('traditional')
  // const [font, setFont] = useState<FontType>('times')
  const theme = 'traditional';
  const font ='times'
  const pdfRef = useRef<HTMLDivElement>(null)

  const handleInputChange = useCallback((field: keyof ResumeData, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }))
  }, [])


  const addSection = useCallback(() => {
    const newId = String(Date.now())
    setResumeData(prev => ({
      ...prev,
      sections: [...prev.sections, { id: newId, title: 'New Section', content: {} }]
    }))
  }, [])

  const removeSection = useCallback((sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }))
  }, [])

  const moveSection = useCallback((sectionId: string, direction: 'up' | 'down') => {
    setResumeData(prev => {
      const sectionIndex = prev.sections.findIndex(section => section.id === sectionId)
      if (
        (direction === 'up' && sectionIndex === 0) ||
        (direction === 'down' && sectionIndex === prev.sections.length - 1)
      ) {
        return prev
      }

      const newIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1
      const newSections = [...prev.sections]
      const [removed] = newSections.splice(sectionIndex, 1)
      newSections.splice(newIndex, 0, removed)

      return { ...prev, sections: newSections }
    })
  }, [])

  const addKey = useCallback((sectionId: string, key: string) => {
    if (!key) return

    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, [key]: [''] } }
          : section
      )
    }))
  }, [])

  const removeKey = useCallback((sectionId: string, key: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, content: Object.fromEntries(Object.entries(section.content).filter(([k]) => k !== key)) }
          : section
      )
    }))
  }, [])

  const addBulletPoint = useCallback((sectionId: string, key: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, [key]: [...section.content[key], ''] } }
          : section
      )
    }))
  }, [])

  const removeBulletPoint = useCallback((sectionId: string, key: string, index: number) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                [key]: section.content[key].filter((_, i) => i !== index)
              }
            }
          : section
      )
    }))
  }, [])

  const handleBulletPointChange = useCallback((sectionId: string, key: string, index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                [key]: section.content[key].map((item, i) => i === index ? value : item)
              }
            }
          : section
      )
    }))
  }, [])

  const generatePDF = useCallback(() => {
    if (!pdfRef.current) return;
  
    const pdf = new jsPDF({
      unit: 'pt',
      format: 'a4'
    });
  
    const fontFamily = themes[theme].fontFamily === 'times' ? 'times' : 'helvetica';
    pdf.setFont(fontFamily);
  
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    let yOffset = margin;
  
    const addWrappedText = (
      text:string,
      fontSize:number,
      fontStyle = 'normal',
      maxWidth = pdfWidth - 2 * margin,
      align = 'left'
    ) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, fontStyle);
      const lines = pdf.splitTextToSize(text, maxWidth);
      
      if (yOffset > pdfHeight - margin) {
        pdf.addPage();
        yOffset = margin;
      }
  
      const xPos = align === 'center' ? (pdfWidth - pdf.getTextWidth(lines[0])) / 2 : margin;
  
      lines.forEach((line:string) => {
        if (yOffset > pdfHeight - margin) {
          pdf.addPage();
          yOffset = margin;
        }
        pdf.text(line, xPos, yOffset);
        yOffset += fontSize * 1.15;
      });
    };
  
    // Add name and contact info
    addWrappedText(resumeData.name, 14, 'bold', pdfWidth - 2 * margin, 'center');
    yOffset += 5;
  
    const contactInfo = `${resumeData.email} | ${resumeData.phone} | ${resumeData.location}`;
    addWrappedText(contactInfo, 10, 'normal', pdfWidth - 2 * margin, 'center');
    yOffset += 15;
  
    // Add sections
    resumeData.sections.forEach((section) => {
      addWrappedText(section.title.toUpperCase(), 12, 'bold');
      yOffset += 10;
  
      Object.entries(section.content).forEach(([key, bullets]) => {
        if (key) {
          const parts = key.split(' | ');
          const title = parts[0];
          const details = parts[1];
  
          const maxTitleWidth = (pdfWidth - 2 * margin) * 0.6;
  
          pdf.setFontSize(11);
          pdf.setFont(fontFamily, 'bold');
  
          const wrappedTitle = pdf.splitTextToSize(title, maxTitleWidth);
          pdf.text(wrappedTitle[0], margin, yOffset);
  
          if (details) {
            const detailsWidth = pdf.getTextWidth(details);
            pdf.text(details, pdfWidth - margin - detailsWidth, yOffset);
          }
  
          yOffset += 15;
  
          if (wrappedTitle.length > 1) {
            for (let i = 1; i < wrappedTitle.length; i++) {
              pdf.text(wrappedTitle[i], margin, yOffset);
              yOffset += 12;
            }
          }
        }
  
        bullets.forEach((bullet) => {
          if (yOffset > pdfHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }
  
          pdf.setFont(fontFamily, 'normal');
          pdf.setFontSize(10);
          const bulletText = key ? `• ${bullet}` : bullet;
          const lines = pdf.splitTextToSize(bulletText, pdfWidth - (key ? margin * 3 : margin * 2));
          
          lines.forEach((line:string) => {
            pdf.text(line, key ? margin + 15 : margin, yOffset);
            yOffset += 12;
          });
        });
        yOffset += 5;
      });
  
      yOffset += 15;
    });
  
    pdf.save('resume.pdf');
  }, [resumeData, theme]);

  const generatePDF2 = () => {
    if (!pdfRef.current) return;
  
    const pdf = new jsPDF({
      unit: 'pt',
      format: 'a4'
    });
  
    const themes = {
      default: { fontFamily: 'times' },
      times: { fontFamily: 'times' }
    };
  
    const fontFamily = themes[theme]?.fontFamily || 'times';
    pdf.setFont(fontFamily);
  
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    let yOffset = margin;
  
    // Add black header background
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pdfWidth, 80, 'F');
  
    const addWrappedText = (
      text: string,
      fontSize: number,
      fontStyle = 'normal',
      maxWidth = pdfWidth - 2 * margin,
      align = 'left',
      h=true
    ) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, fontStyle);
      const lines = pdf.splitTextToSize(text, maxWidth);
  
      if (yOffset > pdfHeight - margin) {
        pdf.addPage();
        yOffset = margin;
      }
  
      const xPos = align === 'center' ? 
        (pdfWidth - pdf.getTextWidth(lines[0])) / 2 : 
        margin;
  
      lines.forEach((line: string) => {
        if (yOffset > pdfHeight - margin) {
          pdf.addPage();
          yOffset = margin;
        }
        pdf.text(line, xPos, yOffset);
        if(h)yOffset += fontSize * 1.15;
      });
    };
  
    // Header text in white
    pdf.setTextColor(255, 255, 255);
    addWrappedText(resumeData.name, 18, 'bold', pdfWidth - 2 * margin, 'center');
    yOffset -= 5;
  
    // Contact info in white
    const contactInfo = `${resumeData.email} | ${resumeData.phone} | ${resumeData.location}`;
    addWrappedText(contactInfo, 10, 'normal', pdfWidth - 2 * margin, 'center');
    yOffset += 50;
  
    // Reset text color to black for rest of document
    pdf.setTextColor(0, 0, 0);
  
    // Add sections
    resumeData.sections.forEach((section) => {
      // Section title
      addWrappedText(section.title.toUpperCase(), 16, 'bold',pdfWidth - 2 * margin,'left',false);
      yOffset +=5;
      
      pdf.setLineWidth(1);
      pdf.setDrawColor("#000000"); // Adjust the width as needed for boldness

// Set the starting and ending points of the line
const x1 = 40, y1 = 10, x2 = 200, y2 = 10;

// Draw the line
pdf.line(x1, yOffset, pdfWidth-40, yOffset);
      yOffset += 20;
  
      // Section content
      Object.entries(section.content).forEach(([key, bullets]) => {
        if (key) {
          const parts = key.split(' | ');
          const title = parts[0];
          const details = parts[1];
  
          const maxTitleWidth = (pdfWidth - 2 * margin) * 0.6;
  
          pdf.setFontSize(11);
          pdf.setFont(fontFamily, 'bold');
  
          const wrappedTitle = pdf.splitTextToSize(title, maxTitleWidth);
          pdf.text(wrappedTitle[0], margin, yOffset);
  
          if (details) {
            const detailsWidth = pdf.getTextWidth(details);
            pdf.text(details, pdfWidth - margin - detailsWidth, yOffset);
          }
  
          yOffset += 15;
   
          if (wrappedTitle.length > 1) {
            for (let i = 1; i < wrappedTitle.length; i++) {
              pdf.text(wrappedTitle[i], margin, yOffset);
              yOffset += 12;
            }
          }
        }
  
        // Bullet points
        bullets.forEach((bullet) => {
          if (yOffset > pdfHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }
  
          pdf.setFont(fontFamily, 'normal');
          pdf.setFontSize(10);
          const bulletText = key ? `• ${bullet}` : bullet;
          const lines = pdf.splitTextToSize(bulletText, pdfWidth - (key ? margin * 3 : margin * 2));
          
          lines.forEach((line: string) => {
            pdf.text(line, key ? margin + 15 : margin, yOffset);
            yOffset += 14;
          });
        });
        yOffset += 5;
      });
  
      yOffset += 20;
    });
  
    pdf.save('resume.pdf');
  };

  function generatePDF2xcv() {
    const doc = new jsPDF();
    
    // Add black header background
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 25, 'F');
    
    // Header text in white
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('John Doe', 105, 10, { align: 'center' });
    
    // Contact info in white
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('john.doe@resumeworld.com', 85, 16);
    doc.text('+1 (123) 456-7890', 145, 16);
    doc.text('San Francisco, CA', 175, 16);
    
    // Reset text color to black for rest of document
    doc.setTextColor(0, 0, 0);
    
    // Start content after header
    let y = 35;
    
    // Helper functions
    function addSection(title, y) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(title, 20, y);
        doc.setLineWidth(0.5);
        doc.line(20, y + 1, 190, y + 1);
        return y + 10;
    }
    
    function addBulletPoint(text, y) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('•', 25, y);
        doc.text(text, 30, y);
        return y + 5;
    }

    // Education Section
    y = addSection('EDUCATION', y);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Tech University', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Master of Science in Computer Science', 120, y);
    y += 5;
    y = addBulletPoint('May 2015', y);
    y = addBulletPoint('Austin, TX', y);
    y = addBulletPoint('Graduated with High Distinction (Top 10%)', y);
    y = addBulletPoint('President of the Tech Innovation Club (400+ members), Hackathon Organizer', y);
    y = addBulletPoint('Co-authored research paper on machine learning model to predict network security threats with 95% accuracy', y);
    y += 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Tech University', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Bachelor of Science in Software Engineering', 120, y);
    y += 5;
    y = addBulletPoint('May 2013', y);
    y = addBulletPoint('San Francisco, CA', y);
    y = addBulletPoint('Cumulative GPA: 3.94/4.0, Dean\'s List 2011, 2012, 2013', y);
    y = addBulletPoint('Vice President of the Coding Club, Member of Robotics Club', y);
    y += 5;

    // Professional Experience
    y = addSection('PROFESSIONAL EXPERIENCE', y);
    
    // Innovatech Solutions
    doc.setFont('helvetica', 'bold');
    doc.text('Innovatech Solutions', 20, y);
    doc.text('Senior Software Engineer', 140, y);
    y += 5;
    y = addBulletPoint('Oct 2017 - Present', y);
    y = addBulletPoint('San Francisco, CA', y);
    y = addBulletPoint('Led a team of 8 engineers across 3 locations, collaborating on developing scalable web applications and APIs for high-traffic environments', y);
    y = addBulletPoint('Implemented automated testing and CI/CD pipelines, reducing deployment time by 40% and improving code reliability', y);
    y = addBulletPoint('Designed a data processing system that reduced report generation time by 60%, enhancing data accessibility for decision-making', y);
    y += 5;

    // WebWise Inc.
    doc.setFont('helvetica', 'bold');
    doc.text('WebWise Inc.', 20, y);
    doc.text('Software Engineer', 140, y);
    y += 5;
    y = addBulletPoint('Jun 2015 - Oct 2017', y);
    y = addBulletPoint('San Francisco, CA', y);
    y = addBulletPoint('Built and maintained RESTful APIs, optimizing performance to handle over 100,000 requests per minute', y);
    y = addBulletPoint('Streamlined data retrieval processes, decreasing load times by 20% across the platform', y);
    y += 5;

    // Other sections
    y = addSection('OTHER', y);
    
    // Technical Skills
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Technical Skills', 20, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('JavaScript, TypeScript, Python, Java, SQL, MongoDB, AWS, Docker, Jenkins, React, Node.js, Express', 20, y);
    y += 10;

    // Languages
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Languages', 20, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('English (Native), Spanish (Fluent)', 20, y);
    y += 10;

    // Certifications
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Certifications', 20, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('AWS Certified Solutions Architect (2019), Certified ScrumMaster (CSM), Machine Learning Specialization', 20, y);
    doc.save('resumwwewee.pdf');
    return doc;
}
  const memoizedATS1 = useMemo(() => (
    <ATS1 font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]} />
  ), [font, resumeData, theme]);

 const generateDOCX = useCallback(() => {
    // Build HTML string based on resumeData
    let htmlContent = `
      <html>
        <body>
          <div style="text-align: center; font-size: 14pt; font-weight: bold;">
            <h1>${resumeData.name}</h1>
          </div>
          <div style="text-align: center; font-size: 10pt;">
            <p>${resumeData.email} | ${resumeData.phone} | ${resumeData.location}</p>
          </div>
    `;
  
    // Add resume sections
    resumeData.sections.forEach((section) => {
      htmlContent += `<h2 style="font-size: 12pt; font-weight: bold;">${section.title.toUpperCase()}</h2>`;
      htmlContent += '<ul style="list-style-type: none;">';
  
      Object.entries(section.content).forEach(([key, bullets]) => {
        if (key) {
          const parts = key.split(' | ');
          const title = parts[0];
          const details = parts[1];
  
          htmlContent += `
            <li style="font-weight: bold; font-size: 11pt;">
              <span style="display: inline-block; width: 60%;">${title}</span>
              <span style="text-align: right; display: inline-block; width: 35%;">${details || ''}</span>
            </li>
          `;
        }
  
        bullets.forEach((bullet) => {
          htmlContent += `<li style="font-size: 10pt;">• ${bullet}</li>`;
        });
      });
  
      htmlContent += '</ul>';
    });
  
    htmlContent += '</body></html>';
  
    // DOCX template
    const template = `
      <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:body>
          <w:p><w:r><w:t>{{htmlContent}}</w:t></w:r></w:p>
        </w:body>
      </w:document>
    `;
  
    // Create a PizZip instance for the DOCX format
    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip);
  
    // Replace the placeholder with the actual HTML content
    doc.setData({ htmlContent });
  
    try {
      doc.render();
    } catch (error) {
      console.error('Error rendering docxtemplater:', error);
      return;
    }
  
    // Generate the DOCX file as a Blob
    const generatedDocx = doc.getZip().generate({ type: 'blob' });
  
    // Trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(generatedDocx);
    link.download = 'resume.docx';
    link.click();
  }, [resumeData]);
  
  const saveAsImagePng = async () => {
    if (pdfRef && pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 4,  // Increase scale for high-quality output
        useCORS: true  // Useful if images or fonts need CORS handling
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png', 1.0);
      link.download = 'resume.png';
      link.click();
    }
  };

  const saveAsImageWebp = async () => {
    if (pdfRef && pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 4,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/webp', 1.0);  // 1.0 for max quality
      link.download = 'resume.webp';
      link.click();
    }
  };
  
  const saveAsImageJpeg = async () => {
    if (pdfRef && pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 4,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 1.0);  // 1.0 for max quality
      link.download = 'resume.jpeg';
      link.click();
    }
  };






  // const saveAsHighQualityPdf = async () => {
  //   if (pdfRef && pdfRef.current) {
  //     const canvas = await html2canvas(pdfRef.current, {
  //       scale: 2,
  //       useCORS: true
  //     });
  
  //     const pdf = new jsPDF({
  //       unit: 'mm',
  //       format: 'a4',
  //       orientation: 'portrait'
  //     });
  
  //     const imgData = canvas.toDataURL('image/jpeg', 1.0);
  //     const imgWidth = pdf.internal.pageSize.getWidth() - 20;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //     const paddingTop = 10;
  //     const paddingLeft = 10;
  //     const paddingBottom = 10;
  

  //     const totalPages = Math.ceil((imgHeight + paddingTop + paddingBottom) / (pdf.internal.pageSize.getHeight() - paddingTop));
  
  //     let position = 0;
  
  //     // Only add new pages when needed (only if the content height exceeds the page height)
  //     for (let page = 0; page < totalPages; page++) {
  //       // Add image on the current page with padding
  //       pdf.addImage(
  //         imgData,
  //         'JPEG',
  //         paddingLeft,
  //         paddingTop - position,
  //         imgWidth,
  //         imgHeight
  //       );
  
       
  //       if (page < totalPages - 1) {
  //         pdf.addPage();
  //       }
  
      
  //       position += pdf.internal.pageSize.getHeight() - paddingTop - paddingBottom;
  //     }
  
     
  //     pdf.save('printableresume.pdf');
  //   }
  // };
  
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen ">
      <div className="w-full lg:w-1/2 p-4 overflow-y-auto bg-gradient-to-br from-purple-300 via-blue-200  to-indigo-300">
        <h1 className="text-2xl font-bold mb-4"><span className="text-3xl font-extrabold">Resume</span> Builder Tool</h1>
        {/* <Header theme={theme} setTheme={setTheme} font={font} setFont={setFont} /> */}
        <PersonalInfo resumeData={resumeData} handleInputChange={handleInputChange} />
        <form className="space-y-4 ">
          {resumeData.sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              moveSection={moveSection}
              removeSection={removeSection}
              addKey={addKey}
              removeKey={removeKey}
              addBulletPoint={addBulletPoint}
              removeBulletPoint={removeBulletPoint}
              handleBulletPointChange={handleBulletPointChange}
              setResumeData={setResumeData}
            />
          ))}
          
          <Button variant={'purpleblack'} type="button" onClick={addSection}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Section
          </Button>
        </form>
      </div>
   <div className="w-full lg:w-1/2 flex flex-col ">
  <div className="w-full p-4 flex items-end justify-end bg-gradient-to-br from-purple-100 to-purple-100">
  <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-48">
            Download Options
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Document Formats</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button variant={'ghost'} onClick={generatePDF}>
              <File className="mr-2 h-4 w-4 text-red-500" />
              PDF (ATS-friendly)
              </Button>
            
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={generatePDF2} variant={'ghost'}>
              <File className="mr-2 h-4 w-4 text-blue-500" />
              PDF (Print-friendly)
              </Button>
         
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Image Formats</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
            <Button onClick={saveAsImagePng} variant={'ghost'}>
            <FileImage className="mr-2 h-4 w-4 text-green-500" />
            PNG
            </Button>
            
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Button onClick={saveAsImageJpeg} variant={'ghost'}>
            <FileImage className="mr-2 h-4 w-4 text-yellow-500" />
            JPG
            </Button>
             
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Button onClick={saveAsImageWebp} variant={'ghost'}>
            <FileImage className="mr-2 h-4 w-4 text-purple-500" />
            WebP
            </Button>
              
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  </div>
      <div className="p-4 bg-white overflow-y-auto">
        {/* {memoizedATS1} */}
        {/* <TechTimelineResume font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]}/> */}
        {/* done         <GoogleDocsResume font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]}/>
 */}

         {/* <ElegantResume font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]}/> */}

        {/* can be used as design for 2 col <SidebarResume font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]}/> */}
         <BoldHeaderResume font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]}/>

         {/* <TimelineResume font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]}/> */}

   
      </div>

   </div>
    </div>
  )
}