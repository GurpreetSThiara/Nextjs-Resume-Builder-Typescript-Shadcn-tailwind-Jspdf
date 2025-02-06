'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Edit, ArrowRight, Users } from 'lucide-react'

import resume1 from '../../../../public/images/1.png'
import resume2 from '../../../../public/images/2.png'
import resume3 from '../../../../public/images/3.png'

import Link from 'next/link'


const templates = {
  classic: {
    id: 1,
    name: 'Classic Professional',
    description: 'A timeless design suitable for traditional industries.',
    image: resume1,
    features: [
      {
        feature: 'Clean and professional layout',
        description: 'Simple, clear structure with no distractions, ideal for formal sectors.'
      },
      {
        feature: 'Easy-to-read typography',
        description: 'Focused on legibility with a standard font and sizing for clarity.'
      },
      {
        feature: 'Sections for work experience, education, and skills',
        description: 'Dedicated areas for your professional journey, qualifications, and skills.'
      },
      {
        feature: 'Customizable color scheme',
        description: 'Personalize your resume with a color palette that fits you/template/[resumer style.'
      },
      {
        feature: 'ATS-friendly format',
        description: 'Designed to pass Applicant Tracking Systems for better visibility.'
      }
    ],
    bestFor: [
      'Corporate professionals: Ideal for individuals in structured, traditional environments.',
      'Legal industry: Suited for lawyers, paralegals, and other legal professionals.',
      'Finance sector: A clean, formal style suitable for accountants, analysts, and executives.',
      'Healthcare workers: Perfect for medical professionals who need to present credentials professionally.'
    ],
    testimonial: {
      text: "The Classic Professional template helped me land my dream job in finance. It's clean, professional, and really highlights my experience.",
      author: "Sarah J., Financial Analyst"
    }
  },
  modern: {
    id: 2,
    name: 'Modern Creative',
    description: 'A contemporary layout ideal for creative professionals and startups.',
    image: resume2,
    features: [
      {
        feature: 'Sleek and modern design',
        description: 'Trendy and fresh look designed to appeal to forward-thinking industries.'
      },
      {
        feature: 'Infographic elements for skills and achievements',
        description: 'Visually display your skills with icons, charts, and graphs.'
      },
      {
        feature: 'Customizable color accents',
        description: 'Adjust accent colors to match your brand or personality.'
      },
      {
        feature: 'Unique layout for standing out',
        description: 'An unconventional format that will grab the attention of hiring managers.'
      },
      {
        feature: 'Mobile-responsive format',
        description: 'Ensure your resume looks great on all devices, from phones to desktops.'
      }
    ],
    bestFor: [
      'Designers: Perfect for showcasing creative portfolios and projects.',
      'Marketing professionals: Great for professionals in marketing and digital media.',
      'Startup founders: An eye-catching layout to present your skills and business vision.',
      'Tech industry: Ideal for software developers, engineers, and product managers.'
    ],
    testimonial: {
      text: "The Modern Creative template perfectly showcases my portfolio and skills. It's helped me stand out in the competitive design industry.",
      author: "Alex M., Graphic Designer"
    }
  },
  impact:{
    "id": 4,
    "name": "Professional Impact",
    "description": "A clean, ATS-friendly resume template tailored for professionals in technical and leadership roles, highlighting achievements with a modern design.",
    "image": resume3,
    "features": [
      {
        "feature": "Clear and structured layout",
        "description": "Organized sections for education, experience, skills, and certifications, making information easy to find."
      },
      {
        "feature": "ATS-friendly format",
        "description": "Optimized design to ensure compatibility with applicant tracking systems and increase application visibility."
      },
      {
        "feature": "Focus on quantifiable achievements",
        "description": "Highlights accomplishments with measurable metrics to showcase your professional impact effectively."
      },
      {
        "feature": "One-page design",
        "description": "Space-efficient format that condenses essential information into a single page for recruiter convenience."
      },
      {
        "feature": "Customizable for different industries",
        "description": "Easily adaptable layout for professionals in tech, business, project management, or creative fields."
      }
    ],
    "bestFor": [
      "Software Engineers: Ideal for showcasing technical expertise and coding achievements.",
      "Project Managers: Perfect for highlighting leadership roles and collaborative project successes.",
      "Data Analysts: Great for presenting metrics-driven results and certifications.",
      "Business Professionals: Tailored to emphasize strategy, leadership, and problem-solving skills."
    ],
    "testimonial": {
      "text": "This resume template helped me land interviews with top tech companies. Its clean, metrics-focused design made my achievements stand out!",
      "author": "Raj S., Software Engineer"
    }
  }
  
}

