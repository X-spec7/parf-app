export interface CollateralAssetInfo {
  id: string
  name: string
  symbol: string
  price: number
  collateralFactor: number
  liquidationFactor: number
  totalSupplied: number
}

export interface Market {
  id: string
  name: string
  price: number
  totalSupply: number
  totalBorrow: number
  supplyApy: number
  borrowApy: number
  utilization: number
  collateralAssets: CollateralAssetInfo[]
}

