import type React from "react"
import { createContext, useContext, useState } from "react"

type DialogContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}

export function Dialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

