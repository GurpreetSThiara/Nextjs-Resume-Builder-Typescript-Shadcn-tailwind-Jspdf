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
import { useParams, useRouter } from "next/navigation";

// UI Components Shadn cn and React Lucide Icons
import { PlusCircle, ChevronDown, File, FileImage, Upload } from "lucide-react";
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
import { Loader2 } from "lucide-react";

// Custom Components
import { PersonalInfo } from "@/components/Forms/ResumeEditForm/PersonalInfo/PersonalInfo";
import { Section } from "@/components/Forms/ResumeEditForm/Section/Section";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/checkbox/Checkbox";
import { AddCustomInfoDialog } from "@/components/Forms/ResumeEditForm/PersonalInfo/AddCustomInfoDialog";

//Resume Templates
import ATS1 from "@/components/resume/Ats_1";
import { BoldHeaderResume, ResumeProps } from "@/components/resume/Precision";
import { GoogleResume } from "@/components/resume/google";

//External Libraries

import html2canvas from "html2canvas";

// Custom types, Constants and utils
import {  CustomPersonalInformationItem, ResumeData } from "@/lib/types";
import { fonts, initialResumeData, themes } from "@/lib/constants";
import {
  generateBoldHeader,
  generateClassic,
  generateImpact,
  generateModern,
  generateModernMinimalistPDF,
} from "@/lib/generateResume";
import Head from "next/head";
//import CreativeGrid from "@/components/resume/CreativeGrid";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, limit } from "firebase/firestore";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { compressResumeData, downloadEncryptedResume, readEncryptedFile } from "@/utils/resumeUtils";
import { useAuth } from "@/lib/context/AuthContext";
import { ResumeService } from "@/lib/resumeService";
import { driveService } from "@/lib/driveService";
import ModernMinimalist from "../ModernMinimalist";
import BoldHeader from "../BoldHeader";

// import { toast } from "@/components/ui/use-toast";


const allTemplates = new Map<string, React.FC<ResumeProps>>([
  ["modern", BoldHeaderResume],
  ["classic", ATS1],
  ["impact", GoogleResume],
  ["modernminimalist",ModernMinimalist],
  ["boldheader",BoldHeader]
]);
const MAX_RESUMES_PER_USER = 3;
const RESUMES_COLLECTION = 'resumes';

