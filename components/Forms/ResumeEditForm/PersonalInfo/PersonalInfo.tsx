/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/lib/types";
import React from "react";

export const PersonalInfo = React.memo(({ resumeData, handleInputChange }:{
    resumeData:ResumeData | any
     handleInputChange: (field: keyof ResumeData | any, value: string) => void 
}) => (
    <div className="space-y-4">
      {['name', 'email', 'phone', 'location'].map((field) => (
        <div key={field}>
          <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
          <Input
            id={field} 
            value={resumeData[field]} 
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        </div>
      ))}
    </div>
  ))


  PersonalInfo.displayName = 'PersonalInfo';