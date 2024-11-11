"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "Is FreeResumeATS really a free resume builder?",
      answer: "Yes, FreeResumeATS is 100% free. We don't have any hidden charges or premium features. All our resume building tools and services are available to everyone at no cost.",
    },
    {
      question: "How does this free resume maker generate income?",
      answer: "We generate income through displaying ads on the platform. These ads help keep the resume maker free for everyone, and we ensure they are non-intrusive and won't disrupt your experience.",
    },
    {
      question: "Can I really create an ATS-friendly resume for free?",
      answer: "Our platform is designed to create resumes and CVs that are optimized for Applicant Tracking Systems, and it's all available for free.",
    },
    {
      question: "How often can I update my resume or CV?",
      answer: "You can update your resume or CV as often as you like. There are no limits on edits or downloads with our free resume builder.",
    },
    {
      question: "Is my information secure on this free resume maker?",
      answer: "Yes, your information is completely secure. We do not provide cloud storage or store any of your data on our servers. All your data is stored only on your device, ensuring full privacy and security.",
    },
    {
      question: "Is there customer support available for this free resume maker?",
      answer: "Currently, we do not have dedicated customer support. However, if you encounter any bugs or issues, feel free to contact us at yourfreeresume@gmail.com. We're working on building our support team, so dedicated assistance will be available soon.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <header>
          <h2
            id="faq-heading"
            className="text-3xl font-bold text-center mb-12 text-gray-900"
          >
            Frequently Asked Questions About Our <h1 className="text-4xl font-extrabold text-purple-600" >Best Free Resume Builder</h1>
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="w-full"
              aria-label={`FAQ item ${index + 1}`}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <AccordionTrigger className="flex justify-between items-center w-full p-6 text-left text-lg font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-gray-700">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
