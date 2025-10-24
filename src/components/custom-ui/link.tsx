"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export function AppLink({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "transition-colors underline",
        className
      )}
    />
  )
}
