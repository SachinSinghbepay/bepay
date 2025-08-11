import Image from "next/image";

export function CryptoWalletView() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white ">
      <Image
        src="/mockup.png"
        alt="Crypto Wallet UI"
        width={500} // adjust to match your design
        height={900} // adjust to match your design
        className="rounded-lg h-full -mt-8 w-full"
      />
    </div>
  );
}
