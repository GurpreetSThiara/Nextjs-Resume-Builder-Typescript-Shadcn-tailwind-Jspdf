import { RGB } from "pdf-lib"

export type SectionContent = {
    [key: string]: string[]
  }
  
 export type Section = {
    id: string
    title: string
    content: SectionContent
  }
  
 export type ResumeData = {
    name: string
    email: string
    phone: string
    location: string
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