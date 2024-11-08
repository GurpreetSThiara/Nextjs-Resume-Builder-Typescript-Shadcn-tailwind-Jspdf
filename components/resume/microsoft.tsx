import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
import React, { LegacyRef } from 'react'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type ResumeProps = {
  theme: ThemeConfig,
  resumeData: ResumeData,
  font: FontConfig,
  pdfRef: LegacyRef<HTMLDivElement> | undefined
}

// Design 1: Classic Professional
const ClassicProfessionalResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-6">
        <h1 className={`${theme.fontSize.name} font-bold text-gray-800 mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} text-gray-600 flex flex-wrap gap-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      <Separator className="my-6" />

      {resumeData.summary && (
        <section className="mb-6">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Professional Summary</h2>
          <p className={`${theme.fontSize.small} text-gray-600`}>{resumeData.summary}</p>
        </section>
      )}

      {resumeData.sections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-4`}>{section.title}</h2>
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className="mb-4">
              {key && (
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                  <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                </div>
              )}
              <ul className="list-disc ml-5 space-y-1">
                {bullets.map((bullet, index) => (
                  <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {resumeData.skills && (
        <section className="mb-6">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-gray-700">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Design 2: Modern Minimalist
const ModernMinimalistResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-8 text-center">
        <h1 className={`${theme.fontSize.name} font-bold text-gray-800 mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} text-gray-600 flex justify-center flex-wrap gap-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      {resumeData.summary && (
        <section className="mb-8">
          <p className={`${theme.fontSize.small} text-gray-600 text-center max-w-2xl mx-auto`}>{resumeData.summary}</p>
        </section>
      )}

      {resumeData.sections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-4 text-center`}>{section.title}</h2>
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className="mb-6">
              {key && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                  <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                </div>
              )}
              <ul className="list-disc ml-5 space-y-1">
                {bullets.map((bullet, index) => (
                  <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {resumeData.skills && (
        <section className="mb-8">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-4 text-center`}>Skills</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-gray-700">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Design 3: Bold Header
const BoldHeaderResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-8 bg-gray-800 text-white p-6">
        <h1 className={`${theme.fontSize.name} font-bold mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} flex flex-wrap gap-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      {resumeData.summary && (
        <section className="mb-8">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Professional Summary</h2>
          <p className={`${theme.fontSize.small} text-gray-600`}>{resumeData.summary}</p>
        </section>
      )}

      {resumeData.sections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2`}>{section.title}</h2>
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className="mb-4">
              {key && (
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                  <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                </div>
              )}
              <ul className="list-disc ml-5 space-y-1">
                {bullets.map((bullet, index) => (
                  <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {resumeData.skills && (
        <section className="mb-8">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-gray-700">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Design 4: Clean and Compact
const CleanCompactResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-6 max-w-3xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-4">
        <h1 className={`${theme.fontSize.name} font-bold text-gray-800 mb-1`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} text-gray-600 flex flex-wrap gap-2`}>
          <span>{resumeData.email}</span> | 
          <span>{resumeData.phone}</span> | 
          <span>{resumeData.location}</span>
        </div>
      </header>

      <Separator className="my-4" />

      {resumeData.summary && (
        <section className="mb-4">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-1`}>Summary</h2>
          <p className={`${theme.fontSize.small} text-gray-600`}>{resumeData.summary}</p>
        </section>
      )}

      {resumeData.sections.map((section) => (
        <section key={section.id} className="mb-4">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>{section.title}</h2>
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className="mb-3">
              {key && (
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                  <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                </div>
              )}
              <ul className="list-disc ml-5 space-y-0.5">
                {bullets.map((bullet, index) => (
                  <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {resumeData.skills && (
        <section className="mb-4">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-1`}>Skills</h2>
          <div className="flex flex-wrap gap-1">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs text-gray-700">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Design 5: Professional Serif
const ProfessionalSerifResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-6 text-center">
        <h1 className={`${theme.fontSize.name} font-bold text-gray-800 mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} text-gray-600 flex justify-center flex-wrap gap-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      <Separator className="my-6" />

      {resumeData.summary && (
        <section className="mb-6">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Professional Summary</h2>
          <p className={`${theme.fontSize.small} text-gray-600`}>{resumeData.summary}</p>
        </section>
      )}

      {resumeData.sections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2`}>{section.title}</h2>
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className="mb-4">
              {key && (
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                  <span className={`${theme.fontSize.small} text-gray-600 italic`}>{key.split(' | ')[1]}</span>
                </div>
              )}
              <ul className="list-disc ml-5 space-y-1">
                {bullets.map((bullet, index) => (
                  <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {resumeData.skills && (
        <section className="mb-6">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className={`${theme.fontSize.small} text-gray-600 border border-gray-300 rounded px-2 py-1`}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Design 6: Modern Tech
const ModernTechResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-100 p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <header className="mb-6">
          <h1 className={`${theme.fontSize.name} font-bold text-gray-800 mb-2`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} text-gray-600 flex flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        {resumeData.summary && (
          <section className="mb-6">
            <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Summary</h2>
            <p className={`${theme.fontSize.small} text-gray-600`}>{resumeData.summary}</p>
          </section>
        )}

        {resumeData.sections.map((section) => (
          <section key={section.id} className="mb-6">
            <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-4`}>{section.title}</h2>
            {Object.entries(section.content).map(([key, bullets]) => (
              <div key={key} className="mb-4 bg-gray-50 rounded-md p-4">
                {key && (
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                    <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                  </div>
                )}
                <ul className="list-disc ml-5 space-y-1">
                  {bullets.map((bullet, index) => (
                    <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

        {resumeData.skills && (
          <section className="mb-6">
            <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// Design 7: Executive Style
const ExecutiveStyleResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className={`${theme.fontSize.name} font-bold text-gray-800 mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} text-gray-600 flex flex-wrap gap-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      {resumeData.summary && (
        <section className="mb-8">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2`}>Executive Summary</h2>
          <p className={`${theme.fontSize.small} text-gray-600`}>{resumeData.summary}</p>
        </section>
      )}

      {resumeData.sections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-4 uppercase tracking-wide`}>{section.title}</h2>
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className="mb-4">
              {key && (
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
                  <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
                </div>
              )}
              <ul className="list-disc ml-5 space-y-1">
                {bullets.map((bullet, index) => (
                  <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {resumeData.skills && (
        <section className="mb-8">
          <h2 className={`${theme.fontSize.section} font-semibold text-gray-700 mb-2 uppercase tracking-wide`}>Core Competencies</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-gray-700 border-gray-400">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Design 8: ATS Optimized
const ATSOptimizedResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <header className="mb-6">
        <h1 className={`${theme.fontSize.name} font-bold text-black mb-2`}>
          {resumeData.name}
        </h1>
        <div className={`${theme.fontSize.small} text-gray-700 flex flex-wrap gap-4`}>
          <span>{resumeData.email}</span>
          <span>{resumeData.phone}</span>
          <span>{resumeData.location}</span>
        </div>
      </header>

      {resumeData.summary && (
        <section className="mb-6">
          <h2 className={`${theme.fontSize.section} font-bold text-black mb-2`}>Professional Summary</h2>
          <p className={`${theme.fontSize.small} text-gray-700`}>{resumeData.summary}</p>
        </section>
      )}

      {resumeData.sections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className={`${theme.fontSize.section} font-bold text-black mb-4`}>{section.title}</h2>
          {Object.entries(section.content).map(([key, bullets]) => (
            <div key={key} className="mb-4">
              {key && (
                <div className="mb-2">
                  <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
                  <span className={`${theme.fontSize.small} text-gray-700`}>{key.split(' | ')[1]}</span>
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
        <section className="mb-6">
          <h2 className={`${theme.fontSize.section} font-bold text-black mb-2`}>Skills</h2>
          <p className={`${theme.fontSize.small} text-gray-700`}>
            {resumeData.skills.join(', ')}
          </p>
        </section>
      )}
    </div>
  )
}

export {
  ClassicProfessionalResume,
  ModernMinimalistResume,
  BoldHeaderResume,
  CleanCompactResume,
  ProfessionalSerifResume,
  ModernTechResume,
  ExecutiveStyleResume,
  ATSOptimizedResume
}