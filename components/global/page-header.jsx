import SectionTitle from "./section-title"


const PageHeader = ({ title, smallTitle, className = "", titleClassName = "" }) => {
  return (
    <div className={`relative w-full h-auto border-b border-white/15 lg:h-[400px] xl:h-[600px] bg-black overflow-hidden ${className}`}>
      {/* Grid Background with Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%),
            linear-gradient(90deg, rgba(255, 255, 255, 0.09) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255, 255, 255, 0.09) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 50px 50px, 50px 50px",
        }}
      />

      

      {/* Title */}
      <div className="relative z-10">
        <SectionTitle
          bigTitle={title}
          smallTitle={smallTitle}
          className="bg-transparent"
          bigTitleClassName={titleClassName}
        />
      </div>
    </div>
  )
}

// Reusable Decorative Marks Component


export default PageHeader
