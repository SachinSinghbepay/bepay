"use client"

import { useEffect, useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image" // 1. Import next/image

const StripedBorder = ({
  imageSrc,
  alt = "",
  width = 742,
  height = 661,
  borderWidth = 4,
  lineWidth = 8,
  lineSpacing = 20,
  lineAngle = 53.69414046900356,
  showTop = false,
  showRight = false,
  showBottom = true,
  showLeft = true,
  className = "",
}) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  // This useEffect remains unchanged, it just creates the striped background
  useEffect(() => {
    if (!containerRef.current || !isInView) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const angleRad = (lineAngle * Math.PI) / 180
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = lineWidth

    const diagonalLength = Math.sqrt(
      canvas.width * canvas.width + canvas.height * canvas.height
    )
    const totalLines = Math.ceil(diagonalLength / lineSpacing) * 2
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = diagonalLength / 2

    for (let i = -totalLines / 2; i < totalLines / 2; i++) {
      const offset = i * lineSpacing
      const startX = centerX + offset * Math.cos(angleRad + Math.PI / 2)
      const startY = centerY + offset * Math.sin(angleRad + Math.PI / 2)
      const endX = startX + radius * Math.cos(angleRad)
      const endY = startY + radius * Math.sin(angleRad)
      const startX2 = startX - radius * Math.cos(angleRad)
      const startY2 = startY - radius * Math.sin(angleRad)

      ctx.beginPath()
      ctx.moveTo(startX2, startY2)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }

    if (containerRef.current) {
      const dataUrl = canvas.toDataURL("image/png")
      containerRef.current.style.backgroundImage = `url(${dataUrl})`
      containerRef.current.style.backgroundSize = "cover"
      containerRef.current.style.backgroundPosition = "center"
    }
  }, [isInView, width, height, lineWidth, lineSpacing, lineAngle])

  const paddingStyles = {
    paddingTop: showTop ? `${borderWidth}px` : "0px",
    paddingRight: showRight ? `${borderWidth}px` : "0px",
    paddingBottom: showBottom ? `${borderWidth}px` : "0px",
    paddingLeft: showLeft ? `${borderWidth}px` : "0px",
  }

  return (
    <div
      ref={containerRef}
      // 2. Added `relative` here
      className={`relative aspect-[${width}/${height}] w-full h-auto rounded-sm shadow-lg transform transition-all duration-700 ${className}`}
      style={{
        ...paddingStyles,
        minHeight: "300px",
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        // For optimal performance, add a 'sizes' prop based on your layout
        // e.g., sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}

export default StripedBorder