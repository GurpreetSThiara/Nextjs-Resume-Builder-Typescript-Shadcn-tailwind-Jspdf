/* eslint-disable @typescript-eslint/no-explicit-any */
import HoverIcon from "@/components/Icons/HoverIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/lib/types";
import React from "react";

export const PersonalInfo = React.memo(({ resumeData, handleInputChange }:{
    resumeData:ResumeData | any
     handleInputChange: (field: keyof ResumeData | any, value: string) => void 
}) => (
   <div className="p-4 bg-white border rounded-lg">
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-xl text-purple-500 pb-2">Personal Information</h1>
      <HoverIcon text=""/>
    </div>
     <div className="grid grid-cols-2 gap-2 ">
      {['name', 'email', 'phone', 'location'].map((field) => (
        <div key={field} className="">
          <Label className="font-semibold" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
          <Input
            id={field}
            value={resumeData[field]} 
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        </div>
      ))}
    </div>
   </div>
  ))


  PersonalInfo.displayName = 'PersonalInfo';