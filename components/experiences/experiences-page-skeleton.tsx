import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ExperiencesPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-96px)] bg-background">
      {/* Desktop Layout Skeleton */}
      <div className="hidden xl:block container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Card Carousel Skeleton */}
          <div className="col-span-5">
            <div className="sticky top-8">
              <Skeleton className="h-8 w-48 mx-auto mb-6" />

              {/* Card Carousel Placeholder */}
              <div className="relative h-[580px] flex items-center justify-center">
                {/* A representative skeleton card */}
                <div className="absolute w-80">
                  <Card className="overflow-hidden border border-black/20 h-[550px] flex flex-col">
                    <Skeleton className="h-32 -mt-8" />
                    <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Detailed Information Skeleton */}
          <div className="col-span-7 space-y-6">
            {/* Header Skeleton */}
            <div className="text-center">
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4 mt-2" />
            </div>

            {/* Bento Grid Skeleton */}
            <div className="grid grid-cols-2 gap-4 h-[500px]">
              {/* Process Skeleton */}
              <Card className="row-span-2">
                <CardContent className="p-5 h-full space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location Skeleton */}
              <Card>
                <CardContent className="p-5 space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                </CardContent>
              </Card>

              {/* Requirements Skeleton */}
              <Card>
                <CardContent className="p-5 space-y-4">
                  <Skeleton className="h-6 w-28" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center w-full">
              <Skeleton className="h-12 w-48 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout Skeleton */}
      <div className="xl:hidden container mx-auto px-4 py-4">
        <div className="grid w-full grid-cols-3 gap-2 mb-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-6">
            <Skeleton className="h-24 w-full" />
            <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
      </div>
    </div>
  )
}
