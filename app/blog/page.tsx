"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
  
export default function ResumeBlog() {
    
  const featuredPosts = [
    {
     link:'/blog/resume-trends-2024-stand-out-job-market',
      title: "Top Resume Trends for 2024: Stand Out in the Job Market",
      excerpt: "Discover the latest resume trends that will help you catch the eye of recruiters and land your dream job in 2024.",
      category: "Resume Tips",
      date: "November 11, 2024",
      image: "https://img.freepik.com/free-photo/resume-application-employment-form-concept_53876-132184.jpg?t=st=1731305355~exp=1731308955~hmac=4305eef2d87a98595d79b3563eb74d8fd7c26f838132f32a54cd1c4a864cddec&w=1060"
    },
    {
      link:'/blog/professional-summary-tips-career-success',
      title: "Mastering the Art of the Professional Summary",
      excerpt: "Learn how to craft a compelling professional summary that showcases your value and grabs employers' attention.",
      category: "Career Advice",
      date: "November 11, 2024",
      image: "https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-priorities_516790-1573.jpg?w=826"
    }
  ]

  const regularPosts = [
    {
      link:"/5-common-resume-mistakes-to-avoid",
      title: "5 Common Resume Mistakes and How to Avoid Them",
      excerpt: "Uncover the frequent errors that job seekers make on their resumes and learn how to steer clear of these pitfalls.",
      category: "Resume Tips",
      date: "November 11, 2024",
      image: "https://img.freepik.com/premium-vector/recruitment-concept-vector_485380-1128.jpg?ga=GA1.1.198708123.1730970819&semt=ais_hybrid"
    },
    {
        link:"/tailor-resume-for-different-industries",
      title: "Tailoring Your Resume for Different Industries",
      excerpt: "Discover strategies for customizing your resume to align with specific industry expectations and requirements.",
      category: "Job Search",
      date: "November 11, 2024",
      image: "https://img.freepik.com/premium-vector/hiring-concept-vector_485380-1019.jpg?ga=GA1.1.198708123.1730970819&semt=ais_hybrid"
    },
    {
        link:"/action-verbs-boost-resume-impact",
      title: "Using Action Verbs to Strengthen Your Resume",
      excerpt: "Explore how using strong action verbs can transform your resume and make your achievements more impactful.",
      category: "Writing Tips",
      date: "November 11, 2024",
      image: "https://img.freepik.com/premium-vector/cv-business-resume-hand-office-chair-job-interview-recruitment-search-employer-hiring_284092-1813.jpg?w=1380"
    }
  ]

  const categories = ["Resume Tips", "Career Advice", "Job Search", "Interview Prep", "Networking"]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-100 to-indigo-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Latest <span className="text-purple-600">Career</span> Insights
        </h2>
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <main className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post, index) => (
                <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Link href={post.link} className="block">
                    <CardHeader className="p-0">
                      <Image
                        alt={post.title}
                        className="object-cover w-full aspect-[4/3] rounded-t-lg"
                        height={400}
                        src={post.image}
                        width={600}
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-purple-100 text-purple-600">{post.category}</Badge>
                      <CardTitle className="text-2xl font-bold mb-2 text-gray-800">{post.title}</CardTitle>
                      <p className="text-gray-600">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="px-6 py-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">Posted on {post.date}</p>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {regularPosts.map((post, index) => (
                <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/blog/${post.link}`} className="block">
                    <CardHeader className="p-0">
                      <Image
                        alt={post.title}
                        className="object-cover w-full aspect-[4/3] rounded-t-lg"
                        height={300}
                        src={post.image}
                        width={400}
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-purple-100 text-purple-600">{post.category}</Badge>
                      <h3 className="font-bold mb-2 text-xl text-gray-800">{post.title}</h3>
                      <p className="text-sm text-gray-600">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="px-6 py-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Posted on {post.date}</p>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          </main>

          <aside className="space-y-8">
            <Card className="bg-white border-none shadow-lg">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input className="pl-10" placeholder="Search career tips..." type="search" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg">
              <CardHeader>
                <h2 className="font-bold text-xl text-gray-800">Recent Posts</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <Link key={index} href={post.link} className="flex gap-4 items-start group">
                      <Image
                        alt="Thumbnail"
                        className="rounded object-cover aspect-square"
                        height={50}
                        src={post.image}
                        width={50}
                      />
                      <div>
                        <p className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">{post.title}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none shadow-lg">
              <CardContent className="p-6">
                <blockquote className="space-y-2">
                  <p className="text-lg">
                    Your resume is the bridge between your qualifications and your career aspirations.
                  </p>
                  <footer className="text-sm">- Katherine Johnson</footer>
                </blockquote>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg">
              <CardHeader>
                <h2 className="font-bold text-xl text-gray-800">Categories</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href="#"
                      className="block text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Ready to Build Your Perfect Resume?</h3>
                <p className="mb-6">Create your ATS-friendly resume for free today!</p>
                <Link href={"/create"}>
                <Button className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                 Start Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button> </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  )
}

