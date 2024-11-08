import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
import React, { LegacyRef } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

type ResumeProps = {
  theme: ThemeConfig,
  resumeData: ResumeData,
  font: FontConfig,
  pdfRef: LegacyRef<HTMLDivElement> | undefined
}

// Design 1: Material Card
const MaterialCardResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-8">
          <header className="mb-8">
            <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-blue-600`}>
              {resumeData.name}
            </h1>
            <div className={`${theme.fontSize.small} text-gray-600 flex flex-wrap gap-4`}>
              <span>{resumeData.email}</span>
              <span>{resumeData.phone}</span>
              <span>{resumeData.location}</span>
            </div>
          </header>

          {resumeData.sections.map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-600 mb-4 uppercase`}>{section.title}</h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <Card key={key} className="mb-4 shadow">
                  <CardContent className="p-4">
                    {key && (
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                        <span className={`${theme.fontSize.small} text-gray-500`}>{key.split(' | ')[1]}</span>
                      </div>
                    )}
                    <ul className="list-disc ml-5 space-y-1">
                      {bullets.map((bullet, index) => (
                        <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </section>
          ))}

          {resumeData.skills && (
            <section className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-600 mb-4 uppercase`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Design 2: Google Search Results
const GoogleSearchResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className={`${theme.fontSize.name} font-normal text-3xl mb-2 text-blue-700`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} text-green-700 flex flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        {resumeData.sections.map((section) => (
          <section key={section.id} className="mb-8">
            <h2 className={`${theme.fontSize.section} font-medium text-gray-800 mb-4`}>{section.title}</h2>
            {Object.entries(section.content).map(([key, bullets]) => (
              <div key={key} className="mb-4">
                {key && (
                  <div className="mb-2">
                    <h3 className={`${theme.fontSize.content} font-medium text-blue-600`}>{key.split(' | ')[0]}</h3>
                    <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                  </div>
                )}
                <ul className="list-disc ml-5 space-y-1">
                  {bullets.map((bullet, index) => (
                    <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

        {resumeData.skills && (
          <section className="mb-8">
            <h2 className={`${theme.fontSize.section} font-medium text-gray-800 mb-4`}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className={`${theme.fontSize.small} text-blue-600 underline cursor-pointer`}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Design 3: Google Drive
const GoogleDriveResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className={`${theme.fontSize.name} font-bold text-3xl mb-2`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} flex flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </div>

        <div className="p-6">
          {resumeData.sections.map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-600 mb-4 flex items-center`}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                {section.title}
              </h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <div key={key} className="mb-4 pl-7">
                  {key && (
                    <div className="mb-2">
                      <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                      <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                    </div>
                  )}
                  <ul className="list-disc ml-5 space-y-1">
                    {bullets.map((bullet, index) => (
                      <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          {resumeData.skills && (
            <section className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-600 mb-4 flex items-center`}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 pl-7">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Design 4: Google Keep
const GoogleKeepResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  const colors = ['bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-red-100', 'bg-purple-100'];

  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 bg-white p-6 rounded-lg shadow">
          <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-gray-800`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} text-gray-600 flex flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumeData.sections.map((section, sectionIndex) => (
            <section key={section.id} className={`${colors[sectionIndex % colors.length]} p-6 rounded-lg shadow`}>
              <h2 className={`${theme.fontSize.section} font-medium text-gray-800 mb-4`}>{section.title}</h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <div key={key} className="mb-4">
                  {key && (
                    <div className="mb-2">
                      <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                      <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                    </div>
                  )}
                  <ul className="list-disc ml-5 space-y-1">
                    {bullets.map((bullet, index) => (
                      <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          {resumeData.skills && (
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className={`${theme.fontSize.section} font-medium text-gray-800 mb-4`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Design 5: Google Calendar
const GoogleCalendarResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-blue-600 text-white p-6">
          <h1 className={`${theme.fontSize.name} font-bold text-3xl mb-2`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} flex flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <div className="p-6">
          {resumeData.sections.map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-600 mb-4`}>{section.title}</h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <div key={key} className="mb-4 border-l-4 border-blue-200 pl-4">
                  {key && (
                    <div className="mb-2">
                      <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                      <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                    </div>
                  )}
                  <ul className="space-y-1">
                    {bullets.map((bullet, index) => (
                      <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          {resumeData.skills && (
            <section className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-600 mb-4`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Design 6: Google Docs
const GoogleDocsResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-blue-50 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <h1 className={`${theme.fontSize.name} font-bold text-3xl text-gray-800`}>
            {resumeData.name}
          </h1>
        </div>

        <div className="p-6">
          <div className={`${theme.fontSize.small} text-gray-600 flex flex-wrap gap-4 mb-6`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>

          {resumeData.sections.map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-700 mb-4 pb-2 border-b border-gray-200`}>{section.title}</h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <div key={key} className="mb-4">
                  {key && (
                    <div className="mb-2">
                      <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                      <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                    </div>
                  )}
                  <ul className="list-disc ml-5 space-y-1">
                    {bullets.map((bullet, index) => (
                      <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          {resumeData.skills && (
            <section className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-700 mb-4 pb-2 border-b border-gray-200`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Design 7: Google Analytics
const GoogleAnalyticsResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-800 text-white p-6">
          <h1 className={`${theme.fontSize.name} font-bold text-3xl mb-2`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} flex flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <div className="p-6">
          {resumeData.sections.map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-gray-800 mb-4 flex items-center`}>
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {section.title}
              </h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <Card key={key} className="mb-4">
                  <CardContent className="p-4">
                    {key && (
                      <div className="mb-2 flex justify-between items-baseline">
                        <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                        <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                      </div>
                    )}
                    <ul className="space-y-1">
                      {bullets.map((bullet, index) => (
                        <li key={index} className={`${theme.fontSize.small} text-gray-700 flex items-center`}>
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </section>
          ))}

          {resumeData.skills && (
            <section className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-gray-800 mb-4 flex items-center`}>
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <span className={`${theme.fontSize.small} text-gray-700 mr-2`}>{skill}</span>
                    <Progress value={Math.random() * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Design 8: Google Material You
const GoogleMaterialYouResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-blue-50 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        <header className="bg-blue-600 text-white p-8">
          <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} flex flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <div className="p-8">
          {resumeData.sections.map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-800 mb-4`}>{section.title}</h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <Card key={key} className="mb-4 rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    {key && (
                      <div className="mb-2">
                        <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                        <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                      </div>
                    )}
                    <ul className="space-y-2">
                      {bullets.map((bullet, index) => (
                        <li key={index} className={`${theme.fontSize.small} text-gray-700 flex items-start`}>
                          <svg className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </section>
          ))}

          {resumeData.skills && (
            <section className="mb-8">
              <h2 className={`${theme.fontSize.section} font-medium text-blue-800 mb-4`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 rounded-full px-4 py-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export {
  MaterialCardResume,
  GoogleSearchResume,
  GoogleDriveResume,
  GoogleKeepResume,
  GoogleCalendarResume,
  GoogleDocsResume,
  GoogleAnalyticsResume,
  GoogleMaterialYouResume
}