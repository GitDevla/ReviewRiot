/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
    databaseHost: "db",
    databaseUser: "root",
    databasePassword: "password",
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
      {
        source: '/settings',
        destination: '/settings/profile',
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
