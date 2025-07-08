import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function DriftExperienceCardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-1/2 mx-auto" />
        <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="relative overflow-hidden border border-black/20 bg-background backdrop-blur-sm">
            {/* Gradient Header Skeleton */}
            <div className="h-32 -mt-8 bg-gray-200 dark:bg-gray-800 relative">
              <div className="relative z-10 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-5 w-1/2 mt-1" />
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="flex items-center gap-4 text-sm">
                <Skeleton className="h-5 w-24" />
              </div>

              <div className="border-t pt-4 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <div className="border-t pt-4 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <Skeleton className="h-10 w-[60%] mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
