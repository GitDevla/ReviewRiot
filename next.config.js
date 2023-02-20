/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    databaseHost: "192.168.80.1",
    databaseUser: "root",
    databasePassword: "",
    databaseDatabase: "reviewriot"
  }
}

module.exports = nextConfig
