export const metadata = {
  title: "Crypto Airdrops - bepay | Discover & Claim Token Airdrops",
  description: "Discover the latest crypto airdrops on bepay. Find and claim free token distributions from top blockchain projects across multiple networks.",
  alternates: { canonical: "https://www.bepay.money/airdrops" },
  openGraph: {
    title: "Crypto Airdrops - bepay | Discover & Claim Token Airdrops",
    description: "Discover the latest crypto airdrops on bepay. Find and claim free token distributions from top blockchain projects across multiple networks.",
    url: "https://www.bepay.money/airdrops",
    siteName: "bepay",
    images: [{ url: "/pages/airdrops.png", width: 1200, height: 630, alt: "bepay Crypto Airdrops" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Airdrops - bepay | Discover & Claim Token Airdrops",
    description: "Discover the latest crypto airdrops on bepay.",
    images: ["/pages/airdrops.png"],
  },
};

export default function AirdropsLayout({ children }) {
  return children;
}
