import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
import React, { LegacyRef } from 'react'



type ResumeProps = {
  theme: ThemeConfig,
  resumeData: ResumeData,
  font: FontConfig,
  pdfRef: LegacyRef<HTMLDivElement> | undefined
}


// Design 6: Google Docs
const GoogleResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
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

        </div>
      </div>
    </div>
  )
}





export {
 



  GoogleResume,


}