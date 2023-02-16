/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    databaseHost: "172.21.96.1",
    databaseUser: "root",
    databasePassword: "",
    databaseDatabase: "reviewriot"
  }
}

module.exports = nextConfig
