"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useWalletStore } from "@/store/wallet-store"
import { useUserPosition } from "@/hooks/use-user-position"
import { ConnectWallet } from "@/components/connect-wallet"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { AlertTriangle, TrendingUp } from "lucide-react"

export function PositionOverview() {
  const { isConnected } = useWalletStore()
  const { position, isLoading } = useUserPosition()

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Position</CardTitle>
          <CardDescription>Connect your wallet to view your position</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <ConnectWallet />
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Position</CardTitle>
          <CardDescription>Loading your position data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If no position data or empty position
  if (!position || (position.totalCollateralValue === 0 && position.totalBorrowValue === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Position</CardTitle>
          <CardDescription>You don't have any active positions</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Supply assets to earn interest or use them as collateral to borrow
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate borrow usage percentage
  const borrowUsagePercentage =
    position.borrowCapacity > 0 ? (position.totalBorrowValue / position.borrowCapacity) * 100 : 0

  // Determine risk level based on borrow usage
  const getRiskLevel = (usage: number) => {
    if (usage >= 80) return "high"
    if (usage >= 60) return "medium"
    return "low"
  }

  const riskLevel = getRiskLevel(borrowUsagePercentage)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Position</CardTitle>
        <CardDescription>Overview of your lending and borrowing activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Collateral Value</h3>
              <p className="text-2xl font-bold">{formatCurrency(position.totalCollateralValue)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Borrow Value</h3>
              <p className="text-2xl font-bold">{formatCurrency(position.totalBorrowValue)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Net APY</h3>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-positive" />
                <p className="text-xl font-bold text-positive">{formatPercentage(position.netApy)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-muted-foreground">Borrow Capacity</h3>
                <span className="text-sm font-medium">
                  {formatCurrency(position.totalBorrowValue)} / {formatCurrency(position.borrowCapacity)}
                </span>
              </div>
              <Progress
                value={borrowUsagePercentage}
                className={`h-2 ${
                  riskLevel === "high" ? "bg-destructive/20" : riskLevel === "medium" ? "bg-warning/20" : "bg-muted"
                }`}
                indicatorClassName={
                  riskLevel === "high" ? "bg-destructive" : riskLevel === "medium" ? "bg-warning" : "bg-positive"
                }
              />
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">{formatPercentage(borrowUsagePercentage)} used</span>
                <span className="text-xs text-muted-foreground">
                  {formatCurrency(position.borrowCapacity - position.totalBorrowValue)} available
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-muted-foreground">Liquidation Point</h3>
                {riskLevel === "high" && (
                  <div className="flex items-center gap-1 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium">High risk</span>
                  </div>
                )}
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current</span>
                  <span className="text-sm">Liquidation</span>
                </div>
                <div className="relative h-6 mt-2">
                  <div className="absolute left-0 top-0 h-full w-full bg-background/50 rounded-md"></div>
                  <div
                    className="absolute left-0 top-0 h-full bg-destructive/10 rounded-r-md"
                    style={{ width: `${borrowUsagePercentage}%` }}
                  ></div>
                  <div className="absolute top-0 h-full w-0.5 bg-destructive" style={{ left: "80%" }}></div>
                  <div
                    className="absolute top-0 h-full w-1 bg-foreground rounded-full"
                    style={{ left: `${borrowUsagePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

