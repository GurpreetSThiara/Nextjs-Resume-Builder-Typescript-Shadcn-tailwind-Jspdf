import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
import React, { LegacyRef } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type ResumeProps = {
  theme: ThemeConfig,
  resumeData: ResumeData,
  font: FontConfig,
  pdfRef: LegacyRef<HTMLDivElement> | undefined
}

// Design 1: Vibrant Blocks


// Design 2: Pastel Circles
const PastelCirclesResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="bg-white  shadow-lg overflow-hidden max-w-4xl mx-auto">
        <header className="bg-indigo-600 text-white p-8 text-center">
          <h1 className={`${theme.fontSize.name} font-bold mb-2`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} flex justify-center flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {resumeData.summary && (
            <section className="text-center">
              <p className={`${theme.fontSize.small} text-gray-600 max-w-2xl mx-auto`}>
                {resumeData.summary}
              </p>
            </section>
          )}

          {resumeData.skills && (
            <section>
              <h2 className={`${theme.fontSize.section} font-bold text-indigo-600 mb-4 text-center`}>
                Skills
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-indigo-100 text-indigo-800 rounded-full px-4 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {resumeData.sections.map((section) => (
            <section key={section.id}>
              <h2 className={`${theme.fontSize.section} font-bold text-indigo-600 mb-4 text-center`}>
                {section.title}
              </h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <Card key={key} className="mb-4 rounded-3xl overflow-hidden">
                  <CardContent className="p-6">
                    {key && (
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className={`${theme.fontSize.content} font-semibold text-indigo-700`}>
                          {key.split(' | ')[0]}
                        </h3>
                        <span className={`${theme.fontSize.small} text-indigo-500`}>
                          {key.split(' | ')[1]}
                        </span>
                      </div>
                    )}
                    <ul className="list-disc ml-6 space-y-1">
                      {bullets.map((bullet, index) => (
                        <li 
                          key={index} 
                          className={`${theme.fontSize.small} text-gray-600`}
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
    </div>
  )
}

// Design 3: Neon Glow
const NeonGlowResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-900 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className={`${theme.fontSize.name} font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} flex justify-center flex-wrap gap-4 text-gray-400`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        {resumeData.summary && (
          <section className="text-center">
            <p className={`${theme.fontSize.small} text-gray-300 max-w-2xl mx-auto`}>
              {resumeData.summary}
            </p>
          </section>
        )}

        {resumeData.skills && (
          <section>
            <h2 className={`${theme.fontSize.section} font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500`}>
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {resumeData.skills.map((skill, index) => (
                <Badge key={index} className="bg-gray-800 text-green-400 border border-green-400 shadow-lg shadow-green-400/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {resumeData.sections.map((section) => (
          <section key={section.id}>
            <h2 className={`${theme.fontSize.section} font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-500`}>
              {section.title}
            </h2>
            {Object.entries(section.content).map(([key, bullets]) => (
              <Card key={key} className="mb-4 bg-gray-800 border border-purple-500 shadow-lg shadow-purple-500/50">
                <CardContent className="p-6">
                  {key && (
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className={`${theme.fontSize.content} font-semibold text-purple-400`}>
                        {key.split(' | ')[0]}
                      </h3>
                      <span className={`${theme.fontSize.small} text-purple-300`}>
                        {key.split(' | ')[1]}
                      </span>
                    </div>
                  )}
                  <ul className="list-disc ml-6 space-y-1">
                    {bullets.map((bullet, index) => (
                      <li 
                        key={index} 
                        className={`${theme.fontSize.small} text-gray-300`}
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

// Design 4: Watercolor Splash
const WatercolorSplashResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gradient-to-br from-yellow-100 via-red-100 to-pink-100 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 text-white p-8">
          <h1 className={`${theme.fontSize.name} font-bold mb-2 text-center`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} flex justify-center flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {resumeData.summary && (
            <section>
              <p className={`${theme.fontSize.small} text-gray-600 italic border-l-4 border-yellow-400 pl-4`}>
                {resumeData.summary}
              </p>
            </section>
          )}

          {resumeData.skills && (
            <section>
              <h2 className={`${theme.fontSize.section} font-bold text-pink-600 mb-4`}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-gradient-to-r from-yellow-200 to-pink-200 text-gray-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {resumeData.sections.map((section) => (
            <section key={section.id}>
              <h2 className={`${theme.fontSize.section} font-bold text-red-600 mb-4`}>
                {section.title}
              </h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <Card key={key} className="mb-4 bg-gradient-to-br from-yellow-50 to-pink-50">
                  <CardContent className="p-6">
                    {key && (
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>
                          {key.split(' | ')[0]}
                        </h3>
                        <span className={`${theme.fontSize.small} text-gray-600`}>
                          {key.split(' | ')[1]}
                        </span>
                      </div>
                    )}
                    <ul className="list-disc ml-6 space-y-1">
                      {bullets.map((bullet, index) => (
                        <li 
                          key={index} 
                          className={`${theme.fontSize.small} text-gray-600`}
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
    </div>
  )
}

// Design 5: Geometric Patterns
const GeometricPatternsResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-white transform rotate-45 translate-y-1/2"></div>
            <div className="absolute inset-0 bg-white transform -rotate-45 -translate-y-1/2"></div>
          </div>
          <div className="relative z-10">
            <h1 className={`${theme.fontSize.name} font-bold mb-2 text-center`}>
              {resumeData.name}
            </h1>
            <div className={`${theme.fontSize.small} flex justify-center flex-wrap gap-4`}>
              <span>{resumeData.email}</span>
              <span>{resumeData.phone}</span>
              <span>{resumeData.location}</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {resumeData.summary && (
            <section>
              <p className={`${theme.fontSize.small} text-gray-600`}>
                {resumeData.summary}
              </p>
            </section>
          )}

          {resumeData.skills && (
            <section>
              <h2 className={`${theme.fontSize.section} font-bold text-blue-600 mb-4`}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-800 border border-purple-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {resumeData.sections.map((section) => (
            <section key={section.id}>
              <h2 className={`${theme.fontSize.section} font-bold text-blue-600 mb-4`}>
                {section.title}
              </h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <Card key={key} className="mb-4 border-l-4 border-purple-500">
                  <CardContent className="p-6">
                    {key && (
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>
                          {key.split(' | ')[0]}
                        </h3>
                        <span className={`${theme.fontSize.small} text-gray-600`}>
                          {key.split(' | ')[1]}
                        </span>
                      </div>
                    )}
                    <ul className="list-disc ml-6 space-y-1">
                      {bullets.map((bullet, index) => (
                        <li 
                          key={index} 
                          className={`${theme.fontSize.small} text-gray-600`}
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
    </div>
  )
}

// Design 6: Minimalist Accent
const MinimalistAccentResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-white p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b-4 border-emerald-500 pb-4">
          <h1 className={`${theme.fontSize.name} font-bold mb-2 text-gray-900`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} text-gray-600 flex flex-wrap gap-4`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <div className="space-y-8">
          {resumeData.summary && (
            <section>
              <p className={`${theme.fontSize.small} text-gray-700`}>
                {resumeData.summary}
              </p>
            </section>
          )}

          {resumeData.skills && (
            <section>
              <h2 className={`${theme.fontSize.section} font-bold text-emerald-600 mb-4`}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {resumeData.sections.map((section) => (
            <section key={section.id}>
              <h2 className={`${theme.fontSize.section} font-bold text-emerald-600 mb-4`}>
                {section.title}
              </h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <div key={key} className="mb-4">
                  {key && (
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>
                        {key.split(' | ')[0]}
                      </h3>
                      <span className={`${theme.fontSize.small} text-gray-600`}>
                        {key.split(' | ')[1]}
                      </span>
                    </div>
                  )}
                  <ul className="list-disc ml-6 space-y-1">
                    {bullets.map((bullet, index) => (
                      <li 
                        key={index} 
                        className={`${theme.fontSize.small} text-gray-700`}
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
    </div>
  )
}

// Design 7: Bold Typography
const BoldTypographyResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
  return (
    <div 
      ref={pdfRef} 
      className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
      style={{ fontFamily: font.name }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-xl">
        <header className="bg-gray-900 text-white p-8">
          <h1 className={`${theme.fontSize.name} font-black mb-2 text-5xl tracking-tight`}>
            {resumeData.name}
          </h1>
          <div className={`${theme.fontSize.small} flex flex-wrap gap-4 text-gray-400`}>
            <span>{resumeData.email}</span>
            <span>{resumeData.phone}</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {resumeData.summary && (
            <section>
              <p className={`${theme.fontSize.small} text-gray-600 font-medium`}>
                {resumeData.summary}
              </p>
            </section>
          )}

          {resumeData.skills && (
            <section>
              <h2 className={`${theme.fontSize.section} font-black text-gray-800 mb-4 text-2xl uppercase`}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-gray-200 text-gray-800 text-sm font-bold px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {resumeData.sections.map((section) => (
            <section key={section.id}>
              <h2 className={`${theme.fontSize.section} font-black text-gray-800 mb-4 text-2xl uppercase`}>
                {section.title}
              </h2>
              {Object.entries(section.content).map(([key, bullets]) => (
                <div key={key} className="mb-6">
                  {key && (
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className={`${theme.fontSize.content} font-bold text-gray-700 text-xl`}>
                        {key.split(' | ')[0]}
                      </h3>
                      <span className={`${theme.fontSize.small} text-gray-600 font-medium`}>
                        {key.split(' | ')[1]}
                      </span>
                    </div>
                  )}
                  <ul className="list-disc ml-6 space-y-2">
                    {bullets.map((bullet, index) => (
                      <li 
                        key={index} 
                        className={`${theme.fontSize.small} text-gray-600`}
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
    </div>
  )
}

export {

  PastelCirclesResume,
  NeonGlowResume,
  WatercolorSplashResume,
  GeometricPatternsResume,//
  MinimalistAccentResume,//
  BoldTypographyResume//
}