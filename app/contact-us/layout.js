export const metadata = {
  title: "Contact Us - bepay | Get in Touch",
  description: "Have questions about bepay? Contact our support team for help with payments, accounts, integrations, or partnerships.",
  alternates: { canonical: "https://www.bepay.money/contact-us" },
  openGraph: {
    title: "Contact Us - bepay | Get in Touch",
    description: "Have questions about bepay? Contact our support team for help with payments, accounts, integrations, or partnerships.",
    url: "https://www.bepay.money/contact-us",
    siteName: "bepay",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630, alt: "Contact bepay" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - bepay | Get in Touch",
    description: "Have questions about bepay? Contact our support team.",
    images: ["/thumbnail.png"],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
