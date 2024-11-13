// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Loader2 } from 'lucide-react'


// export default function ResumeBuilder() {
//   const [name, setName] = useState('')
//   const [jobTitle, setJobTitle] = useState('')
//   const [skills, setSkills] = useState('')
//   const [experience, setExperience] = useState('')
//   const [resumeSummary, setResumeSummary] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   const generateResume = async () => {
//     setIsLoading(true)
//     const prompt = `
//       Generate a professional resume summary for a person with the following details:
//       Name: ${name}
//       Job Title: ${jobTitle}
//       Skills: ${skills}
//       Experience: ${experience}

//       Please format the resume summary in markdown.
//     `

//     try {
//       const response = await fetch(
//         "https://api-inference.huggingface.co/models/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
//         {
//           headers: { 
//             Authorization: `Bearer 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`,
//             'Content-Type': 'application/json',
//           },
//           method: "POST",
//           body: JSON.stringify({ inputs: prompt }),
//         }
//       )

//       if (!response.ok) {
//         console.log("eeeeeeeeeeeeee")
//         throw new Error('Failed to generate resume summary')
//       }

//       const result = await response.json()
//       setResumeSummary(result[0].generated_text)
//     } catch (error) {
//         console.log("yyyyyyyyyyyy")
        
//       console.error('Error generating resume summary:', error)
//       setResumeSummary('Failed to generate resume summary. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>AI-Powered Resume Builder (Hugging Face LLaMA)</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Input
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             aria-label="Your Name"
//           />
//           <Input
//             placeholder="Job Title"
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             aria-label="Job Title"
//           />
//           <Input
//             placeholder="Skills (comma separated)"
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//             aria-label="Skills"
//           />
//           <Textarea
//             placeholder="Brief description of your experience"
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//             aria-label="Experience"
//           />
//           <Button 
//             onClick={generateResume}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Generating...
//               </>
//             ) : (
//               'Generate Resume Summary'
//             )}
//           </Button>
//           {resumeSummary && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Generated Resume Summary</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="prose dark:prose-invert">
//                   <div>{resumeSummary}</div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page