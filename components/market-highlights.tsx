"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMarkets } from "@/hooks/use-markets"
import Link from "next/link"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { getCryptoIcon } from "@/components/icons/crypto-icons"

export function MarketHighlights() {
  const { markets, isLoading } = useMarkets()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Highlights</CardTitle>
          <CardDescription>Loading market data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Highlights</CardTitle>
        <CardDescription>Key metrics from Parf lending markets</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="usdc">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usdc" className="flex items-center gap-2">
              {getCryptoIcon("usdc", 20)}
              <span>USDC</span>
            </TabsTrigger>
            <TabsTrigger value="usdt" className="flex items-center gap-2">
              {getCryptoIcon("usdt", 20)}
              <span>USDT</span>
            </TabsTrigger>
            <TabsTrigger value="dai" className="flex items-center gap-2">
              {getCryptoIcon("dai", 20)}
              <span>DAI</span>
            </TabsTrigger>
          </TabsList>
          {markets.map((market) => (
            <TabsContent key={market.id} value={market.id}>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Supply</h3>
                  <p className="text-2xl font-bold">{formatCurrency(market.totalSupply)}</p>
                  <p className="text-sm text-muted-foreground">
                    Supply APY: <span className="text-positive">{formatPercentage(market.supplyApy)}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Borrow</h3>
                  <p className="text-2xl font-bold">{formatCurrency(market.totalBorrow)}</p>
                  <p className="text-sm text-muted-foreground">
                    Borrow APY: <span className="text-destructive">{formatPercentage(market.borrowApy)}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Utilization</h3>
                  <p className="text-2xl font-bold">{formatPercentage(market.utilization)}</p>
                  <p className="text-sm text-muted-foreground">
                    {market.utilization < 80 ? "Healthy" : "High"} utilization rate
                  </p>
                </div>
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={`/markets/${market.id}`}
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  View market details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

