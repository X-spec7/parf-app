"use client"

import { type ReactNode, useEffect } from "react"
import { useWalletStore } from "@/store/wallet-store"

export function WalletProvider({ children }: { children: ReactNode }) {
  const { initWallet } = useWalletStore()

  useEffect(() => {
    // Initialize wallet connection
    initWallet()
  }, [initWallet])

  return <>{children}</>
}

