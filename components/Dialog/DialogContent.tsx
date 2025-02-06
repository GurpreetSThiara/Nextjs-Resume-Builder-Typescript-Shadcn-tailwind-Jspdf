import type React from "react"
import { useEffect, useRef } from "react"
import { useDialog } from "./Dialog"

export function DialogContent({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useDialog()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [open, setOpen])

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setOpen(false)}></div>
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  )
}

