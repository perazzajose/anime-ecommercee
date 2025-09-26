import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                Tu tienda de <span className="text-primary">anime</span> favorita
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Descubre la colección más completa de figuras, manga y merchandising de tus series favoritas. Calidad
                premium y envíos seguros.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Explorar Productos
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Ver Categorías
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Envío gratis +$50</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Productos oficiales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Garantía de calidad</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/anime-figures-collection-display.jpg"
                alt="Colección de figuras de anime"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-lg transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
