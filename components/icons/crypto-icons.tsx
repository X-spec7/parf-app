interface CryptoIconProps {
  className?: string
  size?: number
}

export function EthereumIcon({ className, size = 24 }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_eth)">
        <path
          d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          fill="#627EEA"
        />
        <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.602" />
        <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white" />
        <path d="M16.498 21.968V27.995L24 17.616L16.498 21.968Z" fill="white" fillOpacity="0.602" />
        <path d="M16.498 27.995V21.967L9 17.616L16.498 27.995Z" fill="white" />
        <path d="M16.498 20.573L23.995 16.22L16.498 12.872V20.573Z" fill="white" fillOpacity="0.2" />
        <path d="M9 16.22L16.498 20.573V12.872L9 16.22Z" fill="white" fillOpacity="0.602" />
      </g>
      <defs>
        <clipPath id="clip0_eth">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function WbtcIcon({ className, size = 24 }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_wbtc)">
        <path
          d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          fill="#F09242"
        />
        <path
          d="M21.8885 14.5529C22.2269 12.3296 20.5349 11.2463 18.2246 10.5296L19.0383 7.24959L17.0383 6.77292L16.2469 9.97292C15.7003 9.85292 15.1383 9.74292 14.5809 9.63292L15.3809 6.40626L13.3809 5.92959L12.5673 9.20959C12.1143 9.11959 11.6703 9.02959 11.2383 8.93626L11.2429 8.91959L8.52695 8.26626L8.02695 10.3996C8.02695 10.3996 9.52695 10.7396 9.49362 10.7663C10.2583 10.9529 10.3889 11.4463 10.3623 11.8463L9.42695 15.5796C9.48695 15.5929 9.56695 15.6129 9.65362 15.6463C9.58028 15.6296 9.50028 15.6129 9.41695 15.5929L8.10028 20.8129C8.01695 21.0396 7.77695 21.3796 7.24362 21.2529C7.26362 21.2863 5.77695 20.8929 5.77695 20.8929L4.84961 23.1796L7.41695 23.7929C7.91695 23.9063 8.40695 24.0263 8.88695 24.1396L8.06028 27.4596L10.0603 27.9363L10.8736 24.6596C11.4403 24.7929 11.9869 24.9129 12.5203 25.0263L11.7136 28.2863L13.7136 28.7629L14.5403 25.4496C17.6069 26.0263 19.9069 25.7929 20.9736 23.0129C21.8269 20.7796 21.0069 19.5129 19.3069 18.6929C20.5403 18.3929 21.4736 17.5796 21.8869 14.5529H21.8885ZM17.5736 21.6263C16.9603 23.8596 13.2736 22.6396 11.9736 22.3129L13.0736 17.9396C14.3736 18.2663 18.2069 19.3129 17.5736 21.6263ZM18.1869 14.5129C17.6269 16.5529 14.5736 15.5129 13.4936 15.2396L14.4936 11.2663C15.5736 11.5396 18.7603 12.3996 18.1869 14.5129Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_wbtc">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function LinkIcon({ className, size = 24 }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_link)">
        <path
          d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          fill="#2A5ADA"
        />
        <path
          d="M16 7.5L13.1133 9.08L9.08 11.4667L7.5 12.3333V19.6667L9.08 20.5333L13.1667 22.9333L16 24.5L18.8333 22.9333L22.92 20.5333L24.5 19.6667V12.3333L22.92 11.4667L18.8867 9.08L16 7.5ZM9.08 18.0667V13.9333L16 9.86667L22.92 13.9333V18.0667L16 22.1333L9.08 18.0667Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_link">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function UsdcIcon({ className, size = 24 }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_usdc)">
        <path
          d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          fill="#2775CA"
        />
        <path
          d="M20.5 19.75C20.5 17.1375 18.8625 16.0125 16 16.0125C13.6375 16.0125 12.5 16.8875 12.5 18.3C12.5 19.7125 13.6375 20.4875 16 20.4875C18.3625 20.4875 20.5 19.7125 20.5 19.75Z"
          fill="white"
        />
        <path
          d="M20.5 13.6875C20.5 11.075 18.8625 9.95 16 9.95C13.6375 9.95 12.5 10.825 12.5 12.2375C12.5 13.65 13.6375 14.425 16 14.425C18.3625 14.425 20.5 13.65 20.5 13.6875Z"
          fill="white"
        />
        <path
          d="M16 6C20.95 6 25 10.05 25 15C25 19.95 20.95 24 16 24C11.05 24 7 19.95 7 15C7 10.05 11.05 6 16 6ZM12.5 22.5V21.35C12.5 21.35 13.65 22.5 16 22.5C18.35 22.5 19.5 21.35 19.5 21.35V22.5C19.5 23.6 18.35 24.75 16 24.75C13.65 24.75 12.5 23.6 12.5 22.5ZM16 7.25C11.8 7.25 8.25 10.8 8.25 15C8.25 19.2 11.8 22.75 16 22.75C20.2 22.75 23.75 19.2 23.75 15C23.75 10.8 20.2 7.25 16 7.25ZM21.5 15.75V17.25C21.5 18.75 20 20.25 16 20.25C12 20.25 10.5 18.75 10.5 17.25V15.75C10.5 15.75 12 17.25 16 17.25C20 17.25 21.5 15.75 21.5 15.75ZM21.5 9.75V15C21.5 16.5 20 18 16 18C12 18 10.5 16.5 10.5 15V9.75C10.5 8.25 12 6.75 16 6.75C20 6.75 21.5 8.25 21.5 9.75Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_usdc">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function UsdtIcon({ className, size = 24 }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_usdt)">
        <path
          d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          fill="#26A17B"
        />
        <path
          d="M17.922 17.3563V17.3538C17.7741 17.3613 17.3647 17.3825 16.4619 17.3825C15.7647 17.3825 15.2866 17.365 15.0866 17.3538V17.3575C11.9378 17.2175 9.58281 16.7 9.58281 16.0875C9.58281 15.475 11.9378 14.9575 15.0866 14.8163V16.9188C15.2903 16.9363 15.7822 16.9663 16.4741 16.9663C17.3091 16.9663 17.7741 16.9313 17.9209 16.9188V14.8175C21.0584 14.9588 23.4059 15.4763 23.4059 16.0875C23.4059 16.7 21.0584 17.2163 17.9209 17.3563H17.922ZM17.922 14.6075V12.7625H22.1059V9.75H9.88281V12.7625H14.0666V14.6075C10.5091 14.7675 7.875 15.4 7.875 16.1625C7.875 16.925 10.5091 17.5563 14.0666 17.7175V23.75H17.9209V17.7163C21.4697 17.5563 24.0953 16.925 24.0953 16.1625C24.0953 15.4 21.4697 14.7688 17.9209 14.6075H17.922Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_usdt">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function DaiIcon({ className, size = 24 }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_dai)">
        <path
          d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          fill="#F5AC37"
        />
        <path d="M16.0003 6L9.1875 16L16.0003 26L22.8132 16L16.0003 6Z" fill="white" />
        <path d="M16.0002 15.0625L9.1875 16L16.0002 26L22.8129 16L16.0002 15.0625Z" fill="#FBDF90" />
        <path d="M9.1875 16L16.0002 15.0625L16.0002 6L9.1875 16Z" fill="#F5AC37" />
        <path d="M22.8129 16L16.0002 15.0625L16.0002 6L22.8129 16Z" fill="#FBDF90" />
        <path d="M11.5625 14.5L16.0002 6L20.4379 14.5H11.5625Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_dai">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function getCryptoIcon(symbol: string, size?: number, className?: string) {
  switch (symbol.toLowerCase()) {
    case "eth":
      return <EthereumIcon size={size} className={className} />
    case "wbtc":
      return <WbtcIcon size={size} className={className} />
    case "link":
      return <LinkIcon size={size} className={className} />
    case "usdc":
      return <UsdcIcon size={size} className={className} />
    case "usdt":
      return <UsdtIcon size={size} className={className} />
    case "dai":
      return <DaiIcon size={size} className={className} />
    default:
      return null
  }
}

