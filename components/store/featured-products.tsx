"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/supabase"
import { ProductCard } from "@/components/store/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  async function fetchFeaturedProducts() {
    try {
      console.log("[v0] Fetching featured products...")
      setError(null)

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .eq("is_active", true)
        .limit(8)
        .order("created_at", { ascending: false })

      console.log("[v0] Supabase response:", { data, error })

      if (error) {
        console.error("[v0] Supabase error:", error)
        throw error
      }

      setProducts(data || [])
      console.log("[v0] Featured products loaded:", data?.length || 0)
    } catch (error) {
      console.error("[v0] Error fetching featured products:", error)
      setError(error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
            <p className="text-red-500">Error: {error}</p>
            <Button onClick={fetchFeaturedProducts} className="mt-4">
              Reintentar
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-balance">Productos Destacados</h2>
          <p className="text-muted-foreground text-pretty">Descubre nuestras figuras y productos más populares</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">No hay productos destacados disponibles</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  Ver Todos los Productos
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
