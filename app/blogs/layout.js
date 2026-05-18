export const metadata = {
  title: "Blog - bepay | Crypto, Payments & Fintech Insights",
  description: "Explore bepay's blog for the latest insights on stablecoin payments, crypto trends, DeFi, cross-border transfers, and fintech innovation.",
  alternates: { canonical: "https://www.bepay.money/blogs" },
  openGraph: {
    title: "Blog - bepay | Crypto, Payments & Fintech Insights",
    description: "Explore bepay's blog for the latest insights on stablecoin payments, crypto trends, DeFi, cross-border transfers, and fintech innovation.",
    url: "https://www.bepay.money/blogs",
    siteName: "bepay",
    images: [{ url: "/pages/blogs.png", width: 1200, height: 630, alt: "bepay Blog" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - bepay | Crypto, Payments & Fintech Insights",
    description: "Explore bepay's blog for the latest insights on stablecoin payments, crypto trends, DeFi, and fintech innovation.",
    images: ["/pages/blogs.png"],
  },
};

export default function BlogsLayout({ children }) {
  return children;
}
