"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
}

export function Switch({ className, onCheckedChange, checked, id, ...props }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked || false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked
    setIsChecked(newChecked)
    onCheckedChange?.(newChecked)
  }

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        className="peer sr-only"
        checked={checked !== undefined ? checked : isChecked}
        onChange={handleChange}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "relative h-6 w-11 cursor-pointer rounded-full bg-muted transition-colors peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-checked:bg-primary",
          className,
        )}
      >
        <span
          className={cn(
            "absolute left-1 top-1 h-4 w-4 rounded-full bg-background transition-transform",
            checked !== undefined
              ? checked
                ? "translate-x-5"
                : "translate-x-0"
              : isChecked
                ? "translate-x-5"
                : "translate-x-0",
          )}
        />
      </label>
    </div>
  )
}

