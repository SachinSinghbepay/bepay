const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bepay.money" },
    { "@type": "ListItem", position: 2, name: "UPI Payments", item: "https://www.bepay.money/upi" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I make UPI payments with bepay?", acceptedAnswer: { "@type": "Answer", text: "Simply link your UPI ID in the bepay app and use your stablecoin balance to pay any UPI handle instantly — no bank account needed." } },
    { "@type": "Question", name: "What currencies can I use for UPI payments?", acceptedAnswer: { "@type": "Answer", text: "bepay converts your stablecoins (USDC, USDT) to INR in real time for UPI payments, giving you competitive exchange rates." } },
    { "@type": "Question", name: "Are UPI payments via bepay instant?", acceptedAnswer: { "@type": "Answer", text: "Yes, UPI payments are processed in real time. Funds arrive at the recipient's account within seconds." } },
    { "@type": "Question", name: "Is there a limit on UPI transactions with bepay?", acceptedAnswer: { "@type": "Answer", text: "Limits depend on your account verification level and UPI network rules. Standard UPI limits of ₹1 lakh per transaction apply." } },
    { "@type": "Question", name: "Is bepay's UPI payment service available outside India?", acceptedAnswer: { "@type": "Answer", text: "bepay lets users globally fund their wallet with stablecoins and make UPI payments to recipients in India." } },
  ],
};

export const metadata = {
  title: "UPI Payments - bepay | Pay with UPI via Stablecoins",
  description: "Pay any UPI ID using USDT or USDC with bepay. Fast, low-cost crypto to UPI payments from anywhere in the world — no bank account needed.",
  alternates: { canonical: "https://www.bepay.money/upi" },
  openGraph: {
    title: "UPI Payments - bepay | Pay with UPI via Stablecoins",
    description: "Pay any UPI ID using USDT or USDC with bepay. Fast, low-cost crypto to UPI payments from anywhere in the world — no bank account needed.",
    url: "https://www.bepay.money/upi",
    siteName: "bepay",
    images: [{ url: "/pages/upi.png", width: 1200, height: 630, alt: "bepay UPI Payments" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UPI Payments - bepay | Pay with UPI via Stablecoins",
    description: "Use bepay to make UPI payments seamlessly using stablecoins.",
    images: ["/pages/upi.png"],
  },
};

export default function UpiLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
