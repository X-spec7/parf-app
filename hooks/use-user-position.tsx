"use client"

import { useState, useEffect } from "react"
import type { UserPosition } from "@/types/user"
import { useWalletStore } from "@/store/wallet-store"

export function useUserPosition() {
  const [position, setPosition] = useState<UserPosition | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { address, isConnected } = useWalletStore()

  useEffect(() => {
    const fetchUserPosition = async () => {
      if (!isConnected || !address) {
        setPosition(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockPosition: UserPosition = {
          totalCollateralValue: 25000,
          totalBorrowValue: 15000,
          borrowCapacity: 18750, // 75% of collateral value
          netApy: 0.0215,
          healthFactor: 1.25,
          liquidationThreshold: 0.825,
        }

        setPosition(mockPosition)
      } catch (error) {
        console.error("Error fetching user position:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserPosition()
  }, [address, isConnected])

  return { position, isLoading }
}

