"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const { toast } = useToast()

  function handleAddToCart() {
    if (product.stock_quantity === 0) return

    dispatch({ type: "ADD_ITEM", product })
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })
  }

  return (
    <Button
      className={`w-full ${className}`}
      size="sm"
      disabled={product.stock_quantity === 0}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {product.stock_quantity === 0 ? "Agotado" : "Agregar al Carrito"}
    </Button>
  )
}
