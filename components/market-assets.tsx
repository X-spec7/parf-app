"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMarket } from "@/hooks/use-market"
import { useWalletStore } from "@/store/wallet-store"
import { useUserAssets } from "@/hooks/use-user-assets"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { ConnectWallet } from "@/components/connect-wallet"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { getCryptoIcon } from "@/components/icons/crypto-icons"

export function MarketAssets({ marketId }: { marketId: string }) {
  const { market } = useMarket(marketId)
  const { isConnected } = useWalletStore()
  const { userAssets, toggleCollateral } = useUserAssets()

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Collateral Assets</CardTitle>
          <CardDescription>Connect your wallet to manage collateral</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <ConnectWallet />
        </CardContent>
      </Card>
    )
  }

  if (!market) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Collateral Assets</CardTitle>
          <CardDescription>Market data not available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Get user's collateral settings
  const getUserCollateralSetting = (assetId: string) => {
    if (!userAssets) return false

    const asset = userAssets.collateralAssets.find((a) => a.id === assetId)
    return asset?.isCollateral || false
  }

  // Handle collateral toggle
  const handleCollateralToggle = (assetId: string, newValue: boolean) => {
    toggleCollateral(assetId, newValue)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Collateral Assets</CardTitle>
        <CardDescription>Manage which assets you want to use as collateral</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {market.collateralAssets.map((asset) => {
            const isCollateral = getUserCollateralSetting(asset.id)

            return (
              <div key={asset.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">{getCryptoIcon(asset.symbol, 32)}</div>
                    <div>
                      <h4 className="font-medium">{asset.name}</h4>
                      <p className="text-xs text-muted-foreground">{formatCurrency(asset.price)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor={`collateral-${asset.id}`} className="text-sm">
                      Use as Collateral
                    </Label>
                    <Switch
                      id={`collateral-${asset.id}`}
                      checked={isCollateral}
                      onCheckedChange={(checked) => handleCollateralToggle(asset.id, checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Collateral Factor</div>
                    <div className="font-medium">{formatPercentage(asset.collateralFactor)}</div>
                  </div>

                  <div>
                    <div className="text-muted-foreground mb-1">Liquidation Factor</div>
                    <div className="font-medium">{formatPercentage(asset.liquidationFactor)}</div>
                  </div>

                  <div>
                    <div className="text-muted-foreground mb-1">Your Supply</div>
                    <div className="font-medium">
                      {formatCurrency(userAssets?.collateralAssets.find((a) => a.id === asset.id)?.balance || 0)}
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground mb-1">Collateral Value</div>
                    <div className="font-medium">
                      {formatCurrency(
                        (userAssets?.collateralAssets.find((a) => a.id === asset.id)?.balance || 0) *
                          asset.price *
                          (isCollateral ? 1 : 0),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

