import type React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  indicatorClassName?: string
}

export function Progress({ className, value, max = 100, indicatorClassName, ...props }: ProgressProps) {
  const percentage = (value / max) * 100

  return (
    <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)} {...props}>
      <div
        className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

