"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMarket } from "@/hooks/use-market"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getCryptoIcon } from "@/components/icons/crypto-icons"

export function MarketDetail({ marketId }: { marketId: string }) {
  const { market, isLoading } = useMarket(marketId)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!market) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market not found</CardTitle>
          <CardDescription>The requested market could not be found</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{getCryptoIcon(marketId, 40)}</div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {market.name}
                <Badge variant="outline">{market.id.toUpperCase()} Market</Badge>
              </CardTitle>
              <CardDescription>Market overview and statistics</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="text-xl font-bold">{formatCurrency(market.price)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
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

        <Separator className="my-6" />

        <div>
          <h3 className="text-lg font-medium mb-4">Collateral Assets</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {market.collateralAssets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0">{getCryptoIcon(asset.symbol, 32)}</div>
                    <div>
                      <h4 className="font-medium">{asset.name}</h4>
                      <p className="text-xs text-muted-foreground">{formatCurrency(asset.price)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Collateral Factor:</div>
                    <div className="text-right">{formatPercentage(asset.collateralFactor)}</div>

                    <div className="text-muted-foreground">Liquidation Factor:</div>
                    <div className="text-right">{formatPercentage(asset.liquidationFactor)}</div>

                    <div className="text-muted-foreground">Total Supplied:</div>
                    <div className="text-right">{formatCurrency(asset.totalSupplied)}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

