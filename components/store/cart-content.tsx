"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/components/store/cart-item"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CartContent() {
  const { state } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
        <p className="text-muted-foreground mb-6">Agrega algunos productos increíbles de anime a tu carrito</p>
        <Link href="/products">
          <Button>
            Explorar Productos
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {state.items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({state.itemCount} productos)</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>{state.total >= 50 ? "Gratis" : "$5.99"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Impuestos</span>
                <span>${(state.total * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${(state.total + (state.total >= 50 ? 0 : 5.99) + state.total * 0.1).toFixed(2)}</span>
            </div>

            {state.total >= 50 && (
              <div className="text-sm text-green-600 bg-green-50 p-2 rounded">¡Felicidades! Tienes envío gratis</div>
            )}

            <Button className="w-full" size="lg">
              Proceder al Checkout
            </Button>

            <Link href="/products">
              <Button variant="outline" className="w-full bg-transparent">
                Continuar Comprando
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
