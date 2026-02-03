import { cn } from "@/lib/utils"

const SectionTitle = ({ bigTitle, smallTitle, className, bigTitleClassName, smallTitleClassName }) => {
  return (
    <div className="pt-20">
      <div
        className={cn(
          "flex items-end bg-black text-white py-10 lg:py-16 flex-wrap justify-center gap-x-2 gap-y-1",
          className,
        )}
      >
        <h2
          className={cn(
            "font-alpino font-black uppercase text-[280px] leading-[0.9] max-w-full",
            "sm:text-5xl md:text-[180px] lg:text-[160px] xl:text-[280px]", // Ensure 280px at all breakpoints
            "text-5xl sm:text-6xl md:text-7xl", // Responsive fallback for very small screens
            bigTitleClassName,
          )}
        >
          {bigTitle}
        </h2>

        {smallTitle && (
          <span
            className={cn(
              "font-alpino font-bold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] leading-[0.9] mb-1 lg:mb-3 xl:mb-6",
              smallTitleClassName,
            )}
          >
            {smallTitle}
          </span>
        )}
      </div>
    </div>
  )
}

export default SectionTitle
