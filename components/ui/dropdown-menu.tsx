"use client"

import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined)

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("DropdownMenu components must be used within a DropdownMenuProvider")
  }
  return context
}

interface DropdownMenuProps {
  children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenu()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(!open)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    })
  }

  return (
    <div onClick={handleClick} className="inline-flex">
      {children}
    </div>
  )
}

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}

export function DropdownMenuContent({
  children,
  className,
  align = "center",
  side = "bottom",
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen } = useDropdownMenu()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        {
          "right-0": align === "end",
          "left-0": align === "start",
          "left-1/2 -translate-x-1/2": align === "center",
          "bottom-full mb-2": side === "top",
          "top-full mt-2": side === "bottom",
          "right-full mr-2": side === "left",
          "left-full ml-2": side === "right",
        },
        className,
      )}
      data-side={side}
      {...props}
    >
      {children}
    </div>
  )
}

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export function DropdownMenuItem({ className, disabled, onClick, ...props }: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenu()

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return
    if (onClick) {
      onClick(e)
    }
    setOpen(false)
  }

  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      onClick={handleClick}
      {...props}
    />
  )
}

