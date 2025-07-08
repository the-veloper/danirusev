"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/stores/cart-store"
import { Cart } from "./cart"

export function CartWidget() {
  const { items } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {isMounted && items.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {items.length}
            </Badge>
          )}
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <Cart />
    </Sheet>
  )
}
