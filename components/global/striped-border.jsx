"use client"

import { useEffect, useRef } from "react"
import { useInView } from "framer-motion"


const StripedBorder = ({
  imageSrc,
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

  useEffect(() => {
    if (!containerRef.current || !isInView) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Draw black background
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate angle in radians
    const angleRad = (lineAngle * Math.PI) / 180

    // Draw white diagonal stripes
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = lineWidth

    // Calculate spacing for diagonal lines based on angle
    const diagonalLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
    const totalLines = Math.ceil(diagonalLength / lineSpacing) * 2

    // Calculate start and end points for the lines
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = diagonalLength / 2

    for (let i = -totalLines / 2; i < totalLines / 2; i++) {
      const offset = i * lineSpacing

      // Calculate start and end points for the line
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

    // Create image element
    const img = new Image()
    img.src = imageSrc
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // Calculate padding based on which sides should have borders
      const paddingLeft = showLeft ? borderWidth : 0
      const paddingTop = showTop ? borderWidth : 0
      const paddingRight = showRight ? borderWidth : 0
      const paddingBottom = showBottom ? borderWidth : 0

      // Calculate image dimensions
      const imgWidth = canvas.width - paddingLeft - paddingRight
      const imgHeight = canvas.height - paddingTop - paddingBottom

      // Draw image with appropriate padding
      ctx.drawImage(img, paddingLeft, paddingTop, imgWidth, imgHeight)

      // Apply the canvas as background
      if (containerRef.current) {
        const dataUrl = canvas.toDataURL("image/png")
        containerRef.current.style.backgroundImage = `url(${dataUrl})`
        containerRef.current.style.backgroundSize = "cover"
        containerRef.current.style.backgroundPosition = "center"
      }
    }
  }, [
    isInView,
    imageSrc,
    width,
    height,
    borderWidth,
    lineWidth,
    lineSpacing,
    lineAngle,
    showTop,
    showRight,
    showBottom,
    showLeft,
  ])

  return (
    <div
      ref={containerRef}
      className={`aspect-[${width}/${height}] w-full h-auto rounded-sm shadow-lg transform transition-all duration-700 ${className}`}
      style={{
        minHeight: "300px",
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
      }}
    />
  )
}

export default StripedBorder
