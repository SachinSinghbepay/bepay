"use client";

export default function DisclaimerContent() {
  return (
    <div className="max-w-[979px] py-8 space-y-12">
      {/* Mobile/Tablet Version (up to lg) */}
      <section className="block lg:hidden space-y-6">
        <h2 className="text-xl font-bold text-[#080808] mb-6">Disclaimer:</h2>
        <div className="text-base leading-relaxed text-[#080808]">
          <p>
            bepay money is a non-custodial Web3 wallet created, developed, and
            maintained by the bepay money group. We are not a credit institution,
            investment firm, CASP (MiCA), or payment (initiating) service
            provider, and do not hold user funds at any point in time.
            Registered VASP in Lithuania (Reg. No.{" "}
            <span className="font-semibold">57-3505237-1383318</span>) and with
            FINCEN USA (Reg. No.{" "}
            <span className="font-semibold">31000294520372</span>). Additional
            registrations/exemptions are in progress with FIU India and all EU
            regulators. Interactions occur via open APIs with third-party
            platforms. Custody and fiat services are provided by regulated
            partners by a voluntary decision of bepay money (Group) (where
            applicable). Users remain solely responsible for compliance with any
            local laws, restrictions, and tax laws. Fiat deposits may be insured
            by licensed partner institutions where applicable. Use of bepay money
            implies acceptance of the terms, conditions, ethical standards,
            applicable laws, and associated risks.
          </p>
        </div>
      </section>
  
      {/* Desktop Version (lg and above) */}
      <section className="hidden lg:block space-y-6">
        <h2 className="text-xl font-bold text-[#080808] mb-6">Disclaimer:</h2>
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>
            bepay money functions as a non-custodial Web3 wallet, created by the bepay money
            group of companies, which operates across various jurisdictions.
            bepay money does not function as a credit institution, payment
            (initiation) institution, money transmitter business, cryptoasset
            service provider, or financial service provider, and does not
            possess user funds or private keys.
          </p>
          <p>
            The bepay money interface facilitates user interaction with decentralised
            ledger technologies (DLTs) and third-party platforms through the
            utilisation of open-source public APIs. The bepay money group of companies
            currently holds a Virtual Asset Service Provider (VASP) registration
            in Lithuania, identified by Registration Number{" "}
            <span className="font-semibold">57-3505237-1383318</span>, which
            serves as the main entity for the EEA market. bepay money is also
            registered with FINCEN in the United States under Registration
            Number <span className="font-semibold">31000294520372</span>.
            Furthermore, the group is actively seeking additional registrations
            and/or regulatory exemptions in India with the FIU.
          </p>
          <p>
            In the European Union, bepay money ensured voluntary compliance with DORA
            and also applied for MiCA regulatory exemptions in each Member
            State. The legal opinion secured by bepay money (Group) highlights and
            clearly establishes the exempted status of this decentralized
            application and the principles to be respected in order to benefit
            out of such exemptions under MiCA.
          </p>
          <p>
            The bepay money group has obtained and maintains relevant ISO
            (International Organization for Standardization) certifications to
            ensure high standards of information security, data management, and
            operational resilience. These certifications, such as{" "}
            <span className="font-semibold">ISO 9001, 20022, and 27001</span>{" "}
            (latest versions), reflect internal best practices but do not imply
            financial regulatory authorization or supervisory approval. Such ISO
            certifications are complementary to DORA, but they do not replace
            the need for compliance with the Regulation in the EU. Nonetheless,
            bepay money is currently exempted under DORA in line with our secured
            legal opinion on the basis of Article 3 (60), (63), and (64) of the
            Regulation.
          </p>
          <p>
            All interactions conducted through bepay money are subject to applicable
            regulatory standards. It is the responsibility of users to ensure
            adherence to the local laws that govern the use of digital assets,
            local restrictions (if any), and domestic tax laws. The control of
            digital assets is retained by the user, and such assets are neither
            held nor accessed by bepay money. Custody and fiat services are
            voluntarily decided upon by bepay money (Group) and rendered by licensed
            third-party partners (where applicable).
          </p>
          <p>
            Deposits in fiat currency may be subject to insurance coverage up to
            the legally established limits provided by the relevant financial
            institutions and according to international, European, national, or
            state law (where applicable).
          </p>
          <p>
            The use of the bepay money wallet constitutes an explicit acceptance of
            the terms herein and a recognition of all inherent risks associated
            with the use of digital assets and decentralised systems.
          </p>
        </div>
      </section>
    </div>
  );
}
