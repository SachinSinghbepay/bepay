export const metadata = {
  title: "Business Payments - bepay | Accept Crypto, Pay Globally",
  description: "Accept stablecoin payments and manage cross-border payouts with bepay for Business. Reduce fees, settle instantly, and integrate with your existing workflow.",
  alternates: { canonical: "https://www.bepay.money/business" },
  openGraph: {
    title: "Business Payments - bepay | Accept Crypto, Pay Globally",
    description: "Accept stablecoin payments and manage cross-border payouts with bepay for Business. Reduce fees, settle instantly, and integrate with your existing workflow.",
    url: "https://www.bepay.money/business",
    siteName: "bepay",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630, alt: "bepay Business Payments" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Payments - bepay | Accept Crypto, Pay Globally",
    description: "Accept stablecoin payments and manage cross-border payouts with bepay for Business.",
    images: ["/thumbnail.png"],
  },
};

export default function BusinessLayout({ children }) {
  return children;
}
