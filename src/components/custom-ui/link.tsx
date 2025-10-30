"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface AppLinkProps extends React.ComponentProps<typeof Link> {
  underline?: boolean
}

export function AppLink({ className, underline, ...props }: AppLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "transition-colors",
        { "underline": underline },
        className
      )}
    />
  )
}
