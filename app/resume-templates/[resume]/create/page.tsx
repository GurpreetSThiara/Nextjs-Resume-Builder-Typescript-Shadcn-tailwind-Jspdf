import Create from "@/components/resume/Create/Create";
import { Metadata } from "next";

// interface Props {
//   params: { resume?: string };
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = params.resume ?? "classic";

  return {
    title: "Free ATS-Friendly Resume Builder & Templates",
    description:
      "Create professional, ATS-friendly resumes for free with customizable templates to help you land your dream job.",
    keywords:
      "free resume builder, professional resume templates, ATS friendly, resume templates, job applications",
    author: "Gurpreet",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1.0",
    openGraph: {
      title: "Free Resume Builder Professional ATS Friendly Templates",
      description:
        "Free Professional ATS friendly Resume templates to help you land your dream job. All resume templates are completely 100% free, customize according to your needs. Create a professional resume for job applications.",
      url: `https://resume.giveaways4u.com/templates/${template}/create`,
      type: "website",
      siteName: "Free Resume Builder ATS",
      images: [
        {
          url: "https://drive.google.com/file/d/1SShn45ecoAdy3p0MrpPLoSnDHyPKX8Zq/view?usp=sharing",
          width: 1200,
          height: 630,
          alt: "Free Resume Builder Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Resume Builder Professional ATS Friendly Templates",
      description:
        "Free Professional ATS friendly Resume templates to help you land your dream job. All resume templates are completely 100% free, customize according to your needs. Create a professional resume for job applications.",
      site: "@YourAtsResume",
      images: [
        "https://drive.google.com/file/d/1SShn45ecoAdy3p0MrpPLoSnDHyPKX8Zq/view?usp=sharing",
      ],
    },
    other: {
      copyright: "2024 FreeResumeBuilder",
    },
  };
}

const Page = () => {
  return (
    <div>
      <Create />
    </div>
  );
};

export default Page;
