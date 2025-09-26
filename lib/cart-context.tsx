"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "@/lib/supabase"

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.product.id === action.product.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return calculateTotals({ ...state, items: updatedItems })
      } else {
        const updatedItems = [...state.items, { product: action.product, quantity: 1 }]
        return calculateTotals({ ...state, items: updatedItems })
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.product.id !== action.productId)
      return calculateTotals({ ...state, items: updatedItems })
    }

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        const updatedItems = state.items.filter((item) => item.product.id !== action.productId)
        return calculateTotals({ ...state, items: updatedItems })
      }

      const updatedItems = state.items.map((item) =>
        item.product.id === action.productId ? { ...item, quantity: action.quantity } : item,
      )
      return calculateTotals({ ...state, items: updatedItems })
    }

    case "CLEAR_CART": {
      return { items: [], total: 0, itemCount: 0 }
    }

    case "LOAD_CART": {
      return calculateTotals({ ...state, items: action.items })
    }

    default:
      return state
  }
}

function calculateTotals(state: CartState): CartState {
  const total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  return { ...state, total, itemCount }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("anime-shop-cart")
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", items })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("anime-shop-cart", JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