export default function Create() {
  const params = useParams();
  const router = useRouter();

  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  console.log(resumeData)
  const template = params.resume ?? "classic"

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
    modernminimalist:generateModernMinimalistPDF,
    boldheader:generateBoldHeader
    
  };

  const theme = "traditional";
  const font = "times";
  const pdfRef = useRef<HTMLDivElement>(null);

  const [openSection, setOpenSection] = useState<string>("0");
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleAccordionChange = useCallback(
    (value: string) => {
      setOpenSection(value === openSection ? "" : value);
    },
    [openSection]
  );

  // Map accordion value to activeSection for resume preview
  const getActiveSection = useCallback((value: string) => {
    if (!value) return undefined;
    
    // Map accordion values to section identifiers
    switch (value) {
      case "0": // Personal info accordion item
        return "personal";
      case "1": // Custom fields accordion item
        return "custom";
      default:
        // For section items, they should have format "section-x"
        if (value.startsWith("section-")) {
          return value;
        }
        return undefined;
    }
  }, []);

  const handleInputChange = useCallback(
    (field: keyof ResumeData, value: string) => {
      setResumeData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleCustomInfoAdd = useCallback(
    ({data}:{data:CustomPersonalInformationItem,key:string}) => {
      setResumeData((prev) => ({
        ...prev,
        custom: {...prev.custom,[data.id]:data }, // Ensure correct structure
      }));
    },
    []
  );

const handleCustomInfoChange = useCallback(
  (id: string, field: "title" | "content", value: string) => {
    console.log("title",field , value , id)
    setResumeData((prev) => ({
      ...prev,
      custom: {
        ...prev.custom,
        [id]: {
          ...prev.custom[id], // Keep other properties intact
          [field]: value, // Update the specific field
        },
      },
    }));
  },
  []
);
  const handleHideItem = useCallback(
    (key:string) => {
      setResumeData((prev) => ({ ...prev,custom:{...resumeData.custom ,[key]:{...resumeData.custom[key],hidden:!resumeData.custom[key].hidden}  } }));
    },
    [resumeData.custom]
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
    //setTemplate(params.resume?.toString());
  }, []);

  const memoizedSections = useMemo(
    () => [
      <AccordionItem
        className="bg-white rounded-lg px-4"
        key="personal-info"
        value="0"
      >
        <AccordionTrigger>
          <h1 className="text-purple-600 font-bold text-xl">Personal Information</h1>
        </AccordionTrigger>
        <AccordionContent>
          <PersonalInfo
            resumeData={resumeData}
            handleInputChange={handleInputChange}
            handleCustomInfoAdd={handleCustomInfoAdd}
            handleHideItem={handleHideItem}
            handleCustomInfoChange={handleCustomInfoChange}
          />
        </AccordionContent>
      </AccordionItem>,
      ...resumeData.sections.map((section) => (
        <AccordionItem
          className="bg-white rounded-lg px-4"
          key={section.id}
          value={`section-${section.id}`}
        >
          <AccordionTrigger>
            <h1 className="text-purple-600 font-bold text-xl">{section.title}</h1>
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
    ],
    [
      resumeData,
      moveSection,
      removeSection,
      addKey,
      removeKey,
      addBulletPoint,
      removeBulletPoint,
      handleBulletPointChange,
      handleInputChange,
      handleCustomInfoAdd,
      handleHideItem,
      handleCustomInfoChange,
    ]
  );
  
  const handleSaveToCloud = async () => {
    if (!user) {
      alert("Please sign in to save your resume to the cloud.");
      return;
    }

    try {
      setSaving(true);

      // Check resume limit
      const resumesQuery = query(
        collection(db, RESUMES_COLLECTION),
        where('userId', '==', user.uid),
        limit(MAX_RESUMES_PER_USER)
      );

      const snapshot = await getDocs(resumesQuery);
      if (snapshot.size >= MAX_RESUMES_PER_USER) {
        alert(`You can only save up to ${MAX_RESUMES_PER_USER} resumes.`);
        return;
      }

      // Upload to Google Drive
      const fileName = `resume_${Date.now()}.enc`;
      const compressedData = await compressResumeData(resumeData);
      const fileId = await driveService.uploadFile(fileName, Buffer.from(compressedData));

      // Store reference in Firestore
      await addDoc(collection(db, RESUMES_COLLECTION), {
        userId: user.uid,
        fileName,
        fileId,
        name: resumeData.name || "Untitled Resume", // Changed from title to name
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      alert("Your resume has been saved to the cloud successfully!");
    } catch (error) {
      console.error('Error saving resume:', error);
      alert("Failed to save resume. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const decryptedData = await readEncryptedFile(file);
      setResumeData(decryptedData);
    } catch (error) {
      console.error("Error reading encrypted file:", error);
      alert("Failed to read the encrypted file. Please make sure it's a valid resume file.");
    }
  };

  const handleDownload = async () => {
    // ... existing download code ...
    
    // Show benefits modal if user is not signed in
    if (!auth.currentUser) {
      const showBenefits = window.confirm(
        "Would you like to learn about the benefits of signing in with Google?"
      );
      if (showBenefits) {
        // You can use a more sophisticated modal here
        alert(
          "Benefits of signing in:\n" +
          "- Save up to 3 resumes in the cloud\n" +
          "- Access your resumes from any device\n" +
          "- Edit and download your resumes anytime\n" +
          "- No need to save files locally\n" +
          "- Automatic backup of your resume data"
        );
      }
    }
  };

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
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/2 p-4 overflow-y-auto bg-gradient-to-br from-purple-300 via-blue-200 to-indigo-300">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-2xl font-bold">Create Resume</span>
              <div className="flex flex-wrap items-center gap-2">
                {/* <GoogleSignIn /> */}
                {/* {user && (
                  <Button
                    variant="outline"
                    onClick={handleSaveToCloud}
                    disabled={saving}
                    className="w-full sm:w-auto"
                  >
                    {saving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Save to Cloud
                  </Button>
                )} */}
                <Button
                  variant="outline"
                  onClick={() => downloadEncryptedResume(resumeData)}
                  className="w-full sm:w-auto"
                >
                  Save as File
                </Button>
                <div className="relative w-full sm:w-auto">
                  <input
                    type="file"
                    accept=".enc"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="w-full">
                    <Button variant="outline" className="w-full sm:w-auto" asChild>
                      <div className="flex items-center justify-center gap-2">
                        <Upload className="h-4 w-4" />
                        Load Resume
                      </div>
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Template</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {template}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuGroup>
                      {Array.from(allTemplates.keys()).map((template) => (
                        <DropdownMenuItem
                          key={template}
                          onClick={() => router.push(`/resume-templates/${template}/create`)}
                        >
                          {template}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
{/* 
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Theme</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {theme}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuGroup>
                      {Object.keys(themes).map((theme) => (
                        <DropdownMenuItem
                          key={theme}
                          onClick={() => setResumeData((prev) => ({ ...prev, theme: theme }))}
                        >
                          {theme}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}
            </div>

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
                        if (template.toString() === "Classic") {
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
                setResumeData: setResumeData,
                activeSection: getActiveSection(openSection)
              }
            )}
            {/* <TimelineResume font={fonts[font]} pdfRef={pdfRef} resumeData={resumeData} theme={themes[theme]}/> */}
          </div>
        </div>
      </div>
    </>
  );
}
