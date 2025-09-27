import { createClient } from "@/lib/supabase/server"
import { StoreHeader } from "@/components/store/store-header"
import { StoreFooter } from "@/components/store/store-footer"
import { ProductDetails } from "@/components/store/product-details"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name)
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
      <StoreFooter />
    </div>
  )
}
