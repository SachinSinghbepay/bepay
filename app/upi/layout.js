export const metadata = {
  title: "UPI Payments - bepay | Pay with UPI via Stablecoins",
  description: "Use bepay to make UPI payments seamlessly using stablecoins. Fast, secure, and low-cost digital payments for India and beyond.",
  alternates: { canonical: "https://www.bepay.money/upi" },
  openGraph: {
    title: "UPI Payments - bepay | Pay with UPI via Stablecoins",
    description: "Use bepay to make UPI payments seamlessly using stablecoins. Fast, secure, and low-cost digital payments for India and beyond.",
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
  return children;
}
