'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Define the types based on the JSON from our database function
type OrderItem = {
  id: number
  quantity: number
  price: string
  title: string
  product_id: string
}

type ShippingAddress = {
  fullName: string
  address: string
  city: string
  country: string
  postalCode: string
  phoneNumber: string
  email: string
}

type Order = {
  id: number
  created_at: string
  total_price: string
  status: string
  shipping_address_snapshot: ShippingAddress
  order_items: OrderItem[]
}

interface OrdersListProps {
  orders: Order[] | null
}

export function OrdersList({ orders }: OrdersListProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Все още нямате поръчки.</h2>
        <p className="text-muted-foreground mt-2">
          Когато направите поръчка, тя ще се появи тук.
        </p>
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {orders.map(order => (
        <AccordionItem
          key={order.id}
          value={`order-${order.id}`}
          className="border rounded-lg bg-card"
        >
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex flex-wrap items-center justify-between w-full gap-4">
              <div className="flex-1 text-left min-w-[120px]">
                <p className="font-bold text-lg">Поръчка #{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex-1 text-left md:text-center">
                <Badge variant={order.status === 'Pending' ? 'secondary' : 'default'}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex-1 font-bold text-lg text-right min-w-[100px]">
                {parseFloat(order.total_price).toFixed(2)} лв.
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0">
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Преживяване / Продукт</h3>
                <div className="space-y-3">
                  {order.order_items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p>{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Брой: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm">
                        {parseFloat(item.price).toFixed(2)} лв.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Изпратено към</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{order.shipping_address_snapshot.fullName}</p>
                  <p>{order.shipping_address_snapshot.address}</p>
                  <p>
                    {order.shipping_address_snapshot.city},{ ' ' }
                    {order.shipping_address_snapshot.postalCode}
                  </p>
                  <p>{order.shipping_address_snapshot.country}</p>
                  <p className="mt-2">
                    {order.shipping_address_snapshot.email}
                  </p>
                  <p>{order.shipping_address_snapshot.phoneNumber}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
