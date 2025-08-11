"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"



export default function ProgramCard({
  title,
  description,
  points,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  imageOnLeft,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 }) 

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="bg-white rounded-3xl shadow-custom-card justify-between drop-shadow-2xl p-4  flex flex-col lg:flex-row items-center gap-6 lg:gap-12"
    >
      <div className={`w-full lg:w-1/3  flex justify-center ${imageOnLeft ? "order-first" : "order-last"}`}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          width={500}
          height={500}
          alt={imageAlt}
          className="rounded-3xl object-cover w-full h-auto max-h-[400px] lg:max-h-[500px]"
        />
      </div>
      <div className="w-full max-w-[650px] lg:px-8 space-y-6">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h3>
        <div className="h-[1px] w-full bg-gray-200" /> {/* Separator line */}
        <p className="text-sm lg:text-[16px] font-medium leading-[32px] tracking-normal text-[#080808]">{description}</p>
        <ul className="list-none space-y-3 lg:space-y-5 pl-0">
          {points.map((point, index) => (
            <li key={index} className="flex font-semibold items-start text-[16px] leading-[32px] tracking-normal text-[#080808]">
              <span className="mr-2 text-xl  text-[#080808]">•</span> {point}
            </li>
          ))}
        </ul>
        {/* <Link href={buttonLink} passHref>
          <Button
            variant="default"
            className="rounded-full cursor-pointer bg-black px-8 py-6 text-[12px] font-medium text-white hover:bg-black/90"
          >
            {buttonText}
          </Button>
        </Link> */}
      </div>
    </motion.div>
  )
}
