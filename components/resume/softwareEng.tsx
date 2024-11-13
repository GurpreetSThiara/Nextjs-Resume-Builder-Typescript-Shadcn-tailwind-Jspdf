// import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
// import React, { LegacyRef } from 'react'
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"

// type ResumeProps = {
//   theme: ThemeConfig,
//   resumeData: ResumeData,
//   font: FontConfig,
//   pdfRef: LegacyRef<HTMLDivElement> | undefined
// }

// // Design 1: Classic Tech
// const ClassicTechResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <header className="mb-6">
//         <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
//           {resumeData.name}
//         </h1>
//         <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap gap-4`}>
//           <span>{resumeData.email}</span>
//           <span>{resumeData.phone}</span>
//           <span>{resumeData.location}</span>
//           {resumeData.website && <span>{resumeData.website}</span>}
//           {resumeData.github && <span>{resumeData.github}</span>}
//         </div>
//       </header>

//       <Separator className="my-6" />

//       {resumeData.summary && (
//         <section className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2`}>
//             Professional Summary
//           </h2>
//           <p className={`${theme.fontSize.small} ${theme.colors.text}`}>
//             {resumeData.summary}
//           </p>
//         </section>
//       )}

//       {resumeData.skills && (
//         <section className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2`}>
//             Technical Skills
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {resumeData.skills.map((skill, index) => (
//               <Badge key={index} variant="secondary">
//                 {skill}
//               </Badge>
//             ))}
//           </div>
//         </section>
//       )}

//       {resumeData.sections.map((section) => (
//         <section key={section.id} className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4`}>
//             {section.title}
//           </h2>
          
//           {Object.entries(section.content).map(([key, bullets]) => (
//             <div key={key} className={`${theme.spacing.item} mb-4`}>
//               {key && (
//                 <div className="flex justify-between items-baseline mb-2">
//                   <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
//                     {key.split(' | ')[0]}
//                   </h3>
//                   <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
//                     {key.split(' | ')[1]}
//                   </span>
//                 </div>
//               )}
//               <ul className="list-disc ml-6 space-y-1">
//                 {bullets.map((bullet, index) => (
//                   <li 
//                     key={index} 
//                     className={`${theme.fontSize.small} ${theme.colors.text}`}
//                   >
//                     {bullet}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </section>
//       ))}
//     </div>
//   )
// }

// // Design 2: Modern Tech
// const ModernTechResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <header className="mb-8 text-center">
//         <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
//           {resumeData.name}
//         </h1>
//         <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap justify-center gap-4`}>
//           <span>{resumeData.email}</span>
//           <span>{resumeData.phone}</span>
//           <span>{resumeData.location}</span>
//           {resumeData.website && <span>{resumeData.website}</span>}
//           {resumeData.github && <span>{resumeData.github}</span>}
//         </div>
//       </header>

//       {resumeData.summary && (
//         <section className={`${theme.spacing.section} mb-8`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2 text-center`}>
//             Professional Summary
//           </h2>
//           <p className={`${theme.fontSize.small} ${theme.colors.text} text-center max-w-2xl mx-auto`}>
//             {resumeData.summary}
//           </p>
//         </section>
//       )}

//       {resumeData.skills && (
//         <section className={`${theme.spacing.section} mb-8`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4 text-center`}>
//             Technical Skills
//           </h2>
//           <div className="flex flex-wrap justify-center gap-2">
//             {resumeData.skills.map((skill, index) => (
//               <Badge key={index} variant="outline" className="text-sm px-3 py-1">
//                 {skill}
//               </Badge>
//             ))}
//           </div>
//         </section>
//       )}

//       {resumeData.sections.map((section) => (
//         <section key={section.id} className={`${theme.spacing.section} mb-8`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4 text-center`}>
//             {section.title}
//           </h2>
          
//           {Object.entries(section.content).map(([key, bullets]) => (
//             <div key={key} className={`${theme.spacing.item} mb-6`}>
//               {key && (
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
//                   <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
//                     {key.split(' | ')[0]}
//                   </h3>
//                   <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
//                     {key.split(' | ')[1]}
//                   </span>
//                 </div>
//               )}
//               <ul className="list-disc ml-6 space-y-1">
//                 {bullets.map((bullet, index) => (
//                   <li 
//                     key={index} 
//                     className={`${theme.fontSize.small} ${theme.colors.text}`}
//                   >
//                     {bullet}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </section>
//       ))}
//     </div>
//   )
// }

// // Design 3: Minimalist Tech
// const MinimalistTechResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <header className="mb-8">
//         <h1 className={`${theme.fontSize.name} font-light ${theme.colors.primary} mb-2`}>
//           {resumeData.name}
//         </h1>
//         <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap gap-4`}>
//           <span>{resumeData.email}</span>
//           <span>{resumeData.phone}</span>
//           <span>{resumeData.location}</span>
//           {resumeData.website && <span>{resumeData.website}</span>}
//           {resumeData.github && <span>{resumeData.github}</span>}
//         </div>
//       </header>

//       {resumeData.summary && (
//         <section className={`${theme.spacing.section} mb-8`}>
//           <p className={`${theme.fontSize.small} ${theme.colors.text}`}>
//             {resumeData.summary}
//           </p>
//         </section>
//       )}

//       {resumeData.skills && (
//         <section className={`${theme.spacing.section} mb-8`}>
//           <h2 className={`${theme.fontSize.section} font-normal ${theme.colors.primary} mb-4 uppercase tracking-widest`}>
//             Technical Skills
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {resumeData.skills.map((skill, index) => (
//               <span 
//                 key={index} 
//                 className={`${theme.fontSize.small} ${theme.colors.text}`}
//               >
//                 {skill}{index < resumeData.skills.length - 1 ? ',' : ''}
//               </span>
//             ))}
//           </div>
//         </section>
//       )}

//       {resumeData.sections.map((section) => (
//         <section key={section.id} className={`${theme.spacing.section} mb-8`}>
//           <h2 className={`${theme.fontSize.section} font-normal ${theme.colors.primary} mb-4 uppercase tracking-widest`}>
//             {section.title}
//           </h2>
          
//           {Object.entries(section.content).map(([key, bullets]) => (
//             <div key={key} className={`${theme.spacing.item} mb-4`}>
//               {key && (
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
//                   <h3 className={`${theme.fontSize.content} font-medium ${theme.colors.text}`}>
//                     {key.split(' | ')[0]}
//                   </h3>
//                   <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
//                     {key.split(' | ')[1]}
//                   </span>
//                 </div>
//               )}
//               <ul className="list-none ml-0 space-y-1">
//                 {bullets.map((bullet, index) => (
//                   <li 
//                     key={index} 
//                     className={`${theme.fontSize.small} ${theme.colors.text}`}
//                   >
//                     {bullet}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </section>
//       ))}
//     </div>
//   )
// }

// // Design 4: Technical Focus
// const TechnicalFocusResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <header className="mb-6">
//         <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
//           {resumeData.name}
//         </h1>
//         <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap gap-4`}>
//           <span>{resumeData.email}</span>
//           <span>{resumeData.phone}</span>
//           <span>{resumeData.location}</span>
//           {resumeData.website && <span>{resumeData.website}</span>}
//           {resumeData.github && <span>{resumeData.github}</span>}
//         </div>
//       </header>

//       {resumeData.summary && (
//         <section className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2`}>
//             Professional Summary
//           </h2>
//           <p className={`${theme.fontSize.small} ${theme.colors.text}`}>
//             {resumeData.summary}
//           </p>
//         </section>
//       )}

//       {resumeData.skills && (
//         <section className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2`}>
//             Technical Skills
//           </h2>
//           <div className="grid grid-cols-2 gap-4">
//             {resumeData.skills.map((skill, index) => (
//               <div key={index} className="flex items-center">
//                 <span className={`${theme.fontSize.small} ${theme.colors.text} mr-2 w-1/3`}>{skill}</span>
//                 <Progress value={Math.random() * 100} className="w-2/3" />
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {resumeData.sections.map((section) => (
//         <section key={section.id} className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4`}>
//             {section.title}
//           </h2>
          
//           {Object.entries(section.content).map(([key, bullets]) => (
//             <div key={key} className={`${theme.spacing.item} mb-4`}>
//               {key && (
//                 <div className="flex justify-between items-baseline mb-2">
//                   <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
//                     {key.split(' | ')[0]}
//                   </h3>
//                   <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
//                     {key.split(' | ')[1]}
//                   </span>
//                 </div>
//               )}
//               <ul className="list-disc ml-6 space-y-1">
//                 {bullets.map((bullet, index) => (
//                   <li 
//                     key={index} 
//                     className={`${theme.fontSize.small} ${theme.colors.text}`}
//                   >
//                     {bullet}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </section>
//       ))}
//     </div>
//   )
// }

// // Design 5: Clean Code
// const CleanCodeResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <header className="mb-6">
//         <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
//           {resumeData.name}
//         </h1>
//         <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap gap-4`}>
//           <span>{resumeData.email}</span>
//           <span>{resumeData.phone}</span>
//           <span>{resumeData.location}</span>
//           {resumeData.website && <span>{resumeData.website}</span>}
//           {resumeData.github && <span>{resumeData.github}</span>}
//         </div>
//       </header>

//       <Separator className="my-6" />

//       {resumeData.summary && (
//         <section className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2`}>
//             Professional Summary
//           </h2>
//           <p className={`${theme.fontSize.small} ${theme.colors.text}`}>
//             {resumeData.summary}
//           </p>
//         </section>
//       )}

//       {resumeData.skills && (
//         <section className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2`}>
//             Technical Skills
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {resumeData.skills.map((skill, index) => (
//               <Badge key={index} variant="outline">
//                 {skill}
//               </Badge>
//             ))}
//           </div>
//         </section>
//       )}

//       {resumeData.sections.map((section) => (
//         <section key={section.id} className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4`}>
//             {section.title}
//           </h2>
          
//           {Object.entries(section.content).map(([key, bullets]) => (
//             <div key={key} className={`${theme.spacing.item} mb-4`}>
//               {key && (
//                 <div className="flex justify-between items-baseline mb-2">
//                   <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
//                     {key.split(' | ')[0]}
//                   </h3>
//                   <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
//                     {key.split(' | ')[1]}
//                   </span>
//                 </div>
//               )}
//               <ul className="list-disc ml-6 space-y-1">
//                 {bullets.map((bullet, index) => (
//                   <li 
//                     key={index} 
//                     className={`${theme.fontSize.small} ${theme.colors.text}`}
//                   >
//                     {bullet}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </section>
//       ))}
//     </div>
//   )
// }

// // Design 6: Project Showcase
// const ProjectShowcaseResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <header className="mb-6">
//         <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
//           {resumeData.name}
//         </h1>
//         <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex flex-wrap gap-4`}>
//           <span>{resumeData.email}</span>
//           <span>{resumeData.phone}</span>
//           <span>{resumeData.location}</span>
//           {resumeData.website && <span>{resumeData.website}</span>}
//           {resumeData.github && <span>{resumeData.github}</span>}
//         </div>
//       </header>

//       {resumeData.summary && (
//         <section className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2`}>
//             Professional Summary
//           </h2>
//           <p className={`${theme.fontSize.small} ${theme.colors.text}`}>
//             {resumeData.summary}
//           </p>
//         </section>
//       )}

//       {resumeData.skills && (
//         <section className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2`}>
//             Technical Skills
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {resumeData.skills.map((skill, index) => (
//               <Badge key={index} variant="secondary">
//                 {skill}
//               </Badge>
//             ))}
//           </div>
//         </section>
//       )}

//       {resumeData.sections.map((section) => (
//         <section key={section.id} className={`${theme.spacing.section} mb-6`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4`}>
//             {section.title}
//           </h2>
          
//           {Object.entries(section.content).map(([key, bullets]) => (
//             <div key={key} className={`${theme.spacing.item} mb-4 border border-gray-200 rounded-lg p-4`}>
//               {key && (
//                 <div className="flex justify-between items-baseline mb-2">
//                   <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
//                     {key.split(' | ')[0]}
//                   </h3>
//                   <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
//                     {key.split(' | ')[1]}
//                   </span>
//                 </div>
//               )}
//               <ul className="list-disc ml-6 space-y-1">
//                 {bullets.map((bullet, index) => (
//                   <li 
//                     key={index} 
//                     className={`${theme.fontSize.small} ${theme.colors.text}`}
//                   >
//                     {bullet}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </section>
//       ))}
//     </div>
//   )
// }

// // Design 7: Tech Timeline
// const TechTimelineResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 max-w-4xl mx-auto ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <header className="mb-8 text-center">
//         <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary} mb-2`}>
//           {resumeData.name}
//         </h1>
//         <div className={`${theme.fontSize.small} ${theme.colors.secondary} flex justify-center space-x-4`}>
//           <span>{resumeData.email}</span>
//           <span>{resumeData.phone}</span>
//           <span>{resumeData.location}</span>
//           {resumeData.website && <span>{resumeData.website}</span>}
//           {resumeData.github && <span>{resumeData.github}</span>}
//         </div>
//       </header>

//       {resumeData.summary && (
//         <section className={`${theme.spacing.section} mb-8`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-2 text-center`}>
//             Professional Summary
//           </h2>
//           <p className={`${theme.fontSize.small} ${theme.colors.text} text-center`}>
//             {resumeData.summary}
//           </p>
//         </section>
//       )}

//       {resumeData.skills && (
//         <section className={`${theme.spacing.section} mb-8`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4 text-center`}>
//             Technical Skills
//           </h2>
//           <div className="flex flex-wrap justify-center gap-2">
//             {resumeData.skills.map((skill, index) => (
//               <Badge key={index} variant="outline">
//                 {skill}
//               </Badge>
//             ))}
//           </div>
//         </section>
//       )}

//       {resumeData.sections.map((section) => (
//         <section key={section.id} className={`${theme.spacing.section} mb-8`}>
//           <h2 className={`${theme.fontSize.section} font-bold ${theme.colors.primary} mb-4 text-center`}>
//             {section.title}
//           </h2>
          
//           <div className="relative border-l-2 border-gray-200 ml-4">
//             {Object.entries(section.content).map(([key, bullets], index) => (
//               <div key={key} className={`${theme.spacing.item} mb-6 ml-6`}>
//                 <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]" style={{top: '6px'}}></div>
//                 {key && (
//                   <div className="mb-2">
//                     <h3 className={`${theme.fontSize.content} font-semibold ${theme.colors.text}`}>
//                       {key.split(' | ')[0]}
//                     </h3>
//                     <span className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
//                       {key.split(' | ')[1]}
//                     </span>
//                   </div>
//                 )}
//                 <ul className="list-disc ml-6 space-y-1">
//                   {bullets.map((bullet, index) => (
//                     <li 
//                       key={index} 
//                       className={`${theme.fontSize.small} ${theme.colors.text}`}
//                     >
//                       {bullet}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   )
// }

// export {
//   ClassicTechResume,
//   ModernTechResume,
//   MinimalistTechResume,
//   TechnicalFocusResume,
//   CleanCodeResume,
//   ProjectShowcaseResume,
//   TechTimelineResume
// }