"use client"

import { useCartStore } from "@/lib/stores/cart-store"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Minus, Plus, Trash, CheckCircle } from "lucide-react"
import * as LucideIcons from 'lucide-react';
import Link from "next/link"

// Gradients to be used for backgrounds, matching the experience cards
const gradients = [
  'from-yellow-400 via-amber-500 to-orange-600',
  'from-cyan-400 via-rent to-indigo-600',
  'from-lime-400 via-mix to-emerald-600',
];

// A map to associate experience IDs with gradients for consistent styling
const experienceGradients: { [key: string]: string } = {
  '1': gradients[0],
  '2': gradients[1],
  '3': gradients[2],
};

export function Cart() {
  const { items, removeItem, increaseQuantity, decreaseQuantity } = useCartStore()
  const subtotal = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)

  const getLucideIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-10 w-10 text-white" /> : null;
  };

  return (
    <SheetContent className="flex w-full flex-col px-8 sm:max-w-lg">
      <SheetHeader className="space-y-2.5 pr-6">
        <SheetTitle>Количка ({items.length})</SheetTitle>
      </SheetHeader>
      {items.length > 0 ? (
        <>
          <div className="flex w-full flex-col pr-6">
            <ScrollArea className="h-[calc(100vh-17rem)]">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`relative aspect-square h-20 w-20 overflow-hidden rounded-md flex items-center justify-center bg-gradient-to-br ${experienceGradients[item.id] || gradients[0]}`}>
                          {getLucideIcon(item.icon)}
                        </div>
                        <div className="flex flex-col self-start">
                          <span className="line-clamp-1 text-sm font-medium">
                            {item.title}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {item.price} лв
                          </span>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => decreaseQuantity(item.id)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-5 text-center text-sm">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => increaseQuantity(item.id)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1 pl-2">
                        {(item.whatYouGet || []).slice(0, 3).map((detail, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{detail}</span>
                            </div>
                        ))}
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="space-y-4 pr-6">
            <Separator />
            <div className="space-y-1.5 text-sm">
              <div className="flex font-medium">
                <span className="flex-1">Общо</span>
                <span>{subtotal.toFixed(2)} лв</span>
              </div>
              <div className="flex text-muted-foreground">
                <span className="flex-1">Доставка & Такси</span>
                <span>Калкулира се при плащане</span>
              </div>
            </div>
            <SheetFooter>
              <Button asChild className="w-full">
                <Link href="/checkout">Continue to Checkout</Link>
              </Button>
            </SheetFooter>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div aria-hidden="true" className="relative mb-4 h-40 w-40 text-muted-foreground">
            <Image src="/file.svg" fill alt="Empty shopping cart" />
          </div>
          <div className="text-xl font-semibold">Вашата количка е празна.</div>
          <div className="text-sm text-muted-foreground">
            Добавете преживявания или продукти за да ги видите тук.
          </div>
        </div>
      )}
    </SheetContent>
  )
}