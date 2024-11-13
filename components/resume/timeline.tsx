// import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
// import React, { LegacyRef } from 'react'
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"

// type ResumeProps = {
//   theme: ThemeConfig,
//   resumeData: ResumeData,
//   font: FontConfig,
//   pdfRef: LegacyRef<HTMLDivElement> | undefined
// }

// // Design 1: Classic Vertical Timeline
// const ClassicVerticalTimeline: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-4xl mx-auto">
//         <header className="text-center mb-12">
//           <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-gray-800`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex justify-center space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         <div className="relative border-l-2 border-gray-200 ml-3">
//           {resumeData.sections.map((section) => (
//             <section key={section.id} className="mb-12">
//               <h2 className={`${theme.fontSize.section} font-bold text-gray-800 mb-4 relative`}>
//                 <span className="bg-white pr-2 relative z-10">{section.title}</span>
//                 <div className="absolute left-[-35px] top-3 w-6 h-6 bg-white border-4 border-gray-400 rounded-full"></div>
//               </h2>
//               {Object.entries(section.content).map(([key, bullets]) => (
//                 <div key={key} className="ml-8 mb-6 relative">
//                   <div className="absolute left-[-31px] top-2 w-4 h-4 bg-gray-200 rounded-full"></div>
//                   {key && (
//                     <div className="flex justify-between items-baseline mb-2">
//                       <h3 className={`${theme.fontSize.content} font-semibold text-gray-700`}>{key.split(' | ')[0]}</h3>
//                       <span className={`${theme.fontSize.small} text-gray-500`}>{key.split(' | ')[1]}</span>
//                     </div>
//                   )}
//                   <ul className="list-disc ml-5 space-y-1">
//                     {bullets.map((bullet, index) => (
//                       <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </section>
//           ))}
//         </div>

//         {resumeData.skills && (
//           <section className="mt-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-gray-800 mb-4`}>Skills</h2>
//             <div className="flex flex-wrap gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <Badge key={index} variant="secondary" className="bg-gray-200 text-gray-700">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   )
// }

// // Design 2: Modern Horizontal Timeline
// const ModernHorizontalTimeline: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-5xl mx-auto bg-white shadow-xl p-8 rounded-lg">
//         <header className="text-center mb-12">
//           <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-indigo-600`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex justify-center space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         {resumeData.sections.map((section) => (
//           <section key={section.id} className="mb-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-indigo-600 mb-6`}>{section.title}</h2>
//             <div className="relative">
//               <div className="absolute h-1 bg-indigo-200 top-5 left-0 right-0"></div>
//               <div className="flex justify-between items-start">
//                 {Object.entries(section.content).map(([key, bullets], index) => (
//                   <div key={key} className="relative flex-1 text-center">
//                     <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full"></div>
//                     <div className="pt-8">
//                       {key && (
//                         <div className="mb-2">
//                           <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                           <span className={`${theme.fontSize.small} text-gray-500`}>{key.split(' | ')[1]}</span>
//                         </div>
//                       )}
//                       <ul className="text-left ml-4 space-y-1">
//                         {bullets.map((bullet, idx) => (
//                           <li key={idx} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         ))}

//         {resumeData.skills && (
//           <section className="mt-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-indigo-600 mb-4`}>Skills</h2>
//             <div className="flex flex-wrap gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <Badge key={index} className="bg-indigo-100 text-indigo-800">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   )
// }

// // Design 3: Minimalist Dot Timeline
// const MinimalistDotTimeline: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-3xl mx-auto">
//         <header className="mb-12">
//           <h1 className={`${theme.fontSize.name} font-light text-4xl mb-2 text-gray-900`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         {resumeData.sections.map((section) => (
//           <section key={section.id} className="mb-12">
//             <h2 className={`${theme.fontSize.section} font-light text-gray-800 mb-6 uppercase tracking-wide`}>{section.title}</h2>
//             {Object.entries(section.content).map(([key, bullets]) => (
//               <div key={key} className="flex mb-6">
//                 <div className="mr-4 mt-1">
//                   <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//                 </div>
//                 <div>
//                   {key && (
//                     <div className="mb-2">
//                       <h3 className={`${theme.fontSize.content} font-medium text-gray-800`}>{key.split(' | ')[0]}</h3>
//                       <span className={`${theme.fontSize.small} text-gray-500`}>{key.split(' | ')[1]}</span>
//                     </div>
//                   )}
//                   <ul className="space-y-1">
//                     {bullets.map((bullet, index) => (
//                       <li key={index} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </section>
//         ))}

//         {resumeData.skills && (
//           <section className="mt-12">
//             <h2 className={`${theme.fontSize.section} font-light text-gray-800 mb-4 uppercase tracking-wide`}>Skills</h2>
//             <div className="flex flex-wrap gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <span key={index} className={`${theme.fontSize.small} text-gray-600 border border-gray-300 px-2 py-1 rounded`}>
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   )
// }

// // Design 4: Colorful Card Timeline
// const ColorfulCardTimeline: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   const colors = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100'];
  
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-4xl mx-auto">
//         <header className="text-center mb-12 bg-white p-6 rounded-lg shadow-md">
//           <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-gray-800`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex justify-center space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         <div className="space-y-8">
//           {resumeData.sections.map((section, sectionIndex) => (
//             <section key={section.id}>
//               <h2 className={`${theme.fontSize.section} font-bold text-gray-800 mb-4`}>{section.title}</h2>
//               <div className="space-y-4">
//                 {Object.entries(section.content).map(([key, bullets], index) => (
//                   <Card key={key} className={`${colors[index % colors.length]} border-l-4 border-${colors[index % colors.length].split('-')[1]}-500`}>
//                     <CardContent className="p-4">
//                       {key && (
//                         <div className="flex justify-between items-baseline mb-2">
//                           <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                           <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
//                         </div>
//                       )}
//                       <ul className="list-disc ml-5 space-y-1">
//                         {bullets.map((bullet, idx) => (
//                           <li key={idx} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
//                         ))}
//                       </ul>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </section>
//           ))}
//         </div>

//         {resumeData.skills && (
//           <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
//             <h2 className={`${theme.fontSize.section} font-bold text-gray-800 mb-4`}>Skills</h2>
//             <div className="flex flex-wrap gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <Badge key={index} className={`${colors[index % colors.length]} text-gray-800`}>
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   )
// }

// // Design 5: Zigzag Timeline
// const ZigzagTimeline: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 rounded-lg">
//         <header className="text-center mb-12">
//           <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-teal-600`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex justify-center space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         {resumeData.sections.map((section) => (
//           <section key={section.id} className="mb-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-teal-600 mb-6 text-center`}>{section.title}</h2>
//             <div className="relative">
//               <div className="absolute left-1/2 h-full w-1 bg-teal-200 transform -translate-x-1/2"></div>
//               {Object.entries(section.content).map(([key, bullets], index) => (
//                 <div key={key} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-8`}>
//                   <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
//                     {key && (
//                       <div>
//                         <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                         <span className={`${theme.fontSize.small} text-gray-500`}>{key.split(' | ')[1]}</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="w-2/12 flex justify-center">
//                     <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
//                   </div>
//                   <Card className={`w-5/12 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
//                     <CardContent className="p-4">
//                       <ul className={`space-y-1 ${index % 2 === 0 ? 'list-disc ml-4' : 'list-disc mr-4'}`}>
//                         {bullets.map((bullet, idx) => (
//                           <li key={idx} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
//                         ))}
//                       </ul>
//                     </CardContent>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}

//         {resumeData.skills && (
//           <section className="mt-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-teal-600 mb-4 text-center`}>Skills</h2>
//             <div className="flex flex-wrap justify-center gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <Badge key={index} className="bg-teal-100 text-teal-800">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   )
// }

// // Design 6: Metro Style Timeline
// const MetroStyleTimeline: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-5xl mx-auto bg-white shadow-xl p-8">
//         <header className="mb-12">
//           <h1 className={`${theme.fontSize.name} font-bold text-5xl mb-2 text-gray-800`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {resumeData.sections.map((section, sectionIndex) => (
//             <section key={section.id} className="col-span-1 space-y-4">
//               <h2 className={`${theme.fontSize.section} font-bold text-gray-800 mb-4`}>{section.title}</h2>
//               {Object.entries(section.content).map(([key, bullets], index) => (
//                 <Card key={key} className={`${colors[index % colors.length]} text-white`}>
//                   <CardContent className="p-4">
//                     {key && (
//                       <div className="mb-2">
//                         <h3 className={`${theme.fontSize.content} font-semibold`}>{key.split(' | ')[0]}</h3>
//                         <span className={`${theme.fontSize.small} opacity-75`}>{key.split(' | ')[1]}</span>
//                       </div>
//                     )}
//                     <ul className="list-disc ml-5 space-y-1">
//                       {bullets.map((bullet, idx) => (
//                         <li key={idx} className={`${theme.fontSize.small}`}>{bullet}</li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               ))}
//             </section>
//           ))}
//         </div>

//         {resumeData.skills && (
//           <section className="mt-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-gray-800 mb-4`}>Skills</h2>
//             <div className="flex flex-wrap gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <Badge key={index} className={`${colors[index % colors.length]} text-white`}>
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   )
// }

// // Design 7: Circular Timeline
// const CircularTimeline: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 rounded-lg">
//         <header className="text-center mb-12">
//           <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-purple-600`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex justify-center space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         {resumeData.sections.map((section) => (
//           <section key={section.id} className="mb-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-purple-600 mb-6 text-center`}>{section.title}</h2>
//             <div className="relative">
//               <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-purple-200 transform -translate-x-1/2"></div>
//               {Object.entries(section.content).map(([key, bullets], index) => (
//                 <div key={key} className="relative mb-8">
//                   <div className="absolute left-1/2 top-0 w-8 h-8 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold">
//                     {index + 1}
//                   </div>
//                   <Card className="ml-12 mr-4">
//                     <CardContent className="p-4">
//                       {key && (
//                         <div className="mb-2">
//                           <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                           <span className={`${theme.fontSize.small} text-gray-500`}>{key.split(' | ')[1]}</span>
//                         </div>
//                       )}
//                       <ul className="list-disc ml-5 space-y-1">
//                         {bullets.map((bullet, idx) => (
//                           <li key={idx} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
//                         ))}
//                       </ul>
//                     </CardContent>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}

//         {resumeData.skills && (
//           <section className="mt-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-purple-600 mb-4 text-center`}>Skills</h2>
//             <div className="flex flex-wrap justify-center gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <Badge key={index} className="bg-purple-100 text-purple-800">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   )
// }

// // Design 8: Alternating Sides Timeline
// const AlternatingSidesTimeline: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-5xl mx-auto bg-white shadow-xl p-8 rounded-lg">
//         <header className="text-center mb-12">
//           <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-blue-600`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex justify-center space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         {resumeData.sections.map((section) => (
//           <section key={section.id} className="mb-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-blue-600 mb-6 text-center`}>{section.title}</h2>
//             <div className="relative">
//               <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
//               {Object.entries(section.content).map(([key, bullets], index) => (
//                 <div key={key} className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} items-center mb-8`}>
//                   <div className={`w-5/12 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
//                     {key && (
//                       <div>
//                         <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                         <span className={`${theme.fontSize.small} text-gray-500`}>{key.split(' | ')[1]}</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="w-2/12 flex justify-center">
//                     <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                       {index + 1}
//                     </div>
//                   </div>
//                   <Card className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
//                     <CardContent className="p-4">
//                       <ul className={`space-y-1 ${index % 2 === 0 ? 'list-disc mr-4' : 'list-disc ml-4'}`}>
//                         {bullets.map((bullet, idx) => (
//                           <li key={idx} className={`${theme.fontSize.small} text-gray-600`}>{bullet}</li>
//                         ))}
//                       </ul>
//                     </CardContent>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}

//         {resumeData.skills && (
//           <section className="mt-12">
//             <h2 className={`${theme.fontSize.section} font-bold text-blue-600 mb-4 text-center`}>Skills</h2>
//             <div className="flex flex-wrap justify-center gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <Badge key={index} className="bg-blue-100 text-blue-800">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   )
// }

// export {
//   ClassicVerticalTimeline,
//   ModernHorizontalTimeline,
//   MinimalistDotTimeline,
//   ColorfulCardTimeline,
//   ZigzagTimeline,
//   MetroStyleTimeline,
//   CircularTimeline,
//   AlternatingSidesTimeline
// }