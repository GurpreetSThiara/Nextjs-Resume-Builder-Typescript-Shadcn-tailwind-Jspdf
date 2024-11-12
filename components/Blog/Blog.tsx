"use client";

import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import { recentPosts } from '@/app/blog/page';
import Image from 'next/image';

const Blog = () => {


  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="container mx-auto px-4">
      <Link href={"/blog"}>
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Latest <span className="text-purple-600">Blog</span> Articles
        </h2>
      </Link>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
        
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover object-center"
              />
            </div>
  
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{post.date}</p>
              
              <Link
                href={post.link}
                className="inline-flex items-center mt-4 text-purple-600 hover:underline font-medium"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

export default Blog;
