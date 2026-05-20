export const metadata = {
  title: "bepay Foundation | Building Financial Inclusion Globally",
  description: "The bepay Foundation drives financial inclusion through education, community programs, and technology. Join our mission to make global finance accessible to everyone.",
  alternates: { canonical: "https://www.bepay.money/bepay-foundations" },
  openGraph: {
    title: "bepay Foundation | Building Financial Inclusion Globally",
    description: "The bepay Foundation drives financial inclusion through education, community programs, and technology. Join our mission to make global finance accessible to everyone.",
    url: "https://www.bepay.money/bepay-foundations",
    siteName: "bepay",
    images: [{ url: "/pages/bepay-foundation.jpeg", width: 1200, height: 630, alt: "bepay Foundation" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bepay Foundation | Building Financial Inclusion Globally",
    description: "The bepay Foundation drives financial inclusion through education, community programs, and technology.",
    images: ["/pages/bepay-foundation.jpeg"],
  },
};

export default function FoundationLayout({ children }) {
  return children;
}
