"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ConnectWallet } from "@/components/connect-wallet"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useWalletStore } from "@/store/wallet-store"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isConnected } = useWalletStore()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Parf</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/markets"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith("/markets") ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Markets
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <ConnectWallet />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-4">
            <Link
              href="/"
              className={cn(
                "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/markets"
              className={cn(
                "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                pathname.startsWith("/markets") ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Markets
            </Link>
            <div className="flex items-center gap-4 pt-2">
              <ModeToggle />
              <ConnectWallet />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

