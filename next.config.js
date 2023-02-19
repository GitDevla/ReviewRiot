/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    databaseHost: "172.26.176.1",
    databaseUser: "root",
    databasePassword: "",
    databaseDatabase: "reviewriot"
  }
}

module.exports = nextConfig
