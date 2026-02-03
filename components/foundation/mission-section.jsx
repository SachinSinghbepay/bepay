import { Button } from "@/components/ui/button";

export default function MissionSection() {
  return (
    <section className="w-full bg-[#f9f9f9] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="space-y-8 text-gray-900">
          <p className="text-lg lg:text-2xl leading-[40px] tracking-[0.02em]">
            At <span className="font-bold">bepay foundation</span>, we are
            committed to building a better tomorrow by supporting inclusive,
            meaningful, and measurable change across communities. Our mission is
            to uplift lives through programs focused on education, healthcare,
            financial inclusion, women empowerment, environmental
            sustainability, and livelihood development.
          </p>
          <p className="text-lg lg:text-2xl leading-[40px] tracking-[0.02em]">
            We believe that real progress begins at the grassroots with the
            people. Our mission is to build a more inclusive future where
            opportunity, dignity, and progress are within everyone`&apos;s reach.
          </p>
          <p className="text-lg lg:text-2xl font-bold leading-[40px] tracking-[0.02em]">
            {
              "True transformation happens when communities are equipped to shape their future."
            }
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-start">
          <Button
            variant="outline"
            className="rounded-full cursor-pointer border-black px-8 py-6 text-[12px] font-medium text-black hover:bg-gray-100 bg-transparent"
          >
            Explore our impact
          </Button>
          <Button
            variant="default"
            className="rounded-full cursor-pointer bg-black px-8 py-6 text-[12px] font-medium text-white hover:bg-gray-800"
          >
            Partner with us
          </Button>
        </div>
      </div>
    </section>
  );
}
