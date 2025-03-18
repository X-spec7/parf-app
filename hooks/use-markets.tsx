"use client"

import { useState, useEffect } from "react"
import type { Market } from "@/types/market"

export function useMarkets() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockMarkets: Market[] = [
          {
            id: "usdc",
            name: "USD Coin",
            price: 1.0,
            totalSupply: 10500000,
            totalBorrow: 8400000,
            supplyApy: 0.0325,
            borrowApy: 0.0425,
            utilization: 0.8,
            collateralAssets: [
              {
                id: "eth",
                name: "Ethereum",
                symbol: "ETH",
                price: 3500,
                collateralFactor: 0.75,
                liquidationFactor: 0.825,
                totalSupplied: 2500000,
              },
              {
                id: "wbtc",
                name: "Wrapped Bitcoin",
                symbol: "WBTC",
                price: 65000,
                collateralFactor: 0.7,
                liquidationFactor: 0.8,
                totalSupplied: 3200000,
              },
              {
                id: "link",
                name: "Chainlink",
                symbol: "LINK",
                price: 18.5,
                collateralFactor: 0.65,
                liquidationFactor: 0.75,
                totalSupplied: 1800000,
              },
            ],
          },
          {
            id: "usdt",
            name: "Tether",
            price: 1.0,
            totalSupply: 8200000,
            totalBorrow: 6150000,
            supplyApy: 0.0345,
            borrowApy: 0.0445,
            utilization: 0.75,
            collateralAssets: [
              {
                id: "eth",
                name: "Ethereum",
                symbol: "ETH",
                price: 3500,
                collateralFactor: 0.75,
                liquidationFactor: 0.825,
                totalSupplied: 2200000,
              },
              {
                id: "wbtc",
                name: "Wrapped Bitcoin",
                symbol: "WBTC",
                price: 65000,
                collateralFactor: 0.7,
                liquidationFactor: 0.8,
                totalSupplied: 2800000,
              },
              {
                id: "link",
                name: "Chainlink",
                symbol: "LINK",
                price: 18.5,
                collateralFactor: 0.65,
                liquidationFactor: 0.75,
                totalSupplied: 1500000,
              },
            ],
          },
          {
            id: "dai",
            name: "Dai Stablecoin",
            price: 1.0,
            totalSupply: 7500000,
            totalBorrow: 5250000,
            supplyApy: 0.0315,
            borrowApy: 0.0415,
            utilization: 0.7,
            collateralAssets: [
              {
                id: "eth",
                name: "Ethereum",
                symbol: "ETH",
                price: 3500,
                collateralFactor: 0.75,
                liquidationFactor: 0.825,
                totalSupplied: 1800000,
              },
              {
                id: "wbtc",
                name: "Wrapped Bitcoin",
                symbol: "WBTC",
                price: 65000,
                collateralFactor: 0.7,
                liquidationFactor: 0.8,
                totalSupplied: 2500000,
              },
              {
                id: "link",
                name: "Chainlink",
                symbol: "LINK",
                price: 18.5,
                collateralFactor: 0.65,
                liquidationFactor: 0.75,
                totalSupplied: 1200000,
              },
            ],
          },
        ]

        setMarkets(mockMarkets)
      } catch (error) {
        console.error("Error fetching markets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMarkets()
  }, [])

  // Calculate total stats
  const totalStats = {
    totalSupply: markets.reduce((sum, market) => sum + market.totalSupply, 0),
    totalBorrow: markets.reduce((sum, market) => sum + market.totalBorrow, 0),
    avgSupplyApy: markets.length > 0 ? markets.reduce((sum, market) => sum + market.supplyApy, 0) / markets.length : 0,
    avgBorrowApy: markets.length > 0 ? markets.reduce((sum, market) => sum + market.borrowApy, 0) / markets.length : 0,
  }

  return { markets, isLoading, totalStats }
}

