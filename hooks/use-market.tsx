"use client"

import { useState, useEffect } from "react"
import type { Market } from "@/types/market"
import { useMarkets } from "@/hooks/use-markets"

export function useMarket(marketId: string) {
  const { markets, isLoading: marketsLoading } = useMarkets()
  const [market, setMarket] = useState<Market | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!marketsLoading) {
      const foundMarket = markets.find((m) => m.id === marketId) || null
      setMarket(foundMarket)
      setIsLoading(false)
    }
  }, [marketId, markets, marketsLoading])

  return { market, isLoading }
}

