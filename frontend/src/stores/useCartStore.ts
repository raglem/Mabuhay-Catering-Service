import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderItemCreate } from "../types/Order";

type CartStore = {
  cartItems: OrderItemCreate[];
  addToCart: (item: OrderItemCreate) => void;
  removeFromCart: (menuItemId: number) => void;
  updateCartItem: (menuItemId: number, updatedItem: OrderItemCreate) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (item) =>
        set((state) => {
          const itemExists = state.cartItems.find(
            (ci) => ci.menuItem === item.menuItem
          )

          // Only add the item if it's not already in the cart
          if (!itemExists) {
            return { cartItems: [...state.cartItems, item] }
          }

          return {}
        }),

      removeFromCart: (menuItemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (ci) => ci.menuItem !== menuItemId
          ),
        })),

      updateCartItem: (menuItemId, updatedItem) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((ci) =>
            ci.menuItem === menuItemId ? updatedItem : ci
          );
          return { cartItems: updatedCartItems };
        }),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "mabuhay-cart-storage",
    }
  )
);
