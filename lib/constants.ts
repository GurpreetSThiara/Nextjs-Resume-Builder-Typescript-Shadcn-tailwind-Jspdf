import { FontConfig, FontType, ResumeData, ThemeConfig, ThemeType } from "./types";

export const themes: Record<ThemeType, ThemeConfig> = {
    modern: {
      fontFamily: 'inter',
      fontSize: {
        name: 'text-2xl',
        section: 'text-lg',
        content: 'text-sm',
        small: 'text-xs'
      },
      spacing: {
        section: 'mb-4',
        item: 'mb-2'
      },
      colors: {
        primary: 'text-gray-900',
        secondary: 'text-gray-600',
        text: 'text-gray-700'
      }
    },
    traditional: {
      fontFamily: 'times',
      fontSize: {
        name: 'text-2xl',
        section: 'text-base',
        content: 'text-sm',
        small: 'text-xs'
      },
      spacing: {
        section: 'mb-3',
        item: 'mb-1'
      },
      colors: {
        primary: 'text-black',
        secondary: 'text-gray-800',
        text: 'text-gray-900'
      }
    },
    minimal: {
      fontFamily: 'helvetica',
      fontSize: {
        name: 'text-xl',
        section: 'text-base',
        content: 'text-sm',
        small: 'text-xs'
      },
      spacing: {
        section: 'mb-3',
        item: 'mb-1'
      },
      colors: {
        primary: 'text-gray-800',
        secondary: 'text-gray-600',
        text: 'text-gray-700'
      }
    }
  }
  
export  const fonts: Record<FontType, FontConfig >= {
    inter: {
      name: 'Inter',
      className: 'font-sans'
    },
    times: {
      name: 'Times New Roman',
      className: 'font-serif'
    },
    helvetica: {
      name: 'Helvetica',
      className: 'font-sans'
    },
    georgia: {
      name: 'Georgia',
      className: 'font-serif'
    }
  }
  
export  const initialResumeData: ResumeData = {
    name: "John Doe",
    email: "john.doe@resumeworld.com",
    phone: "+1 (123) 456-7890",
    location: "San Francisco, CA",
    sections: [
      {
        id: '1',
        title: 'Education',
        content: {
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
        id: '2',
        title: 'Professional Experience',
        content: {
          "Innovatech Solutions | Senior Software Engineer": [
            "Oct 2017 – Present",
            "San Francisco, CA",
            "Led a team of 8 engineers across 3 locations, collaborating on developing scalable web applications and APIs for high-traffic environments",
            "Implemented automated testing and CI/CD pipelines, reducing deployment time by 40% and improving code reliability",
            "Designed a data processing system that reduced report generation time by 60%, enhancing data accessibility for decision-making"
          ],
          "Webwise Inc. | Software Engineer": [
            "Jun 2015 – Oct 2017",
            "San Francisco, CA",
            "Built and maintained RESTful APIs, optimizing performance to handle over 100,000 requests per minute",
            "Streamlined data retrieval processes, decreasing load times by 20% across the platform, and improving user experience",
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
        id: '3',
        title: 'Other',
        content: {
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
  };
  
  