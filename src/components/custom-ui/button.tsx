import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap lg:text-xl text-base leading-normal font-medium rounded-lg transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none lg:[&_svg]:size-auto [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow border-transparent border hover:bg-transparent hover:border-primary hover:text-secondary-foreground",
        destructive:
          "bg-destructive text-gray-3-foreground border-destructive border hover:bg-transparent hover:text-gray-3-foreground",
        outline:
          "border border-primary bg-transparent text-secondary-foreground hover:bg-primary hover:text-white ",
        secondary:
          "bg-primary text-white hover:bg-transparent hover:text-secondary-foreground border-primary border",
        ghost: "hover:bg-accent hover:text-gray-2-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "lg:px-10 md:px-8 px-6 lg:py-[18px] py-3",
        medium: "lg:px-8 md:px-7 px-6 lg:py-3 py-2.5",
        sm: "px-5 py-2.5",
        xm: "px-5 py-2 leading-7 lg:text-lg rounded-sm",
        lg: "px-7.5 py-3",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
