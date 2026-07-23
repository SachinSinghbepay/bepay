const SERVICE_PROVIDERS = [
  {
    provider:
      "Transak USA LLC / Transak Limited / Transak Canada Limited / Transak Sp. Z. O. O / Transak Australia Pty Limited / Transak Technology India Private Limited",
    service: "Crypto On-Ramp & Off-Ramp Infrastructure",
  },
  {
    provider: "Buyhatke Internet Private Limited / FINSTAR AI Sp. z.o.o",
    service: "Crypto On-Ramp & Off-Ramp Infrastructure",
  },
  {
    provider: "SR Saphirstein AG",
    service: "Swiss IBAN Accounts, Virtual Debit Cards & Banking Infrastructure",
  },
  {
    provider: "ChainFi Inc",
    service: "Bitcoin-backed Lending & Credit Infrastructure",
  },
  {
    provider: "Ratestellar Technologies Ltd",
    service: "Travel Booking Platform & Marketplace Infrastructure",
  },
  {
    provider: "IDT Corporation",
    service: "Digital Payments & Prepaid as a service platform",
  },
  {
    provider: "Rango Exchange",
    service: "Multi-chain Swap & Bridge Infrastructure",
  },
  {
    provider: "Ethena Labs",
    service: "Staking & Yield Infrastructure",
  },
  {
    provider: "Yellow Card Financial Inc.",
    service: "Africa Fiat & Stablecoin Payment Infrastructure",
  },
  {
    provider: "Palla Financial Inc.",
    service: "P2P Payments",
  },
  {
    provider: "Dinari Inc.",
    service: "Tokenized Stocks & Securities Infrastructure",
  },
  {
    provider: "Digital Gold India Private Limited",
    service: "Digital Gold Investment Infrastructure",
  },
  {
    provider: "MoneyGram International Inc.",
    service: "Global Cash-In / Cash-Out & Remittance Infrastructure",
  },
  {
    provider: "Didit Identity Spain, S.L / Didit Identity, Inc.",
    service: "KYB & Business Verification",
  },
  {
    provider: "Paxos Trust Company / Paxos Technology Solutions LLC",
    service: "Tokenized Gold, Stablecoin & Yield Infrastructure",
  },
  {
    provider: "BurjX MENA Ltd",
    service: "Digital Asset Exchange Infrastructure",
  },
  {
    provider: "IndiaIdeas.com Limited",
    service: "Payment Gateway & Bill Payment Infrastructure",
  },
  {
    provider: "Linklogis International",
    service: "Cross-border supply chain and Trade finance solutions",
  },
  {
    provider: "Betur Inc / DCPay Philippines, Inc",
    service: "Philippines Digital Wallet & Local Payment Infrastructure",
  },
  {
    provider: "Simplify Infotech Private Limited",
    service: "Crypto Tax Reporting & Portfolio Infrastructure",
  },
  {
    provider: "Pimlico Labs",
    service: "Flex Gas",
  },
];

export default function ServiceProvidersContent() {
  return (
    <div className="w-full py-8 space-y-8 text-justify">
      <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#080808]">
        <p>
          At bepay money, we collaborate with regulated financial
          institutions, payment service providers, banking partners, card
          issuers, digital asset infrastructure providers, compliance
          providers, and technology companies to deliver products and
          services across the bepay money ecosystem.
        </p>
        <p>
          These organizations are independent legal entities operating under
          their own licenses, regulatory authorizations, and terms of
          service. Services provided by these providers remain the sole
          responsibility of the respective organization. Unless expressly
          stated otherwise, bepay money acts as a technology platform and
          integration layer and is not the issuer, custodian, operator, or
          provider of services offered by these independent partners.
        </p>
        <p>
          The following list is provided for transparency and may be updated
          from time to time as new partnerships are established or existing
          integrations evolve.
        </p>
      </div>

      <div className="overflow-x-auto border border-[#080808]/15 rounded-lg">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-[#f1f1f1]">
              <th className="border-b border-[#080808]/15 px-4 py-3 text-sm md:text-base font-bold text-[#080808] w-1/2">
                Service Provider
              </th>
              <th className="border-b border-[#080808]/15 px-4 py-3 text-sm md:text-base font-bold text-[#080808] w-1/2">
                Service Offered
              </th>
            </tr>
          </thead>
          <tbody>
            {SERVICE_PROVIDERS.map(({ provider, service }, index) => (
              <tr
                key={provider}
                className={index % 2 === 1 ? "bg-[#f9f9f9]" : "bg-white"}
              >
                <td className="border-b border-[#080808]/10 px-4 py-3 text-sm md:text-base font-semibold text-[#080808] align-top">
                  {provider}
                </td>
                <td className="border-b border-[#080808]/10 px-4 py-3 text-sm md:text-base text-[#080808] align-top">
                  {service}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
