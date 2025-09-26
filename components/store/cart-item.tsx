"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItemProps {
  item: {
    product: {
      id: string
      name: string
      price: number
      image_url: string | null
      anime_series: string | null
      character_name: string | null
    }
    quantity: number
  }
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart()

  function updateQuantity(newQuantity: number) {
    dispatch({
      type: "UPDATE_QUANTITY",
      productId: item.product.id,
      quantity: newQuantity,
    })
  }

  function removeItem() {
    dispatch({
      type: "REMOVE_ITEM",
      productId: item.product.id,
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={item.product.image_url || "/placeholder.svg?height=80&width=80"}
              alt={item.product.name}
              fill
              className="object-cover rounded"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-2">
            <div>
              <Link
                href={`/products/${item.product.id}`}
                className="font-semibold hover:text-primary transition-colors"
              >
                {item.product.name}
              </Link>
              {item.product.anime_series && (
                <p className="text-sm text-muted-foreground">{item.product.anime_series}</p>
              )}
              {item.product.character_name && <p className="text-sm text-primary">{item.product.character_name}</p>}
            </div>

            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(Number.parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                  min="1"
                />

                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Price and Remove */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeItem}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
