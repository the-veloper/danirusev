import { SubscriptionCard } from "@/components/subscription/subscription-card"
import { subscriptionTiers } from "@/lib/subscription-data"

interface SubscriptionTiersProps {
  isYearly: boolean
}

export function SubscriptionTiers({ isYearly }: SubscriptionTiersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {subscriptionTiers.map((tier, index) => (
        <SubscriptionCard key={tier.id} tier={tier} isYearly={isYearly} tierIndex={index} />
      ))}
    </div>
  )
}
