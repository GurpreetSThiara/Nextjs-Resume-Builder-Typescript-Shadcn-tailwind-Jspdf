/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

//basic react/next imports
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useParams } from "next/navigation";

// UI Components Shadn cn and React Lucide Icons
import { PlusCircle, ChevronDown, File, FileImage } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// Custom Components
import { PersonalInfo } from "@/components/Forms/ResumeEditForm/PersonalInfo/PersonalInfo";
import { Section } from "@/components/Forms/ResumeEditForm/Section/Section";

//Resume Templates
import ATS1 from "@/components/resume/Ats_1";
import { BoldHeaderResume, ResumeProps } from "@/components/resume/Precision";
import { GoogleResume } from "@/components/resume/google";

//External Libraries

import html2canvas from "html2canvas";

// Custom types, Constants and utils
import { ResumeData } from "@/lib/types";
import { fonts, initialResumeData, themes } from "@/lib/constants";
import {
  generateClassic,
  generateImpact,
  generateModern,
} from "@/lib/generateResume";
import Head from "next/head";

const allTemplates = new Map<string, React.FC<ResumeProps>>([
  ["modern", BoldHeaderResume],
  ["classic", ATS1],
  ["impact", GoogleResume],
]);
export default function ResumePage() {
  const params = useParams(); // used to get the resume template

  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [template, setTemplate] = useState(params.resume ?? "classic");

  const selectedResume = useMemo(
    () =>
      allTemplates.get(template.toString().toLowerCase() ?? "classic") ??
      allTemplates.get("classic"),
    [template]
  );

  const generateResumeFunction: any = {
    classic: generateClassic,
    modern: generateModern,
    impact: generateImpact,
  };

  const theme = "traditional";
  const font = "times";
  const pdfRef = useRef<HTMLDivElement>(null);

  const [openSection, setOpenSection] = useState<string>("1");

  const handleAccordionChange = useCallback(
    (value: string) => {
      setOpenSection(value === openSection ? "" : value);
    },
    [openSection]
  );

  const handleInputChange = useCallback(
    (field: keyof ResumeData, value: string) => {
      setResumeData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addSection = useCallback(() => {
    const newId = String(Date.now());
    setResumeData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { id: newId, title: "New Section", content: {} },
      ],
    }));
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }));
  }, []);

  const moveSection = useCallback(
    (sectionId: string, direction: "up" | "down") => {
      setResumeData((prev) => {
        const sectionIndex = prev.sections.findIndex(
          (section) => section.id === sectionId
        );
        if (
          (direction === "up" && sectionIndex === 0) ||
          (direction === "down" && sectionIndex === prev.sections.length - 1)
        ) {
          return prev;
        }

        const newIndex =
          direction === "up" ? sectionIndex - 1 : sectionIndex + 1;
        const newSections = [...prev.sections];
        const [removed] = newSections.splice(sectionIndex, 1);
        newSections.splice(newIndex, 0, removed);

        return { ...prev, sections: newSections };
      });
    },
    []
  );

  const addKey = useCallback((sectionId: string, key: string) => {
    if (!key) return;

    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, [key]: [""] } }
          : section
      ),
    }));
  }, []);

  const removeKey = useCallback((sectionId: string, key: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: Object.fromEntries(
                Object.entries(section.content).filter(([k]) => k !== key)
              ),
            }
          : section
      ),
    }));
  }, []);

  const addBulletPoint = useCallback((sectionId: string, key: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: {
                ...section.content,
                [key]: [...section.content[key], ""],
              },
            }
          : section
      ),
    }));
  }, []);

  const removeBulletPoint = useCallback(
    (sectionId: string, key: string, index: number) => {
      setResumeData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: {
                  ...section.content,
                  [key]: section.content[key].filter((_, i) => i !== index),
                },
              }
            : section
        ),
      }));
    },
    []
  );

  const handleBulletPointChange = useCallback(
    (sectionId: string, key: string, index: number, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: {
                  ...section.content,
                  [key]: section.content[key].map((item, i) =>
                    i === index ? value : item
                  ),
                },
              }
            : section
        ),
      }));
    },
    []
  );

  const saveAsImagePng = async () => {
    if (pdfRef?.current) {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 4, // Increase scale for high-quality output
        useCORS: true, // Useful if images or fonts need CORS handling
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png", 1.0);
      link.download = "resume.png";
      link.click();
    }
  };

  const saveAsImageWebp = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 4,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/webp", 1.0); // 1.0 for max quality
      link.download = "resume.webp";
      link.click();
    }
  };

  const saveAsImageJpeg = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 4,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 1.0); // 1.0 for max quality
      link.download = "resume.jpeg";
      link.click();
    }
  };

  useEffect(() => {
    setTemplate(params.resume);
  }, []);

  const memoizedSections = useMemo(
    () =>
      resumeData.sections.map((section) => (
        <AccordionItem
          className="bg-white rounded-lg px-4"
          key={section.id}
          value={section.id}
        >
          <AccordionTrigger>
            <h1 className="text-purple-600 font-bold text-xl">
              {section.title}
            </h1>
          </AccordionTrigger>
          <AccordionContent>
            <Section
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
          </AccordionContent>
        </AccordionItem>
      )),
    [
      resumeData.sections,
      moveSection,
      removeSection,
      addKey,
      removeKey,
      addBulletPoint,
      removeBulletPoint,
      handleBulletPointChange,
    ]
  );

  return (
<>
<Head>
      <title>Free ATS-Friendly Resume Builder & Templates</title>
      <meta name="description" content="Create professional, ATS-friendly resumes for free with customizable templates to help you land your dream job." />
      <meta name="keywords" content="free resume builder, professional resume templates, ATS friendly, resume templates, job applications" />
      <meta name="author" content="Gurpreet" />
      <meta name="copyright" content="2024 FreeResumeBuilder" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Free Resume Builder Professional ATS Friendly Templates" />
      <meta property="og:description" content="Free Professional ATS friendly Resume templates to help you land your dream job. all resume templates are completely 100% free, customize according to your needs. create professional Resume for job applications." />
      <meta property="og:image" content="https://drive.google.com/file/d/1SShn45ecoAdy3p0MrpPLoSnDHyPKX8Zq/view?usp=sharing" />
      <meta property="og:url" content={`https://resume.giveaways4u.com/templates/${template.toString()??'classic'}/create`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Free Resume Builder ATS" />
      {/* <meta property="fb:app_id" content="YOUR_APP_ID" /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Resume Builder Professional ATS Friendly Templates" />
      <meta name="twitter:description" content="Free Professional ATS friendly Resume templates to help you land your dream job. all resume templates are completely 100% free, customize according to your needs. create professional Resume for job applications." />
      <meta name="twitter:image" content="https://drive.google.com/file/d/1SShn45ecoAdy3p0MrpPLoSnDHyPKX8Zq/view?usp=sharing" />
      <meta name="twitter:site" content="@YourAtsResume" />
      <script type="application/ld+json">
  {`
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Free Resume Builder Tool",
      "description": "Create professional, ATS-friendly resumes for free with our intuitive resume builder tool. Customize templates to fit your career needs and land your dream job.",
      "url": "https://resume.giveaways4u.com/templates/${template.toString() ?? 'classic'}/create",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://resume.giveaways4u.com/templates/${template.toString() ?? 'classic'}/create"
      },
      "author": {
        "@type": "Person",
        "name": "Gurpreet",
        "url": "https://gurpreetthiara-portfolio.vercel.app/"
      },
      "datePublished": "2024-11-20",
     
      "operatingSystem": "Web-based",
      "softwareVersion": "1.0",
      "applicationCategory": "Resume Builder",
      "priceCurrency": "USD",
      "offers": {
        "@type": "Offer",
        "url": "https://resume.giveaways4u.com/templates/${template.toString() ?? 'classic'}/create",
        "price": "0.00",
        "priceCurrency": "USD"
      }
    }
  `}
</script>

    </Head>
<div className="flex flex-col lg:flex-row min-h-screen ">
      <div className="w-full lg:w-1/2 p-4 overflow-y-auto bg-gradient-to-br from-purple-300 via-blue-200  to-indigo-300">
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-3xl font-extrabold">Resume</span> Builder Tool
        </h1>
        <PersonalInfo
          resumeData={resumeData}
          handleInputChange={handleInputChange}
        />
        <form className="space-y-4 ">
          <Accordion
            className="py-2 gap-2 flex flex-col"
            type="single"
            value={openSection}
            onValueChange={handleAccordionChange}
            collapsible
          >
            {memoizedSections}
          </Accordion>

          <Button variant={"purpleblack"} type="button" onClick={addSection}>
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
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      const fun = generateResumeFunction[template.toString().toLowerCase()];
                      if (fun) {
                        fun({ pdfRef, resumeData, theme: themes[theme] });
                      }
                    }}
                  >
                    <File className="mr-2 h-4 w-4 text-red-500" />
                    PDF (ATS-friendly)
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    onClick={() => {
                      if (template === "Classic") {
                        generateClassic({
                          pdfRef,
                          resumeData,
                          theme: themes[theme],
                        });
                      } else {
                        generateModern({
                          pdfRef,
                          resumeData,
                          theme: themes[theme],
                        });
                      }
                    }}
                    variant={"ghost"}
                  >
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
                  <Button onClick={saveAsImagePng} variant={"ghost"}>
                    <FileImage className="mr-2 h-4 w-4 text-green-500" />
                    PNG
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={saveAsImageJpeg} variant={"ghost"}>
                    <FileImage className="mr-2 h-4 w-4 text-yellow-500" />
                    JPG
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={saveAsImageWebp} variant={"ghost"}>
                    <FileImage className="mr-2 h-4 w-4 text-purple-500" />
                    WebP
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-4 bg-white overflow-y-auto">
          {React.createElement(
            selectedResume as React.ComponentType<ResumeProps>,
            {
              font: fonts[font],
              pdfRef: pdfRef,
              resumeData: resumeData,
              theme: themes[theme],
            }
          )}
          {/* <TimelineResume font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]}/> */}
        </div>
      </div>
    </div>
</>
  );
}
