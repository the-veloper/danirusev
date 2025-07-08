import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from "sonner"

// Define the shape of an item in the cart
export interface CartItem {
  id: string;
  title: string;
  price: string;
  icon: string;
  quantity: number;
  whatYouGet: string[]; // Added to store details
}

// Define the state and actions for the cart store
interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (itemId: string) => void
  increaseQuantity: (itemId: string) => void
  decreaseQuantity: (itemId: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items
        const existingItemIndex = currentItems.findIndex((i) => i.id === item.id)

        if (existingItemIndex !== -1) {
          // Item exists, just increase quantity
          const updatedItems = [...currentItems]
          updatedItems[existingItemIndex].quantity += 1
          set({ items: updatedItems })
          toast.success(`${item.title} quantity updated.`)
        } else {
          // New item, add it with quantity 1
          set({ items: [...currentItems, { ...item, quantity: 1 }] })
          toast.success(`${item.title} added to cart!`)
        }
      },
      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) })
        toast.info(`Item removed from cart.`)
      },
      increaseQuantity: (itemId) => {
        const updatedItems = get().items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
        set({ items: updatedItems })
      },
      decreaseQuantity: (itemId) => {
        const updatedItems = get().items.map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
        set({ items: updatedItems })
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)