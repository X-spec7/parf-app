"use client"

import { create } from "zustand"

interface WalletState {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  initWallet: () => void
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

export const useWalletStore = create<WalletState>((set, get) => ({
  address: null,
  isConnected: false,
  isConnecting: false,
  error: null,

  initWallet: () => {
    // Check if wallet was previously connected
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      set({ address: savedAddress, isConnected: true })
    }

    // Listen for account changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          set({ address: accounts[0], isConnected: true })
          localStorage.setItem("walletAddress", accounts[0])
        } else {
          set({ address: null, isConnected: false })
          localStorage.removeItem("walletAddress")
        }
      })

      window.ethereum.on("disconnect", () => {
        set({ address: null, isConnected: false })
        localStorage.removeItem("walletAddress")
      })
    }
  },

  connectWallet: async () => {
    if (!window.ethereum) {
      set({ error: "MetaMask is not installed" })
      return
    }

    set({ isConnecting: true, error: null })

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        set({ address: accounts[0], isConnected: true })
        localStorage.setItem("walletAddress", accounts[0])
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      set({ error: "Failed to connect wallet" })
    } finally {
      set({ isConnecting: false })
    }
  },

  disconnectWallet: () => {
    set({ address: null, isConnected: false })
    localStorage.removeItem("walletAddress")
  },
}))

