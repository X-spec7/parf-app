import { notFound } from "next/navigation"
import { MarketDetail } from "@/components/market-detail"
import { MarketActions } from "@/components/market-actions"
import { MarketAssets } from "@/components/market-assets"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarketPage({
  params,
  searchParams,
}: {
  params: { market: string }
  searchParams: { tab?: string }
}) {
  const market = params.market.toLowerCase()
  const validMarkets = ["usdc", "usdt", "dai"]

  if (!validMarkets.includes(market)) {
    notFound()
  }

  const defaultTab = searchParams.tab || "supply"

  return (
    <div className="container mx-auto px-4 py-8">
      <MarketDetail marketId={market} />

      <div className="mt-8">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="supply">Supply</TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
            <TabsTrigger value="collateral">Collateral</TabsTrigger>
          </TabsList>
          <TabsContent value="supply">
            <MarketActions marketId={market} actionType="supply" />
          </TabsContent>
          <TabsContent value="borrow">
            <MarketActions marketId={market} actionType="borrow" />
          </TabsContent>
          <TabsContent value="collateral">
            <MarketAssets marketId={market} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

