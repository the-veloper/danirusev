"use client"

import { useState } from "react"
import { SubscriptionTiers } from "@/components/subscription/subscription-tiers"
import { BillingToggle } from "@/components/subscription/billing-toggle"

export default function SubscriptionsPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-main/5">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-gagalin tracking-tight mb-4">
            <span className=" bg-clip-text text-main font-outline">
              Стани част от отбора
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Избери своя план и получи ексклузивен достъп, отстъпки и възможности
          </p>
        </div>

        {/* Billing Toggle */}
        <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />

        {/* Subscription Tiers */}
        <SubscriptionTiers isYearly={isYearly} />
      </div>
    </div>
  )
}
