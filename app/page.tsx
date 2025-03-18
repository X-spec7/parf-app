import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PositionOverview } from "@/components/position-overview"
import { MarketHighlights } from "@/components/market-highlights"
import { ConnectWallet } from "@/components/connect-wallet"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Parf Finance</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The open lending protocol for a decentralized future
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/markets">
              <Button variant="gradient" size="lg">
                View Markets
              </Button>
            </Link>
            <ConnectWalletButton />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <MarketHighlights />
      </section>

      <section>
        <PositionOverview />
      </section>
    </div>
  )
}

function ConnectWalletButton() {
  return (
    <div className="flex justify-center">
      <ConnectWallet />
    </div>
  )
}

