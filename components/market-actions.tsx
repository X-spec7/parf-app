"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMarket } from "@/hooks/use-market"
import { useWalletStore } from "@/store/wallet-store"
import { useUserAssets } from "@/hooks/use-user-assets"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { ConnectWallet } from "@/components/connect-wallet"
import { ArrowRight, Wallet } from "lucide-react"

type ActionType = "supply" | "borrow" | "withdraw" | "repay"

export function MarketActions({
  marketId,
  actionType = "supply",
}: {
  marketId: string
  actionType: ActionType
}) {
  const [amount, setAmount] = useState("")
  const [sliderValue, setSliderValue] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { market } = useMarket(marketId)
  const { isConnected } = useWalletStore()
  const { userAssets } = useUserAssets()

  // Get relevant asset based on action type
  const getRelevantAsset = () => {
    if (!userAssets) return null

    if (actionType === "supply" || actionType === "repay") {
      return userAssets.walletBalances.find((asset) => asset.id === marketId)
    } else {
      return userAssets.suppliedAssets.find((asset) => asset.id === marketId)
    }
  }

  const asset = getRelevantAsset()

  // Get max amount based on action type
  const getMaxAmount = () => {
    if (!asset) return 0

    if (actionType === "supply" || actionType === "repay") {
      return asset.balance
    } else if (actionType === "withdraw") {
      return asset.balance
    } else if (actionType === "borrow") {
      return userAssets?.borrowCapacity || 0
    }

    return 0
  }

  const maxAmount = getMaxAmount()

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = Number.parseInt(e.target.value)
    setSliderValue(percentage)

    if (maxAmount > 0) {
      const calculatedAmount = (percentage / 100) * maxAmount
      setAmount(calculatedAmount.toFixed(2))
    }
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)

    if (maxAmount > 0 && !isNaN(Number.parseFloat(value))) {
      const percentage = (Number.parseFloat(value) / maxAmount) * 100
      setSliderValue(Math.min(percentage, 100))
    } else {
      setSliderValue(0)
    }
  }

  // Handle max button click
  const handleMaxClick = () => {
    setAmount(maxAmount.toFixed(2))
    setSliderValue(100)
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number.parseFloat(amount) <= 0 || !market) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form
      setAmount("")
      setSliderValue(0)

      // Show success message or notification
      console.log(`${actionType} successful:`, {
        marketId,
        amount,
        actionType,
      })
    } catch (error) {
      console.error(`Error during ${actionType}:`, error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get action title and description
  const getActionInfo = () => {
    switch (actionType) {
      case "supply":
        return {
          title: "Supply Assets",
          description: "Supply assets to earn interest",
          buttonText: "Supply",
          apy: market?.supplyApy || 0,
          apyLabel: "Supply APY",
          apyClass: "text-positive",
        }
      case "borrow":
        return {
          title: "Borrow Assets",
          description: "Borrow against your supplied collateral",
          buttonText: "Borrow",
          apy: market?.borrowApy || 0,
          apyLabel: "Borrow APY",
          apyClass: "text-destructive",
        }
      case "withdraw":
        return {
          title: "Withdraw Assets",
          description: "Withdraw your supplied assets",
          buttonText: "Withdraw",
          apy: market?.supplyApy || 0,
          apyLabel: "Current APY",
          apyClass: "text-positive",
        }
      case "repay":
        return {
          title: "Repay Loan",
          description: "Repay your borrowed assets",
          buttonText: "Repay",
          apy: market?.borrowApy || 0,
          apyLabel: "Current APY",
          apyClass: "text-destructive",
        }
    }
  }

  const actionInfo = getActionInfo()

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{actionInfo?.title}</CardTitle>
          <CardDescription>Connect your wallet to {actionType} assets</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <ConnectWallet />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{actionInfo?.title}</CardTitle>
        <CardDescription>{actionInfo?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{formatCurrency(maxAmount)}</span>
                  <Button type="button" variant="outline" size="sm" className="h-6 text-xs" onClick={handleMaxClick}>
                    Max
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleInputChange}
                  className="text-lg"
                  step="0.01"
                  min="0"
                  max={maxAmount.toString()}
                />
                <div className="w-20 text-center font-medium">{market?.id.toUpperCase()}</div>
              </div>

              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{actionInfo?.apyLabel}</span>
                <span className={`text-sm font-medium ${actionInfo?.apyClass}`}>
                  {formatPercentage(actionInfo?.apy || 0)}
                </span>
              </div>

              {actionType === "borrow" && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Collateral Required</span>
                  <span className="text-sm font-medium">
                    {amount && !isNaN(Number.parseFloat(amount))
                      ? formatCurrency(Number.parseFloat(amount) * 1.25)
                      : formatCurrency(0)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transaction Fee</span>
                <span className="text-sm font-medium">~$0.50</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={
              !amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > maxAmount || isSubmitting
            }
          >
            {isSubmitting ? "Processing..." : actionInfo?.buttonText}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