const sampleResumeData = {
  "name": "John Doe",
  "email": "john.doe@resumeworld.com",
  "phone": "+1 (123) 456-7890",
  "location": "San Francisco, CA",
  "sections": [
    {
      "id": "1",
      "title": "Education",
      "content": {
        "Tech University | Master of Science in Computer Science": [
          "May 2015",
          "Austin, TX",
          "Graduated with High Distinction (Top 10%)",
          "President of the Tech Innovation Club (300+ members), Hackathon Organizer",
          "Capstone Project: Developed a machine learning model to predict network security threats with 85% accuracy"
        ],
        "Tech University | Bachelor of Science in Software Engineering": [
          "May 2013",
          "San Francisco, CA",
          "Cumulative GPA: 3.9/4.0; Dean's List 2011, 2012, 2013",
          "Vice President of the Coding Club, Member of Robotics Club"
        ]
      }
    },
    {
      "id": "2",
      "title": "Professional Experience",
      "content": {
        "Innovatech Solutions | Senior Software Engineer": [
          "Oct 2017 – Present",
          "San Francisco, CA",
          "Led a team of 8 engineers and collaborating on developing scalable web applications and APIs.",
          "Implemented automated testing and CI/CD pipelines, reducing deployment time by 40% and improving code reliability"
        ],
        "Webwise Inc. | Software Engineer": [
          "Jun 2015 – Oct 2017",
          "San Francisco, CA",
          "Built and maintained RESTful APIs, optimizing performance to handle over 100,000 requests per minute",
          "Streamlined data retrieval processes, decreasing load times by 20% across the platform",
          "Collaborated with UX/UI teams to enhance website accessibility, achieving a 25% increase in engagement metrics"
        ],
        "NextGen Tech | Junior Developer": [
          "Jun 2013 – May 2015",
          "Austin, TX",
          "Developed front-end components using React, improving application responsiveness and user satisfaction",
          "Automated routine processes, reducing manual effort by 30% and increasing productivity across the team",
          "Contributed to database optimization, achieving a 15% improvement in query performance and data integrity"
        ]
      }
    },
    {
      "id": "3",
      "title": "Other",
      "content": {
        "Technical Skills": [
          "JavaScript, TypeScript, Python, Java, SQL, MongoDB, AWS, Docker, Jenkins, React, Node.js, Express"
        ],
        "Languages": [
          "English (Native), Spanish (Fluent)"
        ],
        "Certifications": [
          "AWS Certified Solutions Architect (2019), Certified ScrumMaster (CSM), Machine Learning Specialization"
        ]
      }
    }
  ]
}

