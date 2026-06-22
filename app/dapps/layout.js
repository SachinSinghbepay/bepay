export const metadata = {
  title: "DApps - bepay | Explore Decentralized Applications",
  description: "Browse top decentralized apps (dApps) directly from bepay. Explore DeFi protocols, DEXes, lending platforms, and more across multiple blockchain networks.",
  alternates: { canonical: "https://www.bepay.money/dapps" },
  openGraph: {
    title: "DApps - bepay | Explore Decentralized Applications",
    description: "Browse top decentralized apps (dApps) directly from bepay. Explore DeFi protocols, DEXes, lending platforms, and more across multiple blockchain networks.",
    url: "https://www.bepay.money/dapps",
    siteName: "bepay",
    images: [{ url: "/pages/dapps.jpeg", width: 1200, height: 630, alt: "bepay DApps Explorer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DApps - bepay | Explore Decentralized Applications",
    description: "Browse and access top decentralized applications directly from bepay.",
    images: ["/pages/dapps.jpeg"],
  },
};

export default function DappsLayout({ children }) {
  return children;
}
