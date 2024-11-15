'use client'


import { blogsData } from "@/utils/contants"
import Image from "next/image"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

type BlogPost = {
  title: string;
  excerpt?: string;
  category?: string;
  date: string;
  image: string;
  sections: Section[];
  link?:string;
  summary?:string
};

interface Section {
  id: string;
  title: string;
  content: JSX.Element;
}

type Blogs = { [id: string]: BlogPost };

export default function Component() {
  const blogs: Blogs = blogsData;
  const [activeSection, setActiveSection] = useState("")
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading , setLoading] = useState(true);
  console.log(blogPost)
  const params = useParams();
  console.log(params)

 useEffect(()=>{
    if(params.blogId){
        const id: string = params.blogId.toString();
        if(blogs[id]){
            setBlogPost(blogs[id])
        }else{
            setBlogPost(null)
            setLoading(false)
        }
      }
    
 },[])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    blogPost?.sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])
  
  if(!blogPost && loading){
    return       <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-8 border-t-8 border-t-blue-500 border-solid rounded-full animate-spin mb-6"></div>
      <p className="text-2xl font-bold text-gray-700 animate-pulse">Loading...</p>
      <p className="mt-2 text-sm text-gray-500">Please wait while we prepare the content for you.</p>
    </div>
  </div>
  }

  if (!blogPost && !loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-50 to-yellow-50">
        <div className="flex flex-col items-center">
          {/* <div className="w-16 h-16 border-8 border-t-8 border-t-red-500 border-solid rounded-full animate-spin mb-6"></div> */}
          <p className="text-2xl font-bold text-gray-800 mb-4">Oops! No Blog Found</p>
          <p className="text-lg text-gray-600 mb-4">It seems like the blog you&apos;re looking for doesn&apos;t exist.</p>
          <p className="text-sm text-gray-500">Try refreshing the page, or explore other posts.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      {/* <Link
        href="#"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to blog
      </Link> */}

      {blogPost  && (
        <article className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{blogPost?.date}</p>
          <h1 className="font-serif text-4xl/tight sm:text-5xl/tight font-medium tracking-tight">
            {blogPost?.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl">{blogPost?.summary}</p>
          <div className="flex gap-2">
            <span className="inline-block px-3 py-1 text-xs rounded-full border">Tag number 1</span>
            <span className="inline-block px-3 py-1 text-xs rounded-full border">Lorem ipsum</span>
            <span className="inline-block px-3 py-1 text-xs rounded-full border">Lorem ipsum dolor</span>
            <span className="inline-block px-3 py-1 text-xs rounded-full border">Tag number 2</span>
          </div>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
          <Image
            src={blogPost.image}
            alt="Modern living room interior"
            className="object-cover"
            fill
            priority
          />
        </div>

        <div className="flex flex-col md:flex-row  gap-4 ">
          <aside className="self-start   md:sticky top-6">
            <div className="space-y-4">
              <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Summary
              </h2>
              <nav className="space-y-3">
                {blogPost.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`text-sm hover:text-foreground w-full text-left ${
                      activeSection === section.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {blogPost.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="prose prose-gray dark:prose-invert max-w-none mb-12"
              >
                {/* <h2 className="font-serif text-2xl font-medium tracking-tight">{section.title}</h2> */}
                <p>{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
      )}

      {/* <section className="mt-16">
        <h2 className="font-serif text-2xl font-medium tracking-tight mb-8">Similar Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {similarPosts.map((post) => (
            <Link key={post.id} href="#" className="group">
              <div className="space-y-4">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg group-hover:underline">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                  <p className="text-sm text-muted-foreground mt-2">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section> */}
    </div>
  )
}