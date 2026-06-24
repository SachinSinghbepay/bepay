const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bepay.money" },
    { "@type": "ListItem", position: 2, name: "Personal Wallet", item: "https://www.bepay.money/personal" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is bepay's personal wallet?", acceptedAnswer: { "@type": "Answer", text: "bepay's personal wallet lets you send, receive, and store stablecoins and cryptocurrencies securely. You can pay bills globally, earn DeFi yields, and manage your digital assets all in one app." } },
    { "@type": "Question", name: "Is bepay's personal wallet free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, creating and maintaining your bepay personal wallet is free. Small transaction fees may apply for certain transfers." } },
    { "@type": "Question", name: "Which cryptocurrencies are supported?", acceptedAnswer: { "@type": "Answer", text: "bepay supports major stablecoins (USDC, USDT) and cryptocurrencies including Bitcoin and Ethereum, across multiple blockchain networks." } },
    { "@type": "Question", name: "How do I earn yields with bepay?", acceptedAnswer: { "@type": "Answer", text: "You can earn DeFi yields by depositing your stablecoins into bepay's yield products. Rates vary by asset and protocol." } },
    { "@type": "Question", name: "Is my money safe with bepay?", acceptedAnswer: { "@type": "Answer", text: "Yes. bepay uses industry-standard security including multi-factor authentication, encrypted storage, and regulatory compliance to keep your funds secure." } },
  ],
};

export const metadata = {
  title: "Personal Wallet - bepay | Crypto & Stablecoin Payments",
  description: "Manage your crypto with bepay's personal wallet. Send and receive stablecoins, earn DeFi yields, and pay bills globally — securely from one app.",
  alternates: { canonical: "https://www.bepay.money/personal" },
  openGraph: {
    title: "Personal Wallet - bepay | Crypto & Stablecoin Payments",
    description: "Manage your crypto with bepay's personal wallet. Send and receive stablecoins, earn DeFi yields, and pay bills globally — securely from one app.",
    url: "https://www.bepay.money/personal",
    siteName: "bepay",
    images: [{ url: "/pages/personal.png", width: 1200, height: 630, alt: "bepay Personal Wallet" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Wallet - bepay | Crypto & Stablecoin Payments",
    description: "Manage your crypto with bepay's personal wallet. Send and receive stablecoins, earn DeFi yields, and pay bills globally.",
    images: ["/pages/personal.png"],
  },
};

export default function PersonalLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <link rel="preload" as="image" href="/logo.png" />
      {children}
    </>
  );
}
