import type { Product } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AddToCartButton } from "@/components/store/add-to-cart-button"
import { Package, Truck, Shield, Star } from "lucide-react"
import Image from "next/image"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.category && <Badge variant="secondary">{product.category.name}</Badge>}
              {product.is_featured && <Badge className="bg-primary">Destacado</Badge>}
            </div>

            <h1 className="text-3xl font-bold text-balance mb-2">{product.name}</h1>

            {product.anime_series && (
              <p className="text-lg text-muted-foreground mb-1">
                Serie: <span className="text-foreground">{product.anime_series}</span>
              </p>
            )}

            {product.character_name && (
              <p className="text-lg text-primary font-medium">Personaje: {product.character_name}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">${product.price}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
            </div>
          </div>

          {product.description && (
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground text-pretty">{product.description}</p>
            </div>
          )}

          <Separator />

          {/* Product Specifications */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {product.manufacturer && (
              <div>
                <span className="font-medium">Fabricante:</span>
                <p className="text-muted-foreground">{product.manufacturer}</p>
              </div>
            )}
            {product.scale && (
              <div>
                <span className="font-medium">Escala:</span>
                <p className="text-muted-foreground">{product.scale}</p>
              </div>
            )}
            {product.material && (
              <div>
                <span className="font-medium">Material:</span>
                <p className="text-muted-foreground">{product.material}</p>
              </div>
            )}
            {product.dimensions && (
              <div>
                <span className="font-medium">Dimensiones:</span>
                <p className="text-muted-foreground">{product.dimensions}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="text-sm">
              {product.stock_quantity > 0 ? `${product.stock_quantity} en stock` : "Agotado"}
            </span>
          </div>

          {/* Add to Cart */}
          <AddToCartButton product={product} className="text-lg py-6" />

          {/* Features */}
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Envío gratis en compras mayores a $50</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Garantía de autenticidad</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <span>Empaque seguro y protegido</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
