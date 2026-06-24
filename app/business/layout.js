const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bepay.money" },
    { "@type": "ListItem", position: 2, name: "Business Payments", item: "https://www.bepay.money/business" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How quickly can I start accepting payments with bepay?", acceptedAnswer: { "@type": "Answer", text: "Within 24 hours post-verification. Most plugins are live in 15-30 minutes." } },
    { "@type": "Question", name: "Do I need to understand crypto to use bepay for business?", acceptedAnswer: { "@type": "Answer", text: "Not at all! Our platform handles all the technical complexity. You just need to set up your account and start accepting payments." } },
    { "@type": "Question", name: "Is there a monthly fee for bepay business?", acceptedAnswer: { "@type": "Answer", text: "No monthly fees! We only charge a small transaction fee when you receive payments. There are no setup costs, monthly subscriptions, or hidden charges." } },
    { "@type": "Question", name: "Which cryptocurrencies does bepay support?", acceptedAnswer: { "@type": "Answer", text: "We support all major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), USDC, USDT, and many more. Our platform automatically handles conversions and settlements." } },
    { "@type": "Question", name: "Does bepay offer customer support for businesses?", acceptedAnswer: { "@type": "Answer", text: "Yes! We provide 24/7 customer support through live chat, email, and phone." } },
  ],
};

export const metadata = {
  title: "Business Payments - bepay | Accept Crypto, Pay Globally",
  description: "Accept crypto and stablecoin payments with bepay for Business. Payment gateway for merchants — reduce fees, settle instantly, and integrate with your existing workflow.",
  alternates: { canonical: "https://www.bepay.money/business" },
  openGraph: {
    title: "Business Payments - bepay | Accept Crypto, Pay Globally",
    description: "Accept crypto and stablecoin payments with bepay for Business. Payment gateway for merchants — reduce fees, settle instantly, and integrate with your existing workflow.",
    url: "https://www.bepay.money/business",
    siteName: "bepay",
    images: [{ url: "/pages/business.jpeg", width: 1200, height: 630, alt: "bepay Business Payments" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Payments - bepay | Accept Crypto, Pay Globally",
    description: "Accept stablecoin payments and manage cross-border payouts with bepay for Business.",
    images: ["/pages/business.jpeg"],
  },
};

export default function BusinessLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
