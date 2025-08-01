"use client";

export default function DisclaimerContent() {
  return (
    <div className="max-w-[979px] py-8 space-y-12">
      {/* Disclaimer Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#080808] mb-6">Disclaimer:</h2>
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#080808]">
          <p>
            <span className="font-semibold">bepay</span> functions as a
            non-custodial Web3 wallet, created by the{" "}
            <span className="font-semibold">bepay</span> group of companies,
            which operates across various jurisdictions.{" "}
            <span className="font-semibold">bepay</span> does not function as a
            credit institution, payment (initiation) institution, money
            transmitter business, cryptoasset service provider, or financial
            service provider, and does not possess user funds or private keys.
          </p>

          <p>
            The <span className="font-semibold">bepay</span> interface
            facilitates user interaction with decentralised ledger technologies
            (DLTs) and third-party platforms through the utilisation of
            open-source public APIs. The{" "}
            <span className="font-semibold">bepay</span> group of companies
            currently holds a Virtual Asset Service Provider (VASP) registration
            in Lithuania, identified by Registration Number{" "}
            <span className="font-semibold">57-3505237-1383318</span>, which
            serves as the main entity for the EEA market.{" "}
            <span className="font-semibold">bepay</span> is also registered with
            FINCEN in the United States under Registration Number{" "}
            <span className="font-semibold">31000294520372</span>. Furthermore,
            the group is actively seeking additional registrations and/or
            regulatory exemptions in India with the FIU.
          </p>

          <p>
            In the European Union, <span className="font-semibold">bepay</span>{" "}
            ensured voluntary compliance with DORA and also applied for MiCA
            regulatory exemptions in each Member State. The legal opinion
            secured by <span className="font-semibold">bepay</span> (Group)
            highlights and clearly establishes the exempted status of this
            decentralized application and the principles to be respected in
            order to benefit out of such exemptions under MiCA.
          </p>

          <p>
            The <span className="font-semibold">bepay</span> group has obtained
            and maintains relevant ISO (International Organization for
            Standardization) certifications to ensure high standards of
            information security, data management, and operational resilience.
            These certifications, such as{" "}
            <span className="font-semibold">ISO 9001, 20022, and 27001</span>{" "}
            (latest versions), reflect internal best practices but do not imply
            financial regulatory authorization or supervisory approval. Such ISO
            certifications are complementary to DORA, but they do not replace
            the need for compliance with the Regulation in the EU. Nonetheless,{" "}
            <span className="font-semibold">bepay</span> is currently exempted
            under DORA in line with our secured legal opinion on the basis of
            Article 3 (60), (63), and (64) of the Regulation.
          </p>

          <p>
            All interactions conducted through{" "}
            <span className="font-semibold">bepay</span> are subject to
            applicable regulatory standards. It is the responsibility of users
            to ensure adherence to the local laws that govern the use of digital
            assets, local restrictions (if any), and domestic tax laws. The
            control of digital assets is retained by the user, and such assets
            are neither held nor accessed by{" "}
            <span className="font-semibold">bepay</span>. Custody and fiat
            services are voluntarily decided upon by{" "}
            <span className="font-semibold">bepay</span> (Group) and rendered by
            licensed third-party partners (where applicable).
          </p>

          <p>
            Deposits in fiat currency may be subject to insurance coverage up to
            the legally established limits provided by the relevant financial
            institutions and according to international, European, national, or
            state law (where applicable).
          </p>

          <p>
            The use of the <span className="font-semibold">bepay</span> wallet
            constitutes an explicit acceptance of the terms herein and a
            recognition of all inherent risks associated with the use of digital
            assets and decentralised systems.
          </p>
        </div>
      </section>
    </div>
  );
}
