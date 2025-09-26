import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function StoreFooter() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">AnimeShop</h3>
            <p className="text-muted-foreground text-sm">
              Tu tienda especializada en productos de anime. Figuras, manga y merchandising oficial de la mejor calidad.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold">Productos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/figuras" className="text-muted-foreground hover:text-primary transition-colors">
                  Figuras
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/nendoroids"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Nendoroids
                </Link>
              </li>
              <li>
                <Link href="/categories/manga" className="text-muted-foreground hover:text-primary transition-colors">
                  Manga
                </Link>
              </li>
              <li>
                <Link href="/categories/funkos" className="text-muted-foreground hover:text-primary transition-colors">
                  Funkos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Trabajar con nosotros
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AnimeShop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
