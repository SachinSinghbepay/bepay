export const metadata = {
  title: "All Networks - bepay | Supported Blockchain Networks",
  description: "Explore all blockchain networks supported by bepay including Ethereum, Solana, Polygon, Arbitrum, Avalanche, Base, and Tron for stablecoin payments.",
  alternates: { canonical: "https://www.bepay.money/allNetworks" },
  openGraph: {
    title: "All Networks - bepay | Supported Blockchain Networks",
    description: "Explore all blockchain networks supported by bepay including Ethereum, Solana, Polygon, Arbitrum, Avalanche, Base, and Tron for stablecoin payments.",
    url: "https://www.bepay.money/allNetworks",
    siteName: "bepay",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630, alt: "bepay Supported Networks" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Networks - bepay | Supported Blockchain Networks",
    description: "Explore all blockchain networks supported by bepay.",
    images: ["/thumbnail.png"],
  },
};

export default function AllNetworksLayout({ children }) {
  return children;
}
