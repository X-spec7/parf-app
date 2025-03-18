"use client"

import React, { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
}

export function TooltipProvider({ children, delayDuration = 300 }: TooltipProviderProps) {
  return <div data-tooltip-delay={delayDuration}>{children}</div>
}

interface TooltipContextType {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined)

function useTooltip() {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip")
  }
  return context
}

interface TooltipProps {
  children: React.ReactNode
  delayDuration?: number
}

export function Tooltip({ children, delayDuration }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  )
}

interface TooltipTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function TooltipTrigger({ children, asChild }: TooltipTriggerProps) {
  const { setOpen, triggerRef } = useTooltip()
  const delayDuration = Number(
    document.querySelector("[data-tooltip-delay]")?.getAttribute("data-tooltip-delay") || 300,
  )

  let timer: NodeJS.Timeout | null = null

  const handleMouseEnter = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => setOpen(true), delayDuration)
  }

  const handleMouseLeave = () => {
    if (timer) clearTimeout(timer)
    // Add a small delay before closing to prevent flickering
    timer = setTimeout(() => setOpen(false), 100)
  }

  const triggerProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
    ref: triggerRef as any,
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps)
  }

  return <span {...triggerProps}>{children}</span>
}

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  hidden?: boolean
}

export function TooltipContent({
  children,
  className,
  side = "top",
  align = "center",
  hidden = false,
  ...props
}: TooltipContentProps) {
  const { open, triggerRef } = useTooltip()
  const contentRef = useRef<HTMLDivElement>(null)

  if (!open || hidden) return null

  // Calculate position based on trigger element
  const getPosition = () => {
    if (!triggerRef.current || !contentRef.current) return {}

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (side) {
      case "top":
        top = -contentRect.height - 8
        break
      case "bottom":
        top = triggerRect.height + 8
        break
      case "left":
        left = -contentRect.width - 8
        break
      case "right":
        left = triggerRect.width + 8
        break
    }

    if (side === "top" || side === "bottom") {
      switch (align) {
        case "start":
          left = 0
          break
        case "center":
          left = (triggerRect.width - contentRect.width) / 2
          break
        case "end":
          left = triggerRect.width - contentRect.width
          break
      }
    }

    if (side === "left" || side === "right") {
      switch (align) {
        case "start":
          top = 0
          break
        case "center":
          top = (triggerRect.height - contentRect.height) / 2
          break
        case "end":
          top = triggerRect.height - contentRect.height
          break
      }
    }

    return { top, left }
  }

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        {
          "data-[side=top]:slide-in-from-bottom-2": side === "top",
          "data-[side=bottom]:slide-in-from-top-2": side === "bottom",
          "data-[side=left]:slide-in-from-right-2": side === "left",
          "data-[side=right]:slide-in-from-left-2": side === "right",
        },
        className,
      )}
      style={getPosition()}
      data-side={side}
      {...props}
    >
      {children}
      <div
        className={cn(
          "absolute bg-popover w-2 h-2 rotate-45",
          {
            "top-full -translate-y-1": side === "top",
            "bottom-full translate-y-1": side === "bottom",
            "left-full -translate-x-1": side === "left",
            "right-full translate-x-1": side === "right",
          },
          {
            "left-1/2 -translate-x-1/2": (side === "top" || side === "bottom") && align === "center",
            "left-2": (side === "top" || side === "bottom") && align === "start",
            "right-2": (side === "top" || side === "bottom") && align === "end",
            "top-1/2 -translate-y-1/2": (side === "left" || side === "right") && align === "center",
            "top-2": (side === "left" || side === "right") && align === "start",
            "bottom-2": (side === "left" || side === "right") && align === "end",
          },
        )}
      />
    </div>
  )
}

