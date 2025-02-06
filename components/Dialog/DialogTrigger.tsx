import type React from "react"
import { useDialog } from "./Dialog"

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  const { setOpen } = useDialog()

  return <div onClick={() => setOpen(true)}>{children}</div>
}

