import Head from 'next/head';


const generateHeadContent = (templateName: string) => {
  switch (templateName) {
    case 'classic':
      return {
        title: 'Classic Professional Resume Template | ResumeWorld',
        description:
          'Create a timeless and professional resume with our Classic Professional template. Perfect for traditional industries like finance, law, and healthcare.',
        keywords: 'Classic Resume, Professional Template, ATS-friendly Resume, Formal Resume Design',
        image: '/images/1.png',
        url: 'https://yourdomain.com/templates/classic',
      };
    case 'modern':
      return {
        title: 'Modern Creative Resume Template | ResumeWorld',
        description:
          'Stand out with our Modern Creative template. Ideal for designers, marketers, and tech professionals, featuring infographic elements and sleek design.',
        keywords: 'Modern Resume, Creative Template, Infographic Resume, Trendy Resume Design',
        image: '/images/2.png',
        url: 'https://yourdomain.com/templates/modern',
      };
    case 'impact':
      return {
        title: 'Professional Impact Resume Template | ResumeWorld',
        description:
          'Showcase your achievements with the Professional Impact template. Perfect for technical and leadership roles, optimized for ATS.',
        keywords: 'Impact Resume, ATS-friendly Template, Metrics-driven Resume, Leadership Resume Design',
        image: '/images/3.png',
        url: 'https://yourdomain.com/templates/impact',
      };
    default:
      return {
        title: 'Resume Templates | ResumeWorld',
        description: 'Explore our range of professional and creative resume templates tailored to your career needs.',
        keywords: 'Resume Templates, Professional Design, ATS-friendly Resumes',
        image: '/images/default.png',
        url: 'https://yourdomain.com/templates',
      };
  }
};

export default function TemplateDetailRouteHead({templateName}: {templateName:string}) {



  const templateHeadContent = generateHeadContent(templateName);

  // Assuming you have a `templates` object that holds valid template names and content
  if (!templateHeadContent) {
    // Handle the case where the template is not found
    return (
      <div>
        <h1>Template Not Found</h1>
        <p>Sorry, the template you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{templateHeadContent.title}</title>
        <meta name="description" content={templateHeadContent.description} />
        <meta name="keywords" content={templateHeadContent.keywords} />
        
        {/* Open Graph (OG) Tags for Social Media */}
        <meta property="og:title" content={templateHeadContent.title} />
        <meta property="og:description" content={templateHeadContent.description} />
        <meta property="og:image" content={templateHeadContent.image} />
        <meta property="og:url" content={templateHeadContent.url} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={templateHeadContent.title} />
        <meta name="twitter:description" content={templateHeadContent.description} />
        <meta name="twitter:image" content={templateHeadContent.image} />

        {/* Canonical URL */}
        <link rel="canonical" href={templateHeadContent.url} />
      </Head>

      {/* The rest of your template content */}
      <main>
        <h1>{templateHeadContent.title}</h1>
        <p>{templateHeadContent.description}</p>
        <img src={templateHeadContent.image} alt={templateName} />
      </main>
    </>
  );
}
