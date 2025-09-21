/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**", // Allows any image path from this domain
      },
    ],
  },
  experimental: {
    scrollRestoration: false
  }
};

export default nextConfig;