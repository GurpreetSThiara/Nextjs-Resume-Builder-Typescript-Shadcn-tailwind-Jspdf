"use client";

import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Edit,
  Download,
  Share2,
  ArrowRight,
  Search,
  Users,
  Pencil,
} from "lucide-react";

import { useRouter } from "next/navigation";
import FAQ from "@/components/Accordians/FAQ";
import Blog from "@/components/Blog/Blog";
import InPushBanner from "@/components/Propeller/InPushBanner";
import Interstitial from "@/components/Propeller/Interstitial";
import Carousel from "@/components/Header/Carousal";
import FeatureGrid from "@/components/grid/FeatureGrid";
import Image from "next/image";
import resume_background from '/public/images/resume_background.webp'



// import classicResume from '../public/images/1.png'
// import ModernProfessional from '../public/images/1.png'
// import ImpactProfessional from '../public/images/1.png'

//import resumeLogo from '../public/Free Resume Builder 100% free No Hidden Cost.png'

export default function HomePage() {
  const router = useRouter();

  const navigate = () => {
    router.push("/resume-templates");
  };
  return (
    <>
      <Head>
        <title>
          Free Resume Builder | Create ATS-Friendly Resumes | Free Resume ATS
        </title>
        <meta
          name="description"
          content="Create professional, ATS-friendly resumes for free with Free Resume ATS. Our  resume builder helps you craft the perfect CV to land your dream job."
        />
        <meta
          name="keywords"
          content="resume, resume builder, free resume, CV, curriculum vitae, free CV, resume maker, ATS-friendly resume, job application"
        />
        <meta
          name="google-site-verification"
          content="B36csgvM_AAnw_8kLhlNeSVddetiFzp_0BimIM7IMVM"
        />
        <link rel="canonical" href="https://resume.giveaways4u.com" />
        <meta name="author" content="Gurpreet" />
        <meta name="copyright" content="2024 FreeResumeBuilder" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Free Resume Builder Professional ATS Friendly Templates"
        />
        <meta
          property="og:description"
          content="Free Professional ATS friendly Resume templates to help you land your dream job. all resume templates are completely 100% free, customize according to your needs. create professional Resume for job applications."
        />
        <meta
          property="og:image"
          content="https://drive.google.com/file/d/1NWVWDKyIIApQWIR95sSXDzaRBceoh-qH/view?usp=drive_link"
        />
        <meta property="og:url" content="https://resume.giveaways4u.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Free Resume Builder ATS" />
        {/* <meta property="fb:app_id" content="YOUR_APP_ID" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Free Resume Builder Professional ATS Friendly Templates"
        />
        <meta
          name="twitter:description"
          content="Free Professional ATS friendly Resume templates to help you land your dream job. all resume templates are completely 100% free, customize according to your needs. create professional Resume for job applications."
        />
        <meta
          name="twitter:image"
          content="https://drive.google.com/file/d/1SShn45ecoAdy3p0MrpPLoSnDHyPKX8Zq/view?usp=sharing"
        />
        <meta name="twitter:site" content="@YourAtsResume" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Free Resume Builder Tool",
      "description": "Create professional, ATS-friendly resumes for free with our intuitive resume builder tool. Customize templates to fit your career needs and land your dream job.",
      "url": "https://resume.giveaways4u.com",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://resume.giveaways4u.com/"
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
        "url": "https://resume.giveaways4u.com",
        "price": "0.00",
        "priceCurrency": "USD"
      }
    }
  `}
        </script>
      </Head>
   
    
            <InPushBanner/>
           <Interstitial/>
  

      <div className=" flex flex-col  bg-gradient-to-br from-gray-50 to-gray-100">
        <main className="flex-1 z-50">
         <div className="block ">
         <div className=" absolute w-[100vw] h-[80vh]" style={{
          height:"calc(100vh - 64px)"
         }}>
        <Image src={resume_background} layout="fill" alt="no image"/>
      </div>
      <section className="w-full relative overflow-hidden py-20 md:py-32 lg:py-48">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/95 to-indigo-600/95 pointer-events-none" />
  <div className="absolute inset-0 bg-grid-white/[0.095] bg-[size:20px_20px] pointer-events-none" />
  <div className="relative container mx-auto px-4 text-center">
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-white">
      Create Your Perfect{" "}
      <strong>
        <span className="text-yellow-400 text-5xl md:text-7xl font-extrabold">
          Resume
        </span>
      </strong>{" "}
      for Free
    </h1>
    <div className="flex justify-center">
    <h2 className="font-semibold text-xl text-center text-white w-full md:w-[85%] lg:w-[65%]"><strong>Completely Free Resume Builder/Maker no hidden fees</strong>, no credit cards, no debit cards, no signups required, just put your data and get your resume ready at no cost</h2>

    </div>
    <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto pt-4">
      Craft{" "}
      <strong>
        <span className="font-semibold text-purple-50 text-2xl">
          ATS
        </span>
      </strong>
      -friendly{" "}
      <strong>
        <span className="font-semibold text-yellow-400 text-2xl">
          Resumes
        </span>
      </strong>{" "}
      that land interviews. Powered by AI, 100% free, <strong>no hidden Fees</strong> and
      charges.
      <strong> Best for students and professionals</strong>
      <strong className="hidden">resume builder los angeles</strong>
      <strong className="hidden">maintenance building resume</strong>
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button
        onClick={navigate}
        size="lg"
        className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 font-bold text-md md:text-2xl"
      >
        Build Your Resume Now
      </Button>
    </div>

    <div className="email p-4">
      <h3 className="font-semibold text-white text-xl">Email us At</h3>
      <h1 className="font-bold text-white text-3xl"> 
        <a href="mailto:yourfreeresume@gmail.com">
          yourfreeresume@gmail.com
        </a>
      </h1>
    </div>

    {/* <div className="flex justify-between">
     { ['100% free','No Fees', 'No Charges', 'No Subscriptions','Resume','CV','Free Download'].map((text,index)=>{
      return <div className="" key={`index ${index}`}>
        <HeroCard text={text}/>
      </div>
     })}
    </div> */}
  </div>
</section>
       <div className="block lg:flex">
       <section className=" w-full lg:w-[50%] bg-gradient-to-b from-background to-muted flex flex-col justify-center items-center">
        <h1 className='text-center font-bold text-4xl py-4'>Choose any from Completely <strong><span>FREE Professional Resume Templates</span></strong></h1>

<Carousel/>
        </section>
        <FeatureGrid/>
        {/* <section className="grid grid-cols-2 ">
          {
            ['Free Resume Maker','No Hidden Charges','Highly ATS Friendly','Professonal Free Templates','Multiple Downlaod Formats'].map((item,index)=>{
              return <div className="" key={`key ${index}`}>
                <div className="bg-purple-500 p-2 rounded-lg">
                  <h1 className="text-2xl text-gray-50 " >
                    <strong>
                    {item}
                    </strong>
                  </h1>
                </div>
              </div>
            })
          }
        </section> */}
       </div>
         </div>

          <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Powerful <span className="text-purple-600">Resume</span>{" "}
                Building Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Search,
                    title: "ATS-Optimized Templates",
                    description:
                      "Our resume templates are designed to pass through Applicant Tracking Systems with ease.",
                  },
                  {
                    icon: Edit,
                    title: "Easy Resume Editing",
                    description:
                      "Intuitive interface for quick and easy resume creation and editing.",
                  },
                  {
                    icon: Download,
                    title: "Multiple CV Formats",
                    description:
                      "Download your resume or CV in PDF, DOCX, or TXT formats - all for free.",
                  },
                  {
                    icon: Share2,
                    title: "Easy Resume Sharing",
                    description:
                      "Share your resume directly with employers or on social media at no cost.",
                  },
                  {
                    icon: Users,
                    title: "Industry-Specific Templates",
                    description:
                      "Choose from a variety of free resume templates tailored to your industry.",
                  },
                  {
                    icon: Pencil,
                    title: "Resume Customization",
                    description:
                      "lot of Resume customization options to make your resume stand out.",
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-gray-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <feature.icon className="h-8 w-8 text-purple-600 mb-2" />
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className="py-20 bg-gradient-to-br from-purple-100 to-indigo-100"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                How Our Free{" "}
                <span className="text-purple-600 text-4xl font-extrabold">
                  Resume
                </span>{" "}
                Maker Works
              </h2>
              <div className="max-w-4xl mx-auto">
                {[
                  {
                    title: "Choose a Resume Template",
                    description:
                      "Select from our wide range of ATS-friendly resume templates.",
                  },
                  {
                    title: "Fill in Your CV Details",
                    description:
                      "Fill information  to your curriculum vitae or Resume.",
                  },
                  {
                    title: "Download and Apply",
                    description:
                      "Get your polished resume or CV instantly - no payment required!",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-start mb-8">
                    <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="blog">
            <Blog />
          </section>

          <section id="faq" className="">
            <FAQ />
          </section>

          <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Build Your Perfect{" "}
                  <span className="text-yellow-400">Resume</span> for Free?
                </h2>
                <p className="text-xl mb-8 text-purple-100">
                  Join thousands of job seekers who have successfully landed
                  their dream jobs with our free resume builder. Remember,{" "}
                  {"it's"} 100% free - no catches, no hidden fees..
                </p>
                <Button
                  onClick={navigate}
                  className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 font-bold text-md md:text-2xl"
                >
                  Create Your Free Resume Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
