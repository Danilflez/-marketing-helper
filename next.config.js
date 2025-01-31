/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

const nextConfig = {
  compiler: {
    removeConsole: false,
    styledComponents: {
      minify: true,
      displayName: false
    }
  },
  output: 'export',
  sassOptions: {
    // eslint-disable-next-line quotes
    prependData: `@use 'src/styles/mixins' as *;`
  },
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: [''],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com'
      }
    ],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};
dotenv.config();

module.exports = nextConfig;
