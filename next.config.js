/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_APP_S3_CDN],
  },
  env: {
    ProjectName: process.env.NEXT_PUBLIC_APP_CURRENT_PROJECT,
  }
}
module.exports = nextConfig
