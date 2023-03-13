/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    databaseHost: "127.0.0.1",
    databaseUser: "root",
    databasePassword: "",
    databaseDatabase: "reviewriot"
  },


  // Don't touch
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
