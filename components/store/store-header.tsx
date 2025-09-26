"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function StoreHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">AnimeShop</div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Buscar productos, series, personajes..." className="pl-10" />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Productos
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
              Categorías
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              Nosotros
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {state.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User */}
            <Link href="/account">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Buscar productos..." className="pl-10" />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/products"
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productos
                </Link>
                <Link
                  href="/categories"
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categorías
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
