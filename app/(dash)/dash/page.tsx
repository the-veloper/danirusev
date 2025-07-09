import { createClient } from '@/utils/supabase/server'
import { OrdersDataTable } from './data-table'
import { columns } from './columns'
import { redirect } from 'next/navigation'

export default async function DashPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  const { data: orders, error } = await supabase.rpc(
    'get_all_orders_with_details',
  )

  if (error) {
    console.error('Error fetching orders:', error)
    // Optionally, you can redirect to an error page or show a message
    // For now, we'll show an empty state in the table.
  }

  // The RPC function is defined to return an array, even if it's empty.
  // So we can safely pass `orders` to the data table.
  const nonNullOrders = orders || []

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <OrdersDataTable columns={columns} data={nonNullOrders} />
    </div>
  )
}