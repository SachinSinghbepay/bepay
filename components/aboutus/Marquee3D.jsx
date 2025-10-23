import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image"; // 1. Import next/image

const reviews = [
  {
    img: "/images/aboutus/m1.png",
  },
  {
    img: "/images/aboutus/m2.png",
  },
  {
    img: "/images/aboutus/m3.png",
  },
  {
    img: "/images/aboutus/m4.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

// 2. Define thirdRow and fourthRow to fix the error
// (Here, just re-using the same data for demonstration)
const thirdRow = reviews.slice(0, reviews.length / 2);
const fourthRow = reviews.slice(reviews.length / 2);

// 3. Update ReviewCard to use next/Image
const ReviewCard = ({ img }) => {
  return (
    <Image
      className="rounded-full"
      width={32} // Pass width as a number
      height={32} // Pass height as a number
      alt=""
      src={img}
    />
  );
};

export function Marquee3D() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.img} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.img} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.img} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.img} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}