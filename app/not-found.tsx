"use client";

import Link from 'next/link';
import Head from 'next/head';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found | FreeResumeATS</title>
        <meta name="description" content="The page you're looking for does not exist. Navigate back to the homepage and continue exploring FreeResumeATS." />
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 justify-center items-center text-center">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">
          It looks like the page you're looking for doesn’t exist. You might have followed a broken link or mistyped the URL.
        </p>

        <Link href="/">
          <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
            Go Back Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </>
  );
}
