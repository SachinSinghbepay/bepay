import { Skeleton } from "@/components/ui/skeleton"

export default function BlogCardSkeleton() {
  return (
<div className="flex flex-col w-[400px] h-[379px] bg-white rounded-[24px]
  overflow-hidden border border-gray-100 shadow-sm
  flex-shrink-0 snap-start">
      {/* Image Skeleton */}
      <div className="w-full h-[200px] relative">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col p-6 flex-grow">
        {/* Badge & Time */}
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title */}
        <Skeleton className="h-7 w-full mb-2" />
        <Skeleton className="h-7 w-3/4 mb-auto" />

        {/* Date */}
        <div className="mt-4">
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
      </div>
    </div>
  )
}
