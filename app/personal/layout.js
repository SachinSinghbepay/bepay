export const metadata = {
  title: "Personal Wallet - bepay | Crypto & Stablecoin Payments",
  description: "Manage your crypto with bepay's personal wallet. Send and receive stablecoins, earn DeFi yields, and pay bills globally — securely from one app.",
  alternates: { canonical: "https://www.bepay.money/personal" },
  openGraph: {
    title: "Personal Wallet - bepay | Crypto & Stablecoin Payments",
    description: "Manage your crypto with bepay's personal wallet. Send and receive stablecoins, earn DeFi yields, and pay bills globally — securely from one app.",
    url: "https://www.bepay.money/personal",
    siteName: "bepay",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630, alt: "bepay Personal Wallet" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Wallet - bepay | Crypto & Stablecoin Payments",
    description: "Manage your crypto with bepay's personal wallet. Send and receive stablecoins, earn DeFi yields, and pay bills globally.",
    images: ["/thumbnail.png"],
  },
};

export default function PersonalLayout({ children }) {
  return (
    <>
      <link rel="preload" as="image" href="/logo.png" />
      {children}
    </>
  );
}
