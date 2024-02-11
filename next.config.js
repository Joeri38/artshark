/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // if true, effects and components get called twice
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/attachments/**',
      },
    ],
  },
}

module.exports = nextConfig

