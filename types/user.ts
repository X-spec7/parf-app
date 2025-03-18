export interface AssetBalance {
  id: string
  balance: number
}

export interface CollateralAsset {
  id: string
  balance: number
  isCollateral: boolean
}

export interface UserAssets {
  walletBalances: AssetBalance[]
  suppliedAssets: AssetBalance[]
  borrowedAssets: AssetBalance[]
  collateralAssets: CollateralAsset[]
  borrowCapacity: number
}

export interface UserPosition {
  totalCollateralValue: number
  totalBorrowValue: number
  borrowCapacity: number
  netApy: number
  healthFactor: number
  liquidationThreshold: number
}

