export const metadata = {
  title: "Service Providers - bepay",
  description:
    "A transparent list of the independent third-party service providers bepay money works with across banking, on/off-ramp, custody, and other infrastructure.",
  alternates: { canonical: "https://www.bepay.money/service-providers" },
};

import HeaderContent from "@/components/privacy-policy/HeaderContent";
import ServiceProvidersContent from "@/components/privacy-policy/ServiceProvidersContent";

const page = () => {
  return (
    <section className="bg-[#f9f9f9]">
      <div className="py-20 max-w-7xl mx-auto px-4">
        <HeaderContent heading={"Service Providers"} />
        <ServiceProvidersContent />
      </div>
    </section>
  );
};

export default page;
