"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWalletStore } from "@/store/wallet-store"
import { Wallet, LogOut } from "lucide-react"
import { formatAddress } from "@/lib/utils"

export function ConnectWallet() {
  const [open, setOpen] = useState(false)
  const { address, isConnected, connectWallet, disconnectWallet } = useWalletStore()

  const handleConnect = async () => {
    await connectWallet()
    setOpen(false)
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">{formatAddress(address)}</span>
          <span className="sm:hidden">{formatAddress(address, 4)}</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={disconnectWallet} title="Disconnect wallet">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" onClick={() => setOpen(true)}>
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Connect your wallet to access Parf Finance</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button variant="gradient" onClick={handleConnect} className="w-full">
            MetaMask
          </Button>
          <Button variant="outline" className="w-full" disabled>
            WalletConnect (Coming Soon)
          </Button>
          <Button variant="outline" className="w-full" disabled>
            Coinbase Wallet (Coming Soon)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

