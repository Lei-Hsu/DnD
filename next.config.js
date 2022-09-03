/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 如果要使用 Drag and Drop 功能，必須關閉 reactStrictMode
  swcMinify: true,
  images: {
    domains: ['avatars.dicebear.com'],
  },
}

module.exports = nextConfig
