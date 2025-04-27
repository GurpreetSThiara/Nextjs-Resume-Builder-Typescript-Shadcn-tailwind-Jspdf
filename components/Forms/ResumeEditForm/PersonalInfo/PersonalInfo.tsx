import React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ResumeData , CustomPersonalInformationItem } from "@/lib/types"
import { AddCustomInfoDialog } from "./AddCustomInfoDialog"
import { Checkbox } from "@/components/checkbox/Checkbox"

export const PersonalInfo = React.memo(
  ({
    resumeData,
    handleInputChange,
    handleCustomInfoAdd,
    handleCustomInfoChange,
    handleHideItem,
  }: {
    resumeData: ResumeData
    handleInputChange: (field: keyof ResumeData, value: string) => void
    handleCustomInfoAdd: ({data , key}:{data:CustomPersonalInformationItem , key:string}) => void
    handleCustomInfoChange: (id: string, field: "title" | "content", value: string) => void
    handleHideItem: (id: string) => void
  }) => {
    const infoSections = ["name", "email", "phone", "location", "linkedin"]

   // console.log("resumeData", resumeData)

    return (
      <div className="p-4 bg-white border rounded-lg">
        {/* <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl text-purple-500 pb-2">Personal Information</h1>
          <HoverIcon text="" />
        </div> */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {infoSections.map((field) => (
            <div key={field} className="">
              <Label className="font-semibold" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={field}
                value={resumeData[field as keyof ResumeData] as string}
                onChange={(e) => handleInputChange(field as keyof ResumeData, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-lg mb-2">Custom Information Fields</h2>
          {Object.keys(resumeData.custom).map((i) => {
            const item = resumeData.custom[i]
            console.log("item",item)
            return (
              <div key={`key ${item.id}`} className="flex items-center space-x-2 mb-2">
                <Input
                  value={item.title}
                  disabled={item.hidden}
                  onChange={(e) => handleCustomInfoChange(item.id, "title", e.target.value)}
                  placeholder="Title"
                  className="w-1/3"
                />
                <Input
                  disabled={item.hidden}
                  value={item.content}
                  onChange={(e) => handleCustomInfoChange(item.id, "content", e.target.value)}
                  placeholder="Content"
                  className="w-1/2"
                />
                <Checkbox
                  id="terms"
                  label=""
                  checked={!item.hidden}
                  onChange={() => handleHideItem(i)}
                />
  
                {/* <button
                  onClick={() => handleCustomInfoDelete(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Delete
                </button> */}
              </div>
            )
          })}
        </div>
        <div className="mt-4">
          <AddCustomInfoDialog onAdd={handleCustomInfoAdd} />
        </div>
      </div>
    )
  },
)

PersonalInfo.displayName = "PersonalInfo"

