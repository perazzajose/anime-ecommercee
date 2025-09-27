import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { StoreHeader } from "@/components/store/store-header"
import { StoreFooter } from "@/components/store/store-footer"
import { ProductCard } from "@/components/store/product-card"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = createServerClient()

  // Fetch category details
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.id)
    .single()

  if (categoryError || !category) {
    notFound()
  }

  // Fetch products in this category
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name)
    `)
    .eq("category_id", params.id)
    .order("created_at", { ascending: false })

  const categoryProducts = products || []

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{category.description}</p>
          )}
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No hay productos disponibles en esta categoría por el momento.
            </p>
          </div>
        )}
      </main>
      <StoreFooter />
    </div>
  )
}
