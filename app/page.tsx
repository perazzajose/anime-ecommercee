import { HeroSection } from "@/components/store/hero-section"
import { FeaturedProducts } from "@/components/store/featured-products"
import { CategoriesSection } from "@/components/store/categories-section"
import { StoreHeader } from "@/components/store/store-header"
import { StoreFooter } from "@/components/store/store-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
      </main>
      <StoreFooter />
    </div>
  )
}
