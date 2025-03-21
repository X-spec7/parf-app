"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

type TabsContextValue = {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider")
  }
  return context
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Tabs({ defaultValue, value, onValueChange, children, className, ...props }: TabsProps) {
  const [tabValue, setTabValue] = useState(value || defaultValue)

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setTabValue(newValue)
    }
  }

  return (
    <TabsContext.Provider value={{ value: value || tabValue, onValueChange: handleValueChange }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  disabled?: boolean
}

export function TabsTrigger({ className, value, disabled, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabs()
  const isSelected = selectedValue === value

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-background text-foreground shadow-sm": isSelected,
          "hover:bg-background/50 hover:text-foreground": !isSelected,
        },
        className,
      )}
      onClick={() => onValueChange(value)}
      disabled={disabled}
      {...props}
    />
  )
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  const { value: selectedValue } = useTabs()
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

