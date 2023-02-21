/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    databaseHost: "localhost",
    databaseUser: "root",
    databasePassword: "",
    databaseDatabase: "reviewriot"
  }
}

module.exports = nextConfig
