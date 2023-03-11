/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    databaseHost: "127.0.0.1",
    databaseUser: "root",
    databasePassword: "",
    databaseDatabase: "reviewriot"
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
