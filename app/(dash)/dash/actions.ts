'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteOrder(orderId: string) {
  const supabase = await createClient()

  // Call the RPC function to delete the order
  const { error } = await supabase.rpc('delete_order_by_id', {
    order_id_to_delete: orderId,
  })

  if (error) {
    console.error('Error deleting order:', error)
    throw new Error('Failed to delete order.')
  }

  revalidatePath('/dash')
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()

  // Call the RPC function to update the order status
  const { error } = await supabase.rpc('update_order_status_by_id', {
    order_id_to_update: orderId,
    new_status: status,
  })

  if (error) {
    console.error('Error updating order status:', error)
    throw new Error('Failed to update order status.')
  }

  revalidatePath('/dash')
}