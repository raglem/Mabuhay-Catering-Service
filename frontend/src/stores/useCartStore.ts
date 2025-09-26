import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderItemCreate } from "../types/Order";

type CartStore = {
  cartItems: OrderItemCreate[];
  addToCart: (item: OrderItemCreate) => void;
  removeFromCart: (menuItemId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (item) =>
        set((state) => {
            const menuItemId = item.menuItem
            const itemIndex = state.cartItems.findIndex(
            (ci) => ci.menuItem === item.menuItem
            )

            // If the item is already in the cart, update it
            if (itemIndex !== -1) {
                const updatedCartItems = state.cartItems.map((ci) =>
                    ci.menuItem === menuItemId ? item : ci
                );
                return { cartItems: updatedCartItems };
            }
            // If the item is not already in the cart, append it
            else{
                return { cartItems: [...state.cartItems, item] }
            }
        }),

      removeFromCart: (menuItemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (ci) => ci.menuItem !== menuItemId
          ),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "mabuhay-cart-storage",
    }
  )
);
