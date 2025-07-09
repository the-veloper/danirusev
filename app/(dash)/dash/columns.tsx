'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteOrder, updateOrderStatus } from './actions'
import { toast } from 'sonner'

// This type is now updated to include the new fields from our RPC function
export type Order = {
  orderId: string // bigint is serialized as a string
  customerEmail: string | null
  customerName: string | null
  customerPhone: string | null
  productTitles: string | null
  total: number
  status: string
  createdAt: string
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderId',
    header: 'Order ID',
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue('orderId')}</div>,
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <div>{order.customerName}</div>
          <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
          <div className="text-xs text-muted-foreground">{order.customerPhone}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'productTitles',
    header: 'Products',
    cell: ({ row }) => {
      const titles = row.getValue('productTitles') as string | null
      // Truncate for display if the list is too long
      const displayTitles = titles && titles.length > 50 ? `${titles.substring(0, 50)}...` : titles
      return <div className="text-sm">{displayTitles || 'N/A'}</div>
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'total',
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('total'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original

      const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this order permanently?')) {
          return
        }
        toast.promise(deleteOrder(order.orderId), {
          loading: 'Deleting order...',
          success: 'Order deleted successfully.',
          error: 'Failed to delete order.',
        })
      }

      const handleStatusUpdate = async (status: 'approved' | 'shipped' | 'delivered' | 'pending') => {
        toast.promise(updateOrderStatus(order.orderId, status), {
          loading: `Updating status to ${status}...`,
          success: `Order status updated to ${status}.`,
          error: 'Failed to update order status.',
        })
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.orderId)}>
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleStatusUpdate('pending')}>
              Mark as Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusUpdate('approved')}>
              Mark as Approved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusUpdate('shipped')}>
              Mark as Shipped
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusUpdate('delivered')}>
              Mark as Delivered
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]