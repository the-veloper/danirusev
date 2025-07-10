import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface BillingToggleProps {
  isYearly: boolean
  onToggle: (isYearly: boolean) => void
}

export function BillingToggle({ isYearly, onToggle }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-10">
      <span className={cn("font-medium transition-colors", !isYearly ? "text-main" : "text-muted-foreground")}>
        Месечно
      </span>
      <Switch checked={isYearly} onCheckedChange={onToggle} className="data-[state=checked]:bg-main" />
      <span className={cn("font-medium transition-colors", isYearly ? "text-main" : "text-muted-foreground")}>
        Годишно
        <span className="ml-2 text-xs font-gagalin text-toxic bg-toxic/10 px-2 py-1 rounded-full">-16%</span>
      </span>
    </div>
  )
}
