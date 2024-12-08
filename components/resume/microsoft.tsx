// import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
// import React, { LegacyRef } from 'react'


// type ResumeProps = {
//   theme: ThemeConfig,
//   resumeData: ResumeData,
//   font: FontConfig,
//   pdfRef: LegacyRef<HTMLDivElement> | undefined
// }

// // Design 1: Classic Professional


// const ATSOptimizedResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//     return (
//       <div
//         ref={pdfRef}
//         className={`bg-white p-6 max-w-[8.5in] mx-auto ${font.className}`}
//         style={{ fontFamily: font.name }}
//       >
//         <header className="border-b-2 border-gray-300 pb-4 mb-6">
//           <h1 className={`${theme.fontSize.name} font-bold text-black text-center mb-2`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-700 flex flex-col items-center`}>
//             <span>{resumeData.email} | {resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>
  
//         {resumeData.summary && (
//           <section className="mb-6">
//             <h2 className={`${theme.fontSize.section} font-bold text-black mb-2 uppercase border-b border-gray-300`}>
//               Professional Summary
//             </h2>
//             <p className={`${theme.fontSize.small} text-gray-700 mt-2`}>{resumeData.summary}</p>
//           </section>
//         )}
  
//         {resumeData.sections.map((section: Section) => (
//           <section key={section.id} className="mb-6">
//             <h2 className={`${theme.fontSize.section} font-bold text-black mb-3 uppercase border-b border-gray-300`}>
//               {section.title}
//             </h2>
//             {Object.entries(section.content).map(([key, bullets]) => (
//               <div key={key} className="mb-4">
//                 {key && (
//                   <div className="mb-2">
//                     <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                     <p className={`${theme.fontSize.small} text-gray-700`}>{key.split(' | ')[1]}</p>
//                   </div>
//                 )}
//                 <ul className="list-disc ml-6 space-y-1">
//                   {bullets.map((bullet, index) => (
//                     <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </section>
//         ))}
//       </div>
//     )
//   }
// export {


//   ATSOptimizedResume
// }