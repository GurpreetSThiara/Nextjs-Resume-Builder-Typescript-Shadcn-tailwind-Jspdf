import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
import React, { LegacyRef } from 'react'
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"



export type ResumeProps = {
  theme: ThemeConfig,
  resumeData: ResumeData,
  font: FontConfig,
  pdfRef: LegacyRef<HTMLDivElement> | undefined
}

// Design 1: Classic
const ClassicResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-6">
        <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap gap-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      <Separator className="my-6" />

      {resumeData.sections.map((section) => (
        <section key={section.id} className={`${theme.spacing.section} mb-6`}>
          <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4`}>
            {section.title}
          </h2>
          
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className={`${theme.spacing.item} mb-4`}>
              {key && (
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
                    {key.split(' | ')[0]}
                  </h3>
                  <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                    {key.split(' | ')[1]}
                  </span>
                </div>
              )}
              <ul className={key ? "list-disc ml-6" : "space-y-1"}>
                {bullets.map((bullet, index) => (
                  <li 
                    key={index} 
                    className={`${theme.fontSize.small} ${theme.colors.text}`}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

    </div>
  )
}

// Design 2: Modern Card
const ModernCardResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <div 
            ref={pdfRef} 
            className={`p-6 ${font.className}`}
            style={{ fontFamily: font.name }}
          >
            <header className="text-center mb-6">
              <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
                {resumeData.name}
              </h1>
              <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex justify-center space-x-4`}>
                <span>{resumeData.email}</span>
                <span>{resumeData.phone}</span>
                <span>{resumeData.location}</span>
              </div>
            </header>
            
            {resumeData.sections.map((section) => (
              <section key={section.id} className={`${theme.spacing.section} mb-6`}>
                <h2 className={`${theme.fontSize.section} font-bold uppercase ${theme.colors.primary} mb-4`}>
                  {section.title}
                </h2>
                <Separator className="mb-4" />
                
                {Object.entries(section.content).map(([key, bullets]) => (
                  <div key={key} className={`${theme.spacing.item} mb-4`}>
                    {key && (
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
                          {key.split(' | ')[0]}
                        </h3>
                        <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                          {key.split(' | ')[1]}
                        </span>
                      </div>
                    )}
                    <ul className={key ? "list-disc ml-6" : "space-y-1"}>
                      {bullets.map((bullet, index) => (
                        <li 
                          key={index} 
                          className={`${theme.fontSize.small} ${theme.colors.text}`}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
            
        
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Design 3: Minimalist
const MinimalistResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-8">
        <h1 className={`${theme.fontSize.name} font-light ${theme.colors.primary} mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap gap-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      {resumeData.sections.map((section) => (
        <section key={section.id} className={`${theme.spacing.section} mb-8`}>
          <h2 className={`${theme.fontSize.section} font-normal ${theme.colors.primary} mb-4 uppercase tracking-widest`}>
            {section.title}
          </h2>
          
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className={`${theme.spacing.item} mb-4`}>
              {key && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className={`${theme.fontSize.content} font-medium ${theme.colors.text}`}>
                    {key.split(' | ')[0]}
                  </h3>
                  <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                    {key.split(' | ')[1]}
                  </span>
                </div>
              )}
              <ul className={key ? "list-none ml-0" : "space-y-1"}>
                {bullets.map((bullet, index) => (
                  <li 
                    key={index} 
                    className={`${theme.fontSize.small} ${theme.colors.text}`}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

    </div>
  )
}

// Design 4: Two Column
const TwoColumnResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-5xl mx-auto ${font.className} flex flex-col md:flex-row gap-8`}
      style={{ fontFamily: font.name }}
    >
      <div className="md:w-1/3">
        <header className="mb-6">
          <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} ${theme.colors.secondary} space-y-1`}>
            <div>{resumeData.email}</div>
            <div>{resumeData.phone}</div>
            <div>{resumeData.location}</div>
          </div>
        </header>

  
      </div>

      <div className="md:w-2/3">
        {resumeData.sections.map((section) => (
          <section key={section.id} className={`${theme.spacing.section} mb-6`}>
            <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4`}>
              {section.title}
            </h2>
            
            {Object.entries(section.content).map(([key, bullets]) => (
              <div key={key} className={`${theme.spacing.item} mb-4`}>
                {key && (
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
                      {key.split(' | ')[0]}
                    </h3>
                    <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                      {key.split(' | ')[1]}
                    </span>
                  </div>
                )}
                <ul className={key ? "list-disc ml-6" : "space-y-1"}>
                  {bullets.map((bullet, index) => (
                    <li 
                      key={index} 
                      className={`${theme.fontSize.small} ${theme.colors.text}`}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}

// Design 5: Timeline
const TimelineResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-8 text-center">
        <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex justify-center space-x-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      {resumeData.sections.map((section) => (
        <section key={section.id} className={`${theme.spacing.section} mb-8`}>
          <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4 text-center`}>
            {section.title}
          </h2>
          
          <div className="relative border-l-2 border-gray-200 ml-4">
            {Object.entries(section.content).map(([key, bullets]) => (
              <div key={key} className={`${theme.spacing.item} mb-6 ml-6`}>
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]" style={{top: '6px'}}></div>
                {key && (
                  <div className="mb-2">
                    <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
                      {key.split(' | ')[0]}
                    </h3>
                    <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                      {key.split(' | ')[1]}
                    </span>
                  </div>
                )}
                <ul className={key ? "list-disc ml-6" : "space-y-1"}>
                  {bullets.map((bullet, index) => (
                    <li 
                      key={index} 
                      className={`${theme.fontSize.small} ${theme.colors.text}`}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

    </div>
  )
}

// Design 6: Compact
const CompactResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-6 max-w-3xl mx-auto ${font.className} text-sm`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-4">
        <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-1`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap gap-2`}>
          <span>{resumeData.email}</span>
          <span>|</span>
          <span>{resumeData.phone}</span>
          <span>|</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      <Separator className="my-4" />

      {resumeData.sections.map((section) => (
        <section key={section.id} className={`${theme.spacing.section} mb-4`}>
          <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2 uppercase`}>
            {section.title}
          </h2>
          
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className={`${theme.spacing.item} mb-3`}>
              {key && (
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
                    {key.split(' | ')[0]}
                  </h3>
                  <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                    {key.split(' | ')[1]}
                  </span>
                </div>
              )}
              <ul className={key ? "list-disc ml-4 space-y-0.5" : "space-y-0.5"}>
                {bullets.map((bullet, index) => (
                  <li 
                    key={index} 
                    className={`${theme.fontSize.small} ${theme.colors.text}`}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

    </div>
  )
}

// Design 7: Bold Header
const BoldHeaderResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  if(!pdfRef && !font && !theme && !resumeData) return null
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className={`bg-primary text-white p-8 mb-8`}>
        <h1 className={`${theme.fontSize.name} font-bold mb-2 text-center`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} flex justify-center space-x-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1 gap-x-8 pb-6 px-8">
            {Object.keys(resumeData.custom).map((i, index) => {
              const item = resumeData.custom[i];
              return (
                <div className={`flex gap-2 text-xs justify-between ${item.hidden && "hidden"}`} key={`${index} ${item.id}`}>
                  <span className="font-semibold">{item.title}:</span>
                  <span>{item.content}</span>
                </div>
              );
            })}
          </div>

      <div className="max-w-4xl mx-auto px-8">
        {resumeData.sections.map((section) => (
          <section key={section.id} className={`${theme.spacing.section} mb-8`}>
            <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4 uppercase border-b-2 border-primary pb-2`}>
              {section.title}
            </h2>
            
            {Object.entries(section.content).map(([key, bullets]) => (
              <div key={key} className={`${theme.spacing.item} mb-4`}>
                {key && (
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
                      {key.split(' | ')[0]}
                    </h3>
                    <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                      {key.split(' | ')[1]}
                    </span>
                  </div>
                )}
                <ul className={key ? "list-disc ml-6" : "space-y-1"}>
                  {bullets.map((bullet, index) => (
                    <li 
                      key={index} 
                      className={`${theme.fontSize.small} ${theme.colors.text}`}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

   
      </div>
    </div>
  )
}

// Design 8: Sidebar
const SidebarResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white flex flex-col md:flex-row ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <aside className="bg-gray-100 p-8 md:w-1/3">
        <header className="mb-8">
          <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} ${theme.colors.secondary} space-y-1`}>
            <div>{resumeData.email}</div>
            <div>{resumeData.phone}</div>
            <div>{resumeData.location}</div>
          </div>
        </header>

    
      </aside>

      <main className="p-8 md:w-2/3">
        {resumeData.sections.map((section) => (
          <section key={section.id} className={`${theme.spacing.section} mb-8`}>
            <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4 uppercase`}>
              {section.title}
            </h2>
            
            {Object.entries(section.content).map(([key, bullets]) => (
              <div key={key} className={`${theme.spacing.item} mb-4`}>
                {key && (
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
                      {key.split(' | ')[0]}
                    </h3>
                    <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                      {key.split(' | ')[1]}
                    </span>
                  </div>
                )}
                <ul className={key ? "list-disc ml-6" : "space-y-1"}>
                  {bullets.map((bullet, index) => (
                    <li 
                      key={index} 
                      className={`${theme.fontSize.small} ${theme.colors.text}`}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  )
}

// Design 9: Modern Grid
const ModernGridResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-5xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-8 text-center">
        <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex justify-center space-x-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resumeData.sections.map((section) => (
          <section key={section.id} className={`${theme.spacing.section}`}>
            <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4 uppercase`}>
              {section.title}
            </h2>
            
            {Object.entries(section.content).map(([key, bullets]) => (
              <Card key={key} className={`${theme.spacing.item} mb-4`}>
                <CardContent className="p-4">
                  {key && (
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
                        {key.split(' | ')[0]}
                      </h3>
                      <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                        {key.split(' | ')[1]}
                      </span>
                    </div>
                  )}
                  <ul className={key ? "list-disc ml-6" : "space-y-1"}>
                    {bullets.map((bullet, index) => (
                      <li 
                        key={index} 
                        className={`${theme.fontSize.small} ${theme.colors.text}`}
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </section>
        ))}
      </div>

    </div>
  )
}

// Design 10: Elegant
const ElegantResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-12 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-12 text-center">
        <h1 className={`${theme.fontSize.name} font-light ${theme.colors.primary} mb-4`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex justify-center space-x-6`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      <Separator className="my-8" />

      {resumeData.sections.map((section) => (
        <section key={section.id} className={`${theme.spacing.section} mb-12`}>
          <h2 className={`${theme.fontSize.section} font-light ${theme.colors.primary} mb-6 uppercase tracking-widest text-center`}>
            {section.title}
          </h2>
          
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className={`${theme.spacing.item} mb-6`}>
              {key && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
                  <h3 className={`${theme.fontSize.content} font-medium ${theme.colors.text}`}>
                    {key.split(' | ')[0]}
                  </h3>
                  <span className={`${theme.fontSize.small} ${theme.colors.secondary} italic`}>
                    {key.split(' | ')[1]}
                  </span>
                </div>
              )}
              <ul className={key ? "list-none space-y-2" : "space-y-2"}>
                {bullets.map((bullet, index) => (
                  <li 
                    key={index} 
                    className={`${theme.fontSize.small} ${theme.colors.text}`}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

    

      <Separator className="my-8" />

      <footer className="text-center text-sm text-gray-500">
        References available upon request
      </footer>
    </div>
  )
}

export {
  ClassicResume,
  ModernCardResume,
  MinimalistResume,
  TwoColumnResume,
  TimelineResume,
  CompactResume,
  BoldHeaderResume,
  SidebarResume,
  ModernGridResume,
  ElegantResume
}