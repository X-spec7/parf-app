"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useMarkets } from "@/hooks/use-markets"
import Link from "next/link"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { getCryptoIcon } from "@/components/icons/crypto-icons"

export function MarketsList() {
  const { markets, isLoading } = useMarkets()

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-pulse">Loading markets...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {markets.map((market) => (
        <Card key={market.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/4 border-b md:border-b-0 md:border-r">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{getCryptoIcon(market.id, 40)}</div>
                  <div>
                    <h3 className="font-bold">{market.name}</h3>
                    <p className="text-sm text-muted-foreground">{market.id.toUpperCase()} Market</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 flex-1">
                <div className="p-6 border-b md:border-b-0 md:border-r">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Supply APY</h4>
                  <p className="text-xl font-bold text-positive">{formatPercentage(market.supplyApy)}</p>
                </div>

                <div className="p-6 border-b md:border-b-0 md:border-r">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Borrow APY</h4>
                  <p className="text-xl font-bold text-destructive">{formatPercentage(market.borrowApy)}</p>
                </div>

                <div className="p-6 border-b md:border-b-0 md:border-r">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Supply</h4>
                  <p className="text-xl font-bold">{formatCurrency(market.totalSupply)}</p>
                </div>

                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Borrow</h4>
                    <p className="text-xl font-bold">{formatCurrency(market.totalBorrow)}</p>
                  </div>

                  <div className="mt-4 text-right">
                    <Link href={`/markets/${market.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <span>View</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

