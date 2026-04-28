"use client";

export default function DisclaimerContent() {
  return (
    <div className="w-full py-8 space-y-12 text-justify">
      {/* Mobile/Tablet Version (up to lg) */}
      <section className="block lg:hidden space-y-6">
        <h2 className="text-xl font-bold text-[#080808] mb-6">Disclaimer:</h2>
        <div className="text-base leading-relaxed text-[#080808]">
          <p>
            bepay money functions as a next-generation payment infrastructure
            designed to support seamless value transfer across countries,
            currencies, and financial systems. bepay money does not function as
            a credit institution, payment (initiation) institution, money
            transmitter business, cryptoasset service provider, or financial
            service provider, and does not possess user funds or private keys.
            The bepay money group operates through several entities globally,
            including registrations in Romania (CUI:{" "}
            <span className="font-semibold">52474864</span>), India, Dubai
            (DLT-related license), the United States (MSB with FinCEN), Canada
            (MSB and PSP), and the British Virgin Islands. Interactions occur
            via open-source public APIs with decentralised ledger technologies
            and third-party platforms. Custody, settlement, and fiat services
            are provided by regulated third-party partners where applicable.
            ISO certifications (ISO 9001, ISO 20022, ISO 27001) reflect
            internal best practices but do not imply financial regulatory
            authorization. Users, merchants, and partners remain solely
            responsible for compliance with local laws, restrictions, and tax
            laws. Fiat deposits may be insured by licensed partner institutions
            where applicable. Use of bepay money implies acceptance of the
            terms, conditions, and associated risks.
          </p>
        </div>
      </section>

      {/* Desktop Version (lg and above) */}
      <section className="hidden lg:block space-y-6">
        <h2 className="text-xl font-bold text-[#080808] mb-6">Disclaimer:</h2>
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>
            bepay money functions as a next-generation payment infrastructure
            designed to support seamless value transfer across countries,
            currencies, and financial systems. The bepay money ecosystem includes
            digital products and technological solutions such as the bepay money user
            application, the bepay money merchant application, and the IGPS
            cross-border payment infrastructure. bepay money money does not function
            as a credit institution, payment (initiation) institution, money
            transmitter business, cryptoasset service provider, or financial
            service provider, and does not possess user funds or private keys.
          </p>
          <p>
            The bepay money interface facilitates user interaction with
            decentralised ledger technologies (DLTs) and third-party platforms
            through the utilisation of open-source public APIs. The bepay money user
            application enables individuals to interact with digital assets and
            payment functionalities through a non-custodial wallet environment
            where users retain full control over their private keys and digital
            assets. The bepay money merchant application provides technological tools
            that enable merchants to accept and manage digital asset payments
            and related transaction data within their business environments. The
            IGPS cross-border infrastructure facilitates technological
            connectivity that supports cross-border transaction messaging,
            settlement coordination, and multi-currency payment interactions
            through integrated financial networks and supported partners.
          </p>
          <p>
            The bepay money group operates through several entities globally,
            including bepay money Europe S.R.L registered in Romania with
            Unique Registration Code (CUI):{" "}
            <span className="font-semibold">52474864</span>, Bepay Technologies
            Private Limited in India, IGPS Technology LLC SCO in Dubai holding
            a DLT-related license, Bepay Fintech INC in the United States
            registered as a Money Services Business (MSB) with FinCEN,
            Directpay Fintech LTD in Canada holding MSB and Payment Service
            Provider (PSP) registrations, and Bepay Fintech Products Holding
            LTD in the British Virgin Islands. These entities support various
            operational, technological, regulatory, and partnership functions of
            the bepay money ecosystem across different jurisdictions.
          </p>
          <p>
            The bepay money platform may interact with licensed financial
            institutions, payment processors, custodians, and regulated service
            providers for certain payment processing, settlement, liquidity
            management, or fiat-related services associated with the bepay money
            merchant application or the IGPS cross-border infrastructure. Such
            services, where applicable, are provided by regulated third-party
            partners and not directly by bepay money.
          </p>
          <p>
            The bepay money group has obtained and maintains relevant ISO
            (International Organization for Standardization) certifications to
            ensure high standards of information security, data management, and
            operational resilience. These certifications, such as{" "}
            <span className="font-semibold">ISO 9001, ISO 20022, and ISO 27001</span>{" "}
            (latest versions), reflect internal best practices but do not imply
            financial regulatory authorization or supervisory approval.
          </p>
          <p>
            All interactions conducted through the bepay money ecosystem are subject
            to applicable regulatory standards. It is the responsibility of
            users, merchants, and partners to ensure adherence to the local
            laws that govern the use of digital assets, payment technologies,
            local restrictions (if any), and domestic tax laws. The control of
            digital assets within the non-custodial wallet environment is
            retained by the user, and such assets are neither held nor accessed
            by bepay money. Custody, settlement, and fiat services, where
            applicable, are rendered by licensed third-party partners.
          </p>
          <p>
            Deposits in fiat currency may be subject to insurance coverage up
            to the legally established limits provided by the relevant financial
            institutions and according to international, European, national, or
            state law (where applicable).
          </p>
          <p>
            The use of the bepay money wallet, merchant platform, IGPS
            infrastructure, or any related application or service within the
            bepay money ecosystem constitutes an explicit acceptance of the terms
            herein and a recognition of all inherent risks associated with the
            use of digital assets, decentralised systems, and cross-border
            payment technologies.
          </p>
        </div>
      </section>
    </div>
  );
}