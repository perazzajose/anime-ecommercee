import { StoreHeader } from "@/components/store/store-header"
import { StoreFooter } from "@/components/store/store-footer"
import { CartContent } from "@/components/store/cart-content"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Carrito de Compras</h1>
            <p className="text-muted-foreground">Revisa tus productos antes de finalizar la compra</p>
          </div>

          <CartContent />
        </div>
      </main>
      <StoreFooter />
    </div>
  )
}
