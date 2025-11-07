// app/register/metadata.js (NEW FILE)

export const metadata = {
  // Essential tags for the link preview
  title: 'bepay - Stablecoin Payment, Wallet, Merchant Payment',
  description: 'A simple and secure way to pay your bills. Spend Crypto Like Cash.',
  
  // Open Graph (OG) tags for WhatsApp, Facebook, etc.
  openGraph: {
    title: 'bepay - Stablecoin Payment, Wallet, Merchant Payment',
    description: 'A simple and secure way to pay your bills. Spend Crypto Like Cash.',
    url: 'https://www.bepay.money/', 
    siteName: 'bepay',
    images: [
      {
        url: '/thumbnail.png', // Update this absolute URL!
        width: 1200,
        height: 630,
        alt: 'bepay - Spend Crypto Like Cash',
      },
    ],
    type: 'website',
  },
  
  // Twitter Card tags 
  twitter: {
    card: 'summary_large_image',
    title: 'bepay - Stablecoin Payment, Wallet, Merchant Payment',
    description: 'A simple and secure way to pay your bills. Spend Crypto Like Cash.',
    images: ["/thumbnail.png"],
  },
};