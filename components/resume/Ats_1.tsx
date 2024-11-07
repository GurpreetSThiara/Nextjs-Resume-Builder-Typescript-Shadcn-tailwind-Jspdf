import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
import html2canvas from 'html2canvas';
import React, { LegacyRef } from 'react'
import { Button } from '../ui/button';
//fonts[font] second param
//themes[theme]
const ATS1 = ({pdfRef,font,theme,resumeData}:{
  theme:ThemeConfig,
  resumeData:ResumeData,
  font: FontConfig,
  pdfRef:LegacyRef<HTMLDivElement> | undefined

}) => {

  const saveAsImage = async () => {
    if (pdfRef && pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,  // Increase scale for high-quality output
        useCORS: true  // Useful if images or fonts need CORS handling
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png', 1.0);  // 1.0 for max quality
      link.download = 'resume.png';
      link.click();
    }
  };
  return (
   <div className="">
     <div 
    ref={pdfRef} 
    className={`bg-white p-6 shadow-lg ${font.className}`}
    style={{ fontFamily: font.name }}
  >
    <div className="text-center mb-4">
      <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary}`}>
        {resumeData.name}
      </h1>
      <p className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
        {resumeData.email} | {resumeData.phone} | {resumeData.location}
      </p>
    </div>
    
    {resumeData.sections.map((section) => (
      <div key={section.id} className={theme.spacing.section}>
        <h2 className={`${theme.fontSize.section} font-bold uppercase ${theme.colors.primary} mb-2`}>
          {section.title}
        </h2>
        
        {Object.entries(section.content).map(([key, bullets]) => (
          <div key={key} className={theme.spacing.item}>
            {key && (
              <div className="flex justify-between items-baseline">
                <div className="flex-1 pr-4">
                  <h3 className={`${theme.fontSize.content} font-semibold`}>
                    {key.split(' | ')[0]}
                  </h3>
                </div>
                <div className="text-right font-semibold">
                  <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
                    {key.split(' | ')[1]}
                  </span>
                </div>
              </div>
            )}
            <ul className={key ? "list-disc ml-4 mt-1" : ""}>
              {bullets.map((bullet, index) => (
                <li 
                  key={index} 
                  className={`${theme.fontSize.small} ${theme.colors.text} mb-1`}
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ))}
  </div>

  <Button onClick={saveAsImage}>Click</Button>
   </div>
  )
}

export default ATS1