import { useWalletStore } from "@/store/wallet-store"

export function useWallet() {
  const { address, isConnected, connectWallet, disconnectWallet, isConnecting } = useWalletStore()

  return {
    address,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
  }
}

