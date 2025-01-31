import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
};

export default nextConfig;

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

module.exports = withPWA({
  // reactStrictMode: true,
});