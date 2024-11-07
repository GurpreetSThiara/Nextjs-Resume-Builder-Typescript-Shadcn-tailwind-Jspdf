// import React from 'react'
// import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'

// // Separate component for the header section
// const Header = ({ name, email, phone, location, theme, font }) => (
//   <header className="text-center mb-4">
//     <h1 className={`${theme.fontSize.name} font-bold ${theme.colors.primary}`}>
//       {name}
//     </h1>
//     <p className={`${theme.fontSize.small} ${theme.colors.secondary}`}>
//       {email} | {phone} | {location}
//     </p>
//   </header>
// )

// // Separate component for each section item
// const SectionItem = ({ title, content, theme }) => (
//   <div className={theme.spacing.item}>
//     {title && (
//       <div className="flex justify-between items-baseline mb-1">
//         <h3 className={`${theme.fontSize.content} font-semibold flex-1 pr-4`}>
//           {title.split(' | ')[0]}
//         </h3>
//         <span className={`${theme.fontSize.small} ${theme.colors.secondary} text-right`}>
//           {title.split(' | ')[1]}
//         </span>
//       </div>
//     )}
//     <ul className={title ? "list-disc ml-4" : ""}>
//       {content.map((bullet, index) => (
//         <li 
//           key={index} 
//           className={`${theme.fontSize.small} ${theme.colors.text} mb-1`}
//         >
//           {bullet}
//         </li>
//       ))}
//     </ul>
//   </div>
// )

// // Separate component for each main section
// const Section = ({ title, content, theme }) => (
//   <section className={theme.spacing.section}>
//     <h2 className={`${theme.fontSize.section} font-bold uppercase ${theme.colors.primary} mb-2`}>
//       {title}
//     </h2>
//     {Object.entries(content).map(([key, bullets]) => (
//       <SectionItem key={key} title={key} content={bullets} theme={theme} />
//     ))}
//   </section>
// )

// // Main component
// const ATS1 = ({
//   pdfRef,
//   font,
//   theme,
//   resumeData
// }: {
//   theme: ThemeConfig,
//   resumeData: ResumeData,
//   font: FontConfig,
//   pdfRef: React.RefObject<HTMLDivElement>
// }) => {
//   return (
//     <div 
//       ref={pdfRef} 
//       className={`bg-white p-6 shadow-lg ${font.className}`}
//       style={{ fontFamily: font.name }}
//     >
//       <Header 
//         name={resumeData.name}
//         email={resumeData.email}
//         phone={resumeData.phone}
//         location={resumeData.location}
//         theme={theme}
//         font={font}
//       />
      
//       {resumeData.sections.map((section) => (
//         <Section 
//           key={section.id}
//           title={section.title}
//           content={section.content}
//           theme={theme}
//         />
//       ))}
//     </div>
//   )
// }

// export default ATS1