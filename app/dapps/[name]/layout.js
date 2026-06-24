import { DAPPS_DATA } from "@/lib/dappsData";

export async function generateMetadata({ params }) {
  const { name } = await params;
  const dappName = decodeURIComponent(name);
  const dapp = DAPPS_DATA.find((d) => d.name === dappName);

  if (!dapp) {
    return {
      title: "DApp Not Found | bepay",
      description: "This decentralized application could not be found on bepay.",
    };
  }

  const title = `${dapp.name} - bepay DApps`;
  const description = dapp.long_description || `Access ${dapp.name} directly from bepay. ${dapp.tag ? `Category: ${dapp.tag}.` : ""} Explore top decentralized applications on bepay.`;

  return {
    title,
    description,
    alternates: { canonical: `https://www.bepay.money/dapps/${encodeURIComponent(dapp.name)}` },
    openGraph: {
      title,
      description,
      url: `https://www.bepay.money/dapps/${encodeURIComponent(dapp.name)}`,
      siteName: "bepay",
      images: [{ url: "/pages/dapps-detail.png", width: 1200, height: 630, alt: `${dapp.name} on bepay` }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/pages/dapps-detail.png"],
    },
  };
}

export default function DappDetailLayout({ children }) {
  return children;
}
