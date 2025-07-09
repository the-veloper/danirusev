import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { OrdersList } from './orders-list'

export default async function OrdersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in?redirect_to=/orders')
  }

  // Fetch orders using the new RPC call
  const { data: orders, error } = await supabase.rpc(
    'get_user_orders_with_items',
  )

  if (error) {
    console.error('Error fetching orders:', error.message)
    // Render an error message or fallback UI
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <p className="text-red-500">Could not load orders. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <OrdersList orders={orders} />
    </div>
  )
}
