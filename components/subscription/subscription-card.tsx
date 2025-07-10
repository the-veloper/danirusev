"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SubscriptionTier } from "@/lib/subscription-data"

interface SubscriptionCardProps {
  tier: SubscriptionTier
  isYearly: boolean
  tierIndex: number
}

const gradientClasses = [
  "bg-gradient-to-br from-card via-card to-main/10 border-main/20",
  "bg-gradient-to-br from-main/10 via-alt/10 to-toxic/10 border-main/40 shadow-main/20",
  "bg-gradient-to-br from-alt/20 via-toxic/15 to-main/20 border-toxic/50 shadow-toxic/30",
]



export function SubscriptionCard({ tier, isYearly, tierIndex }: SubscriptionCardProps) {
  const handleSubscription = async () => {
    console.log(`Initiating subscription for ${tier.id} with ${isYearly ? "yearly" : "monthly"} billing.`)
    // TODO: Implement Stripe checkout
    // const response = await createCheckoutSession({
    //   priceId: isYearly ? tier.yearlyPriceId : tier.monthlyPriceId,
    //   tierId: tier.id
    // });
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-105 flex flex-col h-full",
        gradientClasses[tierIndex],
        tier.isMostPopular && "ring-2 ring-main shadow-2xl shadow-main/25",
      )}
    >
      {tier.isMostPopular && (
        <Badge className="absolute top-4 left-1/2 -translate-x-1/2 bg-main text-alt font-gagalin">Най-популярен</Badge>
      )}

      <CardHeader className="text-center pt-8 pb-4">
        <div className="mb-3">
          <tier.icon
            className={cn(
              "mx-auto h-8 w-8 transition-colors text-main",
            )}
          />
        </div>
        <h3 className="text-xl font-gagalin text-foreground mb-2">{tier.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
      </CardHeader>

      <CardContent className="px-6 pb-6 flex-grow">
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-gagalin text-alt dark:text-main">{isYearly ? tier.price.yearly : tier.price.monthly}</span>
            <span className="text-sm text-muted-foreground ml-1">/{isYearly ? "год" : "мес"}</span>
          </div>
        </div>

        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <CheckCircle className="h-4 w-4 text-main mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Button
          className={cn("w-full font-gagalin text-sm py-6 bg-main hover:bg-main/90 text-alt",)}
          onClick={handleSubscription}
        >
          Избери план
        </Button>
      </CardFooter>
    </Card>
  )
}
