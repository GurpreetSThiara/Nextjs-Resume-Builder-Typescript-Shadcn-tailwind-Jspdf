import type React from "react"

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 flex justify-end space-x-2">{children}</div>
}

