import { CategoriesSection } from "@/components/store/categories-section"
import { StoreHeader } from "@/components/store/store-header"
import { StoreFooter } from "@/components/store/store-footer"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">Todas las Categorías</h1>
          <p className="text-muted-foreground text-lg">
            Explora nuestra colección completa de productos anime organizados por categorías
          </p>
        </div>
        <CategoriesSection />
      </main>
      <StoreFooter />
    </div>
  )
}
