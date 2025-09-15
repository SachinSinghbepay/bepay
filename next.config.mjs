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
};

export default nextConfig;