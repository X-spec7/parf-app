"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface DialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within a DialogProvider")
  }
  return context
}

interface DialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ children, open: controlledOpen, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value)
    } else {
      setInternalOpen(value)
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return <DialogContext.Provider value={{ open: isOpen, setOpen }}>{children}</DialogContext.Provider>
}

interface DialogTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function DialogTrigger({ children, asChild }: DialogTriggerProps) {
  const { setOpen } = useDialog()

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(true)
      },
    })
  }

  return <div onClick={() => setOpen(true)}>{children}</div>
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DialogContent({ children, className, ...props }: DialogContentProps) {
  const { open, setOpen } = useDialog()
  const [bodyOverflow, setBodyOverflow] = useState(document.body.style.overflow)

  useEffect(() => {
    if (open) {
      setBodyOverflow(document.body.style.overflow)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = bodyOverflow
    }
  }, [open, bodyOverflow])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-0"
      onClick={() => setOpen(false)}
    >
      <div
        className={cn(
          "relative max-h-[90vh] w-full max-w-md overflow-auto rounded-lg bg-background p-6 shadow-lg animate-in zoom-in-95",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DialogHeader({ children, className, ...props }: DialogHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}>
      {children}
    </div>
  )
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function DialogTitle({ children, className, ...props }: DialogTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </h3>
  )
}

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function DialogDescription({ children, className, ...props }: DialogDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