export default function TemplateDetail() {
    const params = useParams();
    const r = params.resume?.toString() ?? ' classic';
  const templateName = r?.toLowerCase()
  const template = templates[templateName as keyof typeof templates]
  //const pdfRef = useRef(null)

  if (!template) {
    notFound()
  }

  const generateClassic = useCallback(() => {
    // if (!pdfRef.current) return;

    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const fontFamily = "helvetica";
    pdf.setFont(fontFamily);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    let yOffset = margin;

    const addWrappedText = (
      text: string,
      fontSize: number,
      fontStyle = "normal",
      maxWidth = pdfWidth - 2 * margin,
      align = "left"
    ) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, fontStyle);
      const lines = pdf.splitTextToSize(text, maxWidth);

      if (yOffset > pdfHeight - margin) {
        pdf.addPage();
        yOffset = margin;
      }

      const xPos =
        align === "center"
          ? (pdfWidth - pdf.getTextWidth(lines[0])) / 2
          : margin;

      lines.forEach((line: string) => {
        if (yOffset > pdfHeight - margin) {
          pdf.addPage();
          yOffset = margin;
        }
        pdf.text(line, xPos, yOffset);
        yOffset += fontSize * 1.15;
      });
    };

    // Add name and contact info
    addWrappedText(
      sampleResumeData.name,
      14,
      "bold",
      pdfWidth - 2 * margin,
      "center"
    );
    yOffset += 5;

    const contactInfo = `${sampleResumeData.email} | ${sampleResumeData.phone} | ${sampleResumeData.location}`;
    addWrappedText(contactInfo, 10, "normal", pdfWidth - 2 * margin, "center");
    yOffset += 15;

    // Add sections
    sampleResumeData.sections.forEach((section) => {
      addWrappedText(section.title.toUpperCase(), 12, "bold");
      yOffset += 10;


      Object.entries(section.content).forEach(([key, bullets]) => {
        if (key) {
          const parts = key.split(" | ");
          const title = parts[0];
          const details = parts[1];

          const maxTitleWidth = (pdfWidth - 2 * margin) * 0.6;

          pdf.setFontSize(11);
          pdf.setFont(fontFamily, "bold");

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

        bullets.forEach((bullet:string) => {
          if (yOffset > pdfHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }

          pdf.setFont(fontFamily, "normal");
          pdf.setFontSize(10);
          const bulletText = key ? `• ${bullet}` : bullet;
          const lines = pdf.splitTextToSize(
            bulletText,
            pdfWidth - (key ? margin * 3 : margin * 2)
          );

          lines.forEach((line: string) => {
            pdf.text(line, key ? margin + 15 : margin, yOffset);
            yOffset += 12;
          });
        });
        yOffset += 5;
      });

      yOffset += 15;
    });

    pdf.save("classic_resume_sample.pdf");
  }, []);

  const generateModern = useCallback(() => {
   

    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const fontFamily = "helvetica";
    pdf.setFont(fontFamily);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    let yOffset = margin;

    // Add black header background
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pdfWidth, 80, "F");

    const addWrappedText = (
      text: string,
      fontSize: number,
      fontStyle = "normal",
      maxWidth = pdfWidth - 2 * margin,
      align = "left",
      h = true
    ) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, fontStyle);
      const lines = pdf.splitTextToSize(text, maxWidth);

      if (yOffset > pdfHeight - margin) {
        pdf.addPage();
        yOffset = margin;
      }

      const xPos =
        align === "center"
          ? (pdfWidth - pdf.getTextWidth(lines[0])) / 2
          : margin;

      lines.forEach((line: string) => {
        if (yOffset > pdfHeight - margin) {
          pdf.addPage();
          yOffset = margin;
        }
        pdf.text(line, xPos, yOffset);
        if (h) yOffset += fontSize * 1.15;
      });
    };

    // Header text in white
    pdf.setTextColor(255, 255, 255);
    addWrappedText(
      sampleResumeData.name,
      18,
      "bold",
      pdfWidth - 2 * margin,
      "center"
    );
    yOffset -= 5;

    // Contact info in white
    const contactInfo = `${sampleResumeData.email} | ${sampleResumeData.phone} | ${sampleResumeData.location}`;
    addWrappedText(contactInfo, 10, "normal", pdfWidth - 2 * margin, "center");
    yOffset += 50;

    // Reset text color to black for rest of document
    pdf.setTextColor(0, 0, 0);

    // Add sections
    sampleResumeData.sections.forEach((section) => {
      // Section title
      addWrappedText(
        section.title.toUpperCase(),
        16,
        "bold",
        pdfWidth - 2 * margin,
        "left",
        false
      );
      yOffset += 5;

      pdf.setLineWidth(1);
      pdf.setDrawColor("#000000");

      // Draw the line
      pdf.line(40, yOffset, pdfWidth - 40, yOffset);
      yOffset += 20;

      // Section content
      Object.entries(section.content).forEach(([key, bullets]) => {
        if (key) {
          const parts = key.split(" | ");
          const title = parts[0];
          const details = parts[1];

          const maxTitleWidth = (pdfWidth - 2 * margin) * 0.6;

          pdf.setFontSize(11);
          pdf.setFont(fontFamily, "bold");

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
        bullets.forEach((bullet:string) => {
          if (yOffset > pdfHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }

          pdf.setFont(fontFamily, "normal");
          pdf.setFontSize(10);
          const bulletText = key ? `• ${bullet}` : bullet;
          const lines = pdf.splitTextToSize(
              bulletText,
              pdfWidth - (key ? margin * 3 : margin * 2)
            );

          lines.forEach((line: string) => {
            pdf.text(line, key ? margin + 15 : margin, yOffset);
            yOffset += 14;
          });
        });
        yOffset += 5;
      });

      yOffset += 20;
    });

    pdf.save("modern_resume_sample.pdf");
  }, []);

  return (
<>

<div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-1 z-50">
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-48">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 pointer-events-none" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 text-white">
              {template.name} <strong><span className="text-yellow-400">Resume</span></strong> Template
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {template.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={`/resume-templates/${templateName}/create`}>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                <Edit className="mr-2 h-4 w-4" /> Customize Now
              </Button>
              </Link>
              <Button onClick={()=>{
                if(templateName === 'Classic')generateClassic()
                 else generateModern();
              }} size="lg" variant="outline" className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-white hover:bg-white hover:from-white hover:to-gray-300 hover:text-purple-600 transition-all duration-300 transform hover:scale-105" >
                <Download className="mr-2 h-4 w-4" /> Download Sample
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px] pointer-events-none" />
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <Image
                src={template.image}
                alt={`${template.name} resume template preview`}
                width={600}
                height={800}
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Key <span className="text-purple-600">Features</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {template.features.map((feature, index) => (
                <Card key={index} className="bg-gray-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-xl font-semitemplatebold text-gray-800">{feature.feature}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-purple-100 to-indigo-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Best For <span className="text-purple-600">These Professionals</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {template.bestFor.map((category, index) => (
                <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <Users className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-xl font-semibold text-gray-800">{category.split(':')[0]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{category.split(':')[1]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              What Our Users <span className="text-purple-600">Say</span>
            </h2>
            <Card className="max-w-2xl mx-auto bg-gray-50 border-none shadow-xl">
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4 text-lg italic">{template.testimonial.text}</p>
                <p className="text-gray-600 font-medium">- {template.testimonial.author}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Your Perfect <span className="text-yellow-400">Resume</span>?
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Start building your career-changing resume with our easy-to-use template.
                100% free - no catches, no hidden fees.
              </p>
           <Link href= {`/resume-templates/${templateName}/create`}>
           <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                Create Your Free Resume Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
           </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
</>
  )
}