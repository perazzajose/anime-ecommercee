import type { Product } from "@/lib/supabase"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { AddToCartButton } from "@/components/store/add-to-cart-button"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image_url || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {product.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Agotado</Badge>
          </div>
        )}

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>

          {product.anime_series && <p className="text-xs text-muted-foreground">{product.anime_series}</p>}

          {product.character_name && <p className="text-xs text-primary font-medium">{product.character_name}</p>}

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            {product.category && (
              <Badge variant="secondary" className="text-xs">
                {product.category.name}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  )
}
