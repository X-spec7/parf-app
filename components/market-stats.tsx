"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useMarkets } from "@/hooks/use-markets"
import { formatCurrency, formatPercentage } from "@/lib/utils"

export function MarketStats() {
  const { markets, isLoading, totalStats } = useMarkets()

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-[100px] flex items-center justify-center">
            <div className="animate-pulse">Loading stats...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Supply</h3>
            <p className="text-2xl font-bold">{formatCurrency(totalStats.totalSupply)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Borrow</h3>
            <p className="text-2xl font-bold">{formatCurrency(totalStats.totalBorrow)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Supply APY</h3>
            <p className="text-2xl font-bold text-positive">{formatPercentage(totalStats.avgSupplyApy)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Borrow APY</h3>
            <p className="text-2xl font-bold text-destructive">{formatPercentage(totalStats.avgBorrowApy)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

