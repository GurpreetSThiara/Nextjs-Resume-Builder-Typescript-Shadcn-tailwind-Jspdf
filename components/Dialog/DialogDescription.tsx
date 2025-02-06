import type React from "react"

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>
}

