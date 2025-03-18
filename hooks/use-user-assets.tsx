"use client"

import { useState, useEffect } from "react"
import type { UserAssets } from "@/types/user"
import { useWalletStore } from "@/store/wallet-store"

export function useUserAssets() {
  const [userAssets, setUserAssets] = useState<UserAssets | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { address, isConnected } = useWalletStore()

  useEffect(() => {
    const fetchUserAssets = async () => {
      if (!isConnected || !address) {
        setUserAssets(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockAssets: UserAssets = {
          walletBalances: [
            { id: "usdc", balance: 5000 },
            { id: "usdt", balance: 3000 },
            { id: "dai", balance: 2500 },
          ],
          suppliedAssets: [
            { id: "usdc", balance: 2000 },
            { id: "usdt", balance: 1500 },
            { id: "dai", balance: 1000 },
          ],
          borrowedAssets: [
            { id: "usdc", balance: 1000 },
            { id: "usdt", balance: 800 },
            { id: "dai", balance: 500 },
          ],
          collateralAssets: [
            { id: "eth", balance: 5, isCollateral: true },
            { id: "wbtc", balance: 0.25, isCollateral: true },
            { id: "link", balance: 100, isCollateral: false },
          ],
          borrowCapacity: 18750,
        }

        setUserAssets(mockAssets)
      } catch (error) {
        console.error("Error fetching user assets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAssets()
  }, [address, isConnected])

  // Toggle collateral status
  const toggleCollateral = (assetId: string, isCollateral: boolean) => {
    if (!userAssets) return

    setUserAssets((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        collateralAssets: prev.collateralAssets.map((asset) =>
          asset.id === assetId ? { ...asset, isCollateral } : asset,
        ),
      }
    })
  }

  return { userAssets, isLoading, toggleCollateral }
}

