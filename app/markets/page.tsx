import { MarketsList } from "@/components/markets-list"
import { MarketStats } from "@/components/market-stats"

export default function MarketsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Markets</h1>
      <div className="mb-8">
        <MarketStats />
      </div>
      <MarketsList />
    </div>
  )
}

