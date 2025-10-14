/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      // Add this new object to the array
      {
        protocol: "https",
        hostname: "assets.bepay.money",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    scrollRestoration: false
  }
};

export default nextConfig;