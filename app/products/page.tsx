import { Suspense } from "react"
import { StoreHeader } from "@/components/store/store-header"
import { StoreFooter } from "@/components/store/store-footer"
import { ProductsGrid } from "@/components/store/products-grid"
import { ProductsFilters } from "@/components/store/products-filters"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Todos los Productos</h1>
          <p className="text-muted-foreground">Descubre nuestra colección completa</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductsFilters />
          </aside>

          <div className="lg:col-span-3">
            <Suspense fallback={<div>Cargando productos...</div>}>
              <ProductsGrid />
            </Suspense>
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  )
}
