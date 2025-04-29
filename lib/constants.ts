import { rgb } from "pdf-lib";
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
      },
      rgb: {
        primary: rgb(17/255, 17/255, 17/255),
        secondary: rgb(99/255, 99/255, 99/255),
        text: rgb(55/255, 55/255, 55/255),
        heading: rgb(29/255,78/255,216/255)
      },
      pdfSize: {
        name: 24,
        //fdgrgreg
        section: 14,
        content: 12,
        small: 10
      },
      pdfSpacing: {
        section: 24,
        item: 4,
        page:16
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
      },
      rgb:{
        primary: rgb(17/255, 17/255, 17/255),
        secondary: rgb(99/255, 99/255, 99/255),
        text: rgb(55/255, 55/255, 55/255),
        heading:rgb(29/255,78/255,216/255)
      },
      pdfSize: {
        name: 24,
        section: 14,
        content: 12,
        small: 10
      },
      pdfSpacing: {
        section: 24,
        item: 4,
        page:16
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
      },
      rgb: {
        primary: rgb(17/255, 17/255, 17/255),
        secondary: rgb(99/255, 99/255, 99/255),
        text: rgb(55/255, 55/255, 55/255),
        heading: rgb(29/255,78/255,216/255)
      },
      pdfSize: {
        name: 24,
        section: 14,
        content: 12,
        small: 10
      },
      pdfSpacing: {
        section: 24,
        item: 4,
        page:16
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
    linkedin:"linkedin",
    custom:{
        "custom_dob_963852":{
          "title": "Date of Birth",
          "content": "January 1, 1990",
          "hidden": false,
          "id": "custom_dob_963852",
          "link": false
        },
        "custom_nationality_753951":{
          "title": "nationality",
          "content": "American",
          "hidden": true,
          "id": "custom_nationality_753951",
          "link": false
        },
        "custom_marital_status_852147":{
          "title": "Marital Status",
          "content": "Single",
          "hidden": false,
          "id": "custom_marital_status_852147",
          "link": false
        },
        // "custom_emergency_contact_357951":{
        //   "title": "emergency_contact",
        //   "content": "+1 (987) 654-3210",
        //   "hidden": false,
        //   "id": "custom_emergency_contact_357951",
        //   "link": false
        // },
        "custom_website_369741":{
          "title": "website",
          "content": "www.johndoe.com",
          "hidden": false,
          "id": "custom_website_369741",
          "link": true
        },
        "custom_gender_951753":{
          "title": "gender",
          "content": "Male",
          "hidden": false,
          "id": "custom_gender_951753",
          "link": false
        },
        // "custom_blood_group_159753":{
        //   "title": "blood_group",
        //   "content": "O+",
        //   "hidden": false,
        //   "id": "custom_blood_group_159753",
        //   "link": false
        // },
     
        // "permanent_address":{
        //   "title": "permanent_address",
        //   "content": "1234 Elm Street, San Francisco, CA, USA",
        //   "hidden": false,
        //   "id": "custom_permanent_address_258369",
        //   "link": false
        // },
        // "current_address":{
        //   "title": "current_address",
        //   "content": "5678 Oak Street, San Francisco, CA, USA",
        //   "hidden": false,
        //   "id": "custom_current_address_456987",
        //   "link": false
        // }
        },
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
            "Led a team of 8 engineers across 3 locations, collaborating on developing scalable web applications and APIs.",
            "Implemented automated testing and CI/CD pipelines, reducing deployment time by 40% and improving code reliability",
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
  
  
export const recentPosts = [
  {
    link: '/blog/networking-strategies-for-job-seekers',
    title: "Networking Strategies for Job Seekers",
    date: "November 11, 2024",
    image: "https://img.freepik.com/premium-vector/hands-using-tablet-check-social-networks_18591-25253.jpg?ga=GA1.1.198708123.1730970819&semt=ais_hybrid",
    seoDescription: "Discover essential networking strategies for job seekers to build valuable professional connections and land your dream job. Learn how to network effectively both online and offline."
  },
  {
    link: '/blog/highlight-soft-skills-on-your-resume',
    title: "How to Highlight Soft Skills on Your Resume",
    date: "November 11, 2024",
    image: "https://img.freepik.com/premium-vector/soft-skills-vector-illustration-office-workers-empathy-skill-work-template_2175-16558.jpg?ga=GA1.1.198708123.1730970819&semt=ais_hybrid",
    seoDescription: "Learn how to effectively showcase your soft skills on your resume, including communication, teamwork, and problem-solving. Enhance your chances of getting hired by emphasizing these essential qualities."
  },
  {
    link: '/blog/resume-formatting-dos-and-donts',
    title: "The Do's and Don'ts of Resume Formatting",
    date: "November 11, 2024",
    image: "https://img.freepik.com/premium-vector/hands-holding-signboard-with-tick-cross-symbols-flat-design_798171-2095.jpg?w=996",
    seoDescription: "Master resume formatting with this comprehensive guide on the do’s and don’ts. Learn how to structure your resume to grab the attention of hiring managers and boost your chances of landing an interview."
  }
];
