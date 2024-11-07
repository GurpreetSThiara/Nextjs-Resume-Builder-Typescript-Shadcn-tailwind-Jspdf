"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "How to Create an ATS-Friendly Resume",
      description: "Learn the essentials of crafting resumes that pass through Applicant Tracking Systems effortlessly.",
      link:'/'
     // link: "/blog/ats-friendly-resume",
    },
    {
      title: "Top 5 Resume Mistakes to Avoid",
      description: "Discover common resume pitfalls and how to avoid them to make a great first impression.",
        link:'/'
     // link: "/blog/resume-mistakes",
    },
    {
      title: "Why You Should Customize Your Resume for Each Job",
      description: "Find out how tailoring your resume to each job application can increase your chances of success.",
        link:'/'
      //link: "/blog/customize-resume",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Latest <span className="text-purple-600">Blog</span> Articles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.description}</p>
                <Link href={post.link} className="inline-flex items-center mt-4 text-purple-600 hover:underline">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
