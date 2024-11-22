import ResumeTemplatesPage from "@/components/resume/TemplatesPage/Templates";

export const metadata = {
  title: "Professional Resume Templates",
  description:
    "Choose from a variety of 100% free professional resume templates. Perfect designs to showcase your skills and experience. Build and download your resume for free today!",
  keywords:
    "resume templates, free resume, professional resume, CV templates, customizable resumes, job application templates, resume maker, free resume builder",
  authors: [{ name: "Free Resume ATS" }],
  viewport: "width=device-width, initial-scale=1.0",
  metadataBase: new URL("https://resume.giveaways4u.com"),
  alternates: {
    canonical: "https://resume.giveaways4u.com/resume-templates",
  },
  openGraph: {
    title: "Professional Resume Templates - Free and Customizable",
    description:
      "Create your perfect resume with our professional templates. Build your career-changing resume for free!",
    url: "https://resume.giveaways4u.com/resume-templates",
    images: [
      {
        url: "https://drive.google.com/uc?export=view&id=1rzZvCei7v3X27ZeRWuoIOe4mxDXCOOV4",
        width: 1200,
        height: 630,
        alt: "Professional and 100% FREE Resume Templates",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Resume Templates - 100% Free and Customizable",
    description:
      "Choose from our professional resume templates. Build your career-changing resume for free!",
    images: [
      "https://drive.google.com/uc?export=view&id=1rzZvCei7v3X27ZeRWuoIOe4mxDXCOOV4",
    ],
  },
};

export default function Page() {
  return (
    <main>
      {/* <h1>Explore Professional Resume Templates</h1>
      <p>Find the perfect template to highlight your skills and experience!</p> */}
      <ResumeTemplatesPage/>
    </main>
  );
}
