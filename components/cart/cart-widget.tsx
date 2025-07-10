"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/stores/cart-store"
import { Cart } from "./cart"
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function CartWidget() {
  const { items } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isWiggling, setIsWiggling] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      setIsWiggling(true)
      const timer = setTimeout(() => setIsWiggling(false), 400) // Corresponds to the animation duration
      return () => clearTimeout(timer)
    }
  }, [items.length])

  const handleSheetOpenChange = (open: boolean) => {
    if (open) {
      toast.dismiss()
    }
    setIsSheetOpen(open)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="main"
          size="icon"
          className={cn("relative", { "wiggle": isWiggling })}
        >
          {isMounted && items.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {items.length}
            </Badge>
          )}
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Отвори количката</span>
        </Button>
      </SheetTrigger>
      <Cart closeSheet={() => setIsSheetOpen(false)} />
    </Sheet>
  )
}
