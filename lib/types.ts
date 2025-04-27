import { RGB } from "pdf-lib"
import { LegacyRef } from "react"

export type SectionContent = {
    [key: string]: string[]
  }
  
 export type Section = {
    id: string
    title: string
    content: SectionContent
  }

  export type CustomPersonalInformationItem = {
    id:string
    title:string
    content:string
    link:boolean
    hidden:boolean
  }

  export type CustomPersonalInformation = {
    [key:string] : CustomPersonalInformationItem
  }
  
 export type ResumeData = {
    name: string
    email: string
    phone: string
    location: string
    linkedin:string
    custom:CustomPersonalInformation
    sections: Section[]
  }
  
 export type ThemeType = 'modern' | 'traditional' | 'minimal'
 export type FontType = 'inter' | 'times' | 'helvetica' | 'georgia'
  
 export interface ThemeConfig {
    fontFamily: string
    fontSize: {
      name: string
      section: string
      content: string
      small: string
    }
    spacing: {
      section: string
      item: string
    }
    colors: {
      primary: string
      secondary: string
      text: string
    },

    rgb: {
      linkColor: RGB
      primary: RGB;
      secondary: RGB;
      text: RGB;
      heading:RGB
    },
    pdfSize: {
      name: number;
      section: number;
      content: number;
      small: number;
    },
    pdfSpacing: {
      section: number;
      item: number;
      page:number
    }
  }

  export interface FontConfig {
    name:string
    className:string
  }


  export type ResumeProps = {
    theme: ThemeConfig,
    resumeData: ResumeData,
    font: FontConfig,
    pdfRef: LegacyRef<HTMLDivElement> | undefined
  }
  