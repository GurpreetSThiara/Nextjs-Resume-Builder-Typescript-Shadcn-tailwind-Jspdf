// import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'
// import React, { LegacyRef } from 'react'
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"

// type ResumeProps = {
//   theme: ThemeConfig,
//   resumeData: ResumeData,
//   font: FontConfig,
//   pdfRef: LegacyRef<HTMLDivElement> | undefined
// }

// // Design 1: Infographic Style
// const InfographicResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-5xl mx-auto bg-white shadow-xl p-8">
//         <header className="text-center mb-8">
//           <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 text-blue-600`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex justify-center space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         <div className="grid grid-cols-3 gap-8">
//           <div className="col-span-1 space-y-6">
//             {resumeData.skills && (
//               <section>
//                 <h2 className={`${theme.fontSize.section} font-bold text-blue-600 mb-4`}>Skills</h2>
//                 {resumeData.skills.map((skill, index) => (
//                   <div key={index} className="mb-2">
//                     <div className="flex justify-between mb-1">
//                       <span className={`${theme.fontSize.small} text-gray-700`}>{skill}</span>
//                       <span className={`${theme.fontSize.small} text-gray-500`}>{Math.floor(Math.random() * 41) + 60}%</span>
//                     </div>
//                     <Progress value={Math.floor(Math.random() * 41) + 60} className="h-2" />
//                   </div>
//                 ))}
//               </section>
//             )}
//           </div>

//           <div className="col-span-2 space-y-6">
//             {resumeData.summary && (
//               <section>
//                 <h2 className={`${theme.fontSize.section} font-bold text-blue-600 mb-2`}>About Me</h2>
//                 <p className={`${theme.fontSize.small} text-gray-700`}>{resumeData.summary}</p>
//               </section>
//             )}

//             {resumeData.sections.map((section) => (
//               <section key={section.id}>
//                 <h2 className={`${theme.fontSize.section} font-bold text-blue-600 mb-4`}>{section.title}</h2>
//                 {Object.entries(section.content).map(([key, bullets]) => (
//                   <Card key={key} className="mb-4">
//                     <CardContent className="p-4">
//                       {key && (
//                         <div className="flex justify-between items-baseline mb-2">
//                           <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                           <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
//                         </div>
//                       )}
//                       <ul className="list-disc ml-6 space-y-1">
//                         {bullets.map((bullet, index) => (
//                           <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
//                         ))}
//                       </ul>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </section>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Design 2: Magazine Layout
// const MagazineResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-5xl mx-auto">
//         <header className="border-b-8 border-red-600 pb-4 mb-8">
//           <h1 className={`${theme.fontSize.name} font-black text-6xl mb-2 text-gray-900`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         <div className="grid grid-cols-12 gap-8">
//           <div className="col-span-8 space-y-8">
//             {resumeData.summary && (
//               <section>
//                 <p className={`${theme.fontSize.content} text-gray-800 font-serif italic`}>{resumeData.summary}</p>
//               </section>
//             )}

//             {resumeData.sections.map((section) => (
//               <section key={section.id}>
//                 <h2 className={`${theme.fontSize.section} font-bold text-red-600 mb-4 uppercase tracking-wide`}>{section.title}</h2>
//                 {Object.entries(section.content).map(([key, bullets]) => (
//                   <div key={key} className="mb-6">
//                     {key && (
//                       <div className="flex justify-between items-baseline mb-2">
//                         <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                         <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
//                       </div>
//                     )}
//                     <ul className="list-disc ml-6 space-y-1">
//                       {bullets.map((bullet, index) => (
//                         <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </section>
//             ))}
//           </div>

//           <div className="col-span-4 space-y-8">
//             {resumeData.skills && (
//               <section className="bg-gray-100 p-6 rounded-lg">
//                 <h2 className={`${theme.fontSize.section} font-bold text-red-600 mb-4 uppercase tracking-wide`}>Skills</h2>
//                 <div className="flex flex-wrap gap-2">
//                   {resumeData.skills.map((skill, index) => (
//                     <Badge key={index} variant="secondary" className="bg-white text-gray-800">
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Design 3: Tech Circuit
// const TechCircuitResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-900 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-5xl mx-auto bg-gray-800 text-gray-300 p-8 rounded-lg shadow-2xl relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
//         </div>
        
//         <div className="relative z-10">
//           <header className="text-center mb-12">
//             <h1 className={`${theme.fontSize.name} font-bold text-5xl mb-2 text-green-400`}>
//               {resumeData.name}
//             </h1>
//             <div className={`${theme.fontSize.small} text-gray-400 flex justify-center space-x-4`}>
//               <span>{resumeData.email}</span>
//               <span>{resumeData.phone}</span>
//               <span>{resumeData.location}</span>
//             </div>
//           </header>

//           <div className="grid grid-cols-3 gap-8">
//             <div className="col-span-1 space-y-8">
//               {resumeData.skills && (
//                 <section>
//                   <h2 className={`${theme.fontSize.section} font-bold text-green-400 mb-4`}>Skills</h2>
//                   <div className="space-y-2">
//                     {resumeData.skills.map((skill, index) => (
//                       <div key={index} className="flex items-center">
//                         <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
//                         <span className={`${theme.fontSize.small}`}>{skill}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}
//             </div>

//             <div className="col-span-2 space-y-8">
//               {resumeData.summary && (
//                 <section>
//                   <h2 className={`${theme.fontSize.section} font-bold text-green-400 mb-2`}>About Me</h2>
//                   <p className={`${theme.fontSize.small}`}>{resumeData.summary}</p>
//                 </section>
//               )}

//               {resumeData.sections.map((section) => (
//                 <section key={section.id}>
//                   <h2 className={`${theme.fontSize.section} font-bold text-green-400 mb-4`}>{section.title}</h2>
//                   {Object.entries(section.content).map(([key, bullets]) => (
//                     <Card key={key} className="mb-4 bg-gray-700 border-green-400 border">
//                       <CardContent className="p-4">
//                         {key && (
//                           <div className="flex justify-between items-baseline mb-2">
//                             <h3 className={`${theme.fontSize.content} font-semibold text-green-300`}>{key.split(' | ')[0]}</h3>
//                             <span className={`${theme.fontSize.small} text-gray-400`}>{key.split(' | ')[1]}</span>
//                           </div>
//                         )}
//                         <ul className="list-disc ml-6 space-y-1">
//                           {bullets.map((bullet, index) => (
//                             <li key={index} className={`${theme.fontSize.small}`}>{bullet}</li>
//                           ))}
//                         </ul>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </section>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Design 4: Artistic Collage
// const ArtisticCollageResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-gray-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-5xl mx-auto bg-white shadow-xl p-8">
//         <div className="grid grid-cols-12 gap-4">
//           <header className="col-span-12 mb-8">
//             <h1 className={`${theme.fontSize.name} font-bold text-5xl mb-2 text-indigo-600`}>
//               {resumeData.name}
//             </h1>
//             <div className={`${theme.fontSize.small} text-gray-600 flex space-x-4`}>
//               <span>{resumeData.email}</span>
//               <span>{resumeData.phone}</span>
//               <span>{resumeData.location}</span>
//             </div>
//           </header>

//           {resumeData.summary && (
//             <section className="col-span-12 md:col-span-8 bg-indigo-100 p-6 rounded-lg">
//               <h2 className={`${theme.fontSize.section} font-bold text-indigo-600 mb-2`}>About Me</h2>
//               <p className={`${theme.fontSize.small} text-gray-700`}>{resumeData.summary}</p>
//             </section>
//           )}

//           {resumeData.skills && (
//             <section className="col-span-12 md:col-span-4 bg-yellow-100 p-6 rounded-lg">
//               <h2 className={`${theme.fontSize.section} font-bold text-yellow-600 mb-4`}>Skills</h2>
//               <div className="flex flex-wrap gap-2">
//                 {resumeData.skills.map((skill, index) => (
//                   <Badge key={index} variant="secondary" className="bg-yellow-200 text-yellow-800">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </section>
//           )}

//           {resumeData.sections.map((section, index) => (
//             <section key={section.id} className={`col-span-12 ${index % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5'} bg-pink-100 p-6 rounded-lg`}>
//               <h2 className={`${theme.fontSize.section} font-bold text-pink-600 mb-4`}>{section.title}</h2>
//               {Object.entries(section.content).map(([key, bullets]) => (
//                 <div key={key} className="mb-4">
//                   {key && (
//                     <div className="flex justify-between items-baseline mb-2">
//                       <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                       <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
//                     </div>
//                   )}
//                   <ul className="list-disc ml-6 space-y-1">
//                     {bullets.map((bullet, index) => (
//                       <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </section>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// // Design 5: Minimalist Timeline
// const MinimalistTimelineResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-4xl mx-auto">
//         <header className="text-center mb-12">
//           <h1 className={`${theme.fontSize.name} font-light text-5xl mb-2 text-gray-900`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} text-gray-600 flex justify-center space-x-4`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         <div className="space-y-12">
//           {resumeData.summary && (
//             <section className="text-center max-w-2xl mx-auto">
//               <p className={`${theme.fontSize.small} text-gray-700 italic`}>{resumeData.summary}</p>
//             </section>
//           )}

//           {resumeData.skills && (
//             <section className="text-center">
//               <h2 className={`${theme.fontSize.section} font-light text-gray-900 mb-4`}>Skills</h2>
//               <div className="flex flex-wrap justify-center gap-2">
//                 {resumeData.skills.map((skill, index) => (
//                   <Badge key={index} variant="outline" className="text-gray-700">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </section>
//           )}

//           {resumeData.sections.map((section) => (
//             <section key={section.id}>
//               <h2 className={`${theme.fontSize.section} font-light text-gray-900 mb-6 text-center`}>{section.title}</h2>
//               <div className="relative border-l-2 border-gray-200 pl-8 ml-4">
//                 {Object.entries(section.content).map(([key, bullets], index) => (
//                   <div key={key} className="mb-8 relative">
//                     <div className="absolute w-4 h-4 bg-white border-2 border-gray-400 rounded-full -left-[38px] top-1"></div>
//                     {key && (
//                       <div className="flex flex-col mb-2">
//                         <h3 className={`${theme.fontSize.content} font-semibold text-gray-800`}>{key.split(' | ')[0]}</h3>
//                         <span className={`${theme.fontSize.small} text-gray-600`}>{key.split(' | ')[1]}</span>
//                       </div>
//                     )}
//                     <ul className="list-none space-y-1">
//                       {bullets.map((bullet, index) => (
//                         <li key={index} className={`${theme.fontSize.small} text-gray-700`}>{bullet}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// // Design 6: Retro Pixel
// const RetroPixelResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-yellow-100 p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
//         <header className="bg-blue-500 text-white p-6 border-b-4 border-black">
//           <h1 className={`${theme.fontSize.name} font-bold text-4xl mb-2 pixelated`}>
//             {resumeData.name}
//           </h1>
//           <div className={`${theme.fontSize.small} flex space-x-4 pixelated`}>
//             <span>{resumeData.email}</span>
//             <span>{resumeData.phone}</span>
//             <span>{resumeData.location}</span>
//           </div>
//         </header>

//         <div className="p-6 space-y-6">
//           {resumeData.summary && (
//             <section className="border-2 border-black p-4">
//               <h2 className={`${theme.fontSize.section} font-bold text-black mb-2 pixelated`}>About Me</h2>
//               <p className={`${theme.fontSize.small} text-gray-800 pixelated`}>{resumeData.summary}</p>
//             </section>
//           )}

//           {resumeData.skills && (
//             <section className="border-2 border-black p-4">
//               <h2 className={`${theme.fontSize.section} font-bold text-black mb-4 pixelated`}>Skills</h2>
//               <div className="flex flex-wrap gap-2">
//                 {resumeData.skills.map((skill, index) => (
//                   <Badge key={index} className="bg-green-400 text-black border-2 border-black pixelated">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </section>
//           )}

//           {resumeData.sections.map((section) => (
//             <section key={section.id} className="border-2 border-black p-4">
//               <h2 className={`${theme.fontSize.section} font-bold text-black mb-4 pixelated`}>{section.title}</h2>
//               {Object.entries(section.content).map(([key, bullets]) => (
//                 <div key={key} className="mb-4">
//                   {key && (
//                     <div className="flex justify-between items-baseline mb-2">
//                       <h3 className={`${theme.fontSize.content} font-semibold text-black pixelated`}>{key.split(' | ')[0]}</h3>
//                       <span className={`${theme.fontSize.small} text-gray-600 pixelated`}>{key.split(' | ')[1]}</span>
//                     </div>
//                   )}
//                   <ul className="list-disc ml-6 space-y-1">
//                     {bullets.map((bullet, index) => (
//                       <li key={index} className={`${theme.fontSize.small} text-gray-800 pixelated`}>{bullet}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </section>
//           ))}
//         </div>
//       </div>
//       <style jsx global>{`
//         .pixelated {
//           font-family: 'Courier New', monospace;
//           image-rendering: pixelated;
//         }
//       `}</style>
//     </div>
//   )
// }

// // Design 7: Futuristic Hologram
// const FuturisticHologramResume: React.FC<ResumeProps> = ({ pdfRef, font, theme, resumeData }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-black p-8 min-h-screen ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <div className="max-w-4xl mx-auto bg-gray-900 text-cyan-300 p-8 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)] relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
//         <div className="relative z-10">
//           <header className="text-center mb-12">
//             <h1 className={`${theme.fontSize.name} font-bold text-5xl mb-2 text-cyan-400 animate-pulse`}>
//               {resumeData.name}
//             </h1>
//             <div className={`${theme.fontSize.small} text-cyan-200 flex justify-center space-x-4`}>
//               <span>{resumeData.email}</span>
//               <span>{resumeData.phone}</span>
//               <span>{resumeData.location}</span>
//             </div>
//           </header>

//           <div className="space-y-8">
//             {resumeData.summary && (
//               <section className="bg-cyan-900/30 p-6 rounded-lg backdrop-blur-sm">
//                 <h2 className={`${theme.fontSize.section} font-bold text-cyan-400 mb-2`}>Profile</h2>
//                 <p className={`${theme.fontSize.small} text-cyan-100`}>{resumeData.summary}</p>
//               </section>
//             )}

//             {resumeData.skills && (
//               <section className="bg-purple-900/30 p-6 rounded-lg backdrop-blur-sm">
//                 <h2 className={`${theme.fontSize.section} font-bold text-purple-400 mb-4`}>Skills</h2>
//                 <div className="flex flex-wrap gap-2">
//                   {resumeData.skills.map((skill, index) => (
//                     <Badge key={index} className="bg-purple-400/20 text-purple-200 border border-purple-400/50">
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {resumeData.sections.map((section) => (
//               <section key={section.id} className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm">
//                 <h2 className={`${theme.fontSize.section} font-bold text-blue-400 mb-4`}>{section.title}</h2>
//                 {Object.entries(section.content).map(([key, bullets]) => (
//                   <div key={key} className="mb-4">
//                     {key && (
//                       <div className="flex justify-between items-baseline mb-2">
//                         <h3 className={`${theme.fontSize.content} font-semibold text-blue-300`}>{key.split(' | ')[0]}</h3>
//                         <span className={`${theme.fontSize.small} text-blue-200`}>{key.split(' | ')[1]}</span>
//                       </div>
//                     )}
//                     <ul className="list-disc ml-6 space-y-1">
//                       {bullets.map((bullet, index) => (
//                         <li key={index} className={`${theme.fontSize.small} text-cyan-100`}>{bullet}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </section>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export {
//   InfographicResume,
//   MagazineResume,
//   TechCircuitResume,
//   ArtisticCollageResume,
//   MinimalistTimelineResume,//
//   RetroPixelResume,
//   FuturisticHologramResume
// }