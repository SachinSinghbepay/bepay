import ProgramCard from "./program-card";

const programs = [
  {
    title: "Financial Inclusion",
    description:
      "Ensuring everyone has access to essential financial tools and knowledge.",
    points: [
      "Community training on basic financial services.",
      "Support for self-help groups and local entrepreneurs.",
      "Financial literacy sessions in local languages.",
      "Awareness programs for safe savings and borrowing practices.",
    ],
    buttonText: "Partner with us",
    buttonLink: "#",
    imageSrc: "/images/foundation/core1.png",
    imageAlt: "Woman speaking at a conference",
  },
  {
    title: "Educational Empowerment",
    description:
      "Helping young minds reach their full potential through access, opportunity, and support.",
    points: [
      "Scholarships for deserving students.",
      "Free skill-building programs in underserved regions.",
      "Career guidance and life skills training.",
      "School infrastructure and learning material support.",
    ],
    buttonText: "Apply now",
    buttonLink: "#",
    imageSrc: "/images/foundation/core2.png",
    imageAlt: "Three graduates in caps and gowns",
  },
  {
    title: "Healthcare Access",
    description:
      "Bringing quality healthcare closer to communities that need it most.",
    points: [
      "Health awareness and screening camps.",
      "Support for local clinics and health workers.",
      "Menstrual hygiene education for young girls.",
      "Mental health awareness in schools and colleges.",
    ],
    buttonText: "Get involved",
    buttonLink: "#",
    imageSrc: "/images/foundation/core3.png",
    imageAlt: "Healthcare professional examining a child",
  },
  {
    title: "Women Empowerment",
    description:
      "Uplifting women and girls through access to resources, training, and leadership opportunities.",
    points: [
      "Grants and support for women-led ventures.",
      "Mentorship programs for aspiring women leaders.",
      "Financial education for women in rural areas.",
      "Training programs for women entrepreneurs.",
    ],
    buttonText: "Join the program",
    buttonLink: "#",
    imageSrc: "/images/foundation/core6.png",
    imageAlt: "Young girl smiling with arms crossed",
  },
  {
    title: "Environmental Sustainability",
    description:
      "Promoting a greener tomorrow through sustainable practices and community engagement.",
    points: [
      "Awareness campaigns on environmental conservation.",
      "Community-based recycling and clean-up projects.",
      "Green initiatives in schools and local institutions.",
      "Encouraging paperless processes and responsible habits.",
    ],
    buttonText: "View impact",
    buttonLink: "#",
    imageSrc: "/images/foundation/core4.png",
    imageAlt: "Man holding a 'NO PLASTIC' sign",
  },
  {
    title: "Livelihood & Economic Development",
    description:
      "Strengthening communities by building skills, boosting entrepreneurship, and supporting small businesses.",
    points: [
      "Training programs for local job readiness.",
      "Support for artisans, farmers, and micro-businesses.",
      "Community development projects linked with skill training.",
      "Market access and capacity-building support.",
    ],
    buttonText: "Partner with us",
    buttonLink: "#",
    imageSrc: "/images/foundation/core5.png",
    imageAlt: "People attending a presentation in an office",
  },
];

export default function CoreProgramsSection() {
  return (
    <section className="w-full bg-[#f9f9f9] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-12 text-start">
          <h2 className="text-4xl font-bold tracking-tight text-[#080808] sm:text-5xl">
            Our Core Programs
          </h2>
          <p className="mt-6 text-xl font-medium md:text-2xl text-[#6A6A6A]">
            Six comprehensive initiatives driving meaningful change across
            communities worldwide
          </p>
        </div>
        <div className="space-y-16">
          {programs.map((program, index) => (
            <ProgramCard
              key={program.title}
              title={program.title}
              description={program.description}
              points={program.points}
              buttonText={program.buttonText}
              buttonLink={program.buttonLink}
              imageSrc={program.imageSrc}
              imageAlt={program.imageAlt}
              imageOnLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
