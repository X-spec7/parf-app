/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['assets.coingecko.com', 'cryptologos.cc'],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig