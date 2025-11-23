"use client"

import * as React from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from "@/components/ui/command"

interface Option {
  label: string
  value: string
}

interface ComboboxProps {
  label?: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  requiredMark?: boolean
  error?: string
}

export function FloatingLabelCombobox({
  label,
  options,
  value,
  onChange,
  placeholder = "Please select...",
  className,
  requiredMark,
  error,
}: ComboboxProps) {

  const [open, setOpen] = React.useState(false)

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("relative", className)}>
          <button
            type="button"
            aria-expanded={open}
            className={cn("w-full rounded-md px-3 py-[1px] pt-4 h-11 bg-white border-[#999796] border-[1.5px] text-left flex items-center justify-between", { "border-destructive": error })}
          >
            <span className="text-base">{selectedLabel}</span>
            <ChevronsUpDown className="mb-4 size-5 opacity-60" />
          </button>
          {label && (
            <label className="text-xs text-gray-1-foreground italic px-2.5 py-1 absolute left-[3px] top-[0px]">{label}{requiredMark && <span className='text-red-400 pl-1'>*</span>}</label>
          )}
          {error && (<FieldError error={error} />)}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={`Search...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <span>{opt.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


function FieldError({
  className,
  children,
  error,
  ...props
}: React.ComponentProps<"div"> & {
  error?: string
}) {
  if (!error) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal pl-1", className)}
      {...props}
    >
      {error}
    </div>
  )
}

