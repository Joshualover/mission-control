/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mission-control',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
