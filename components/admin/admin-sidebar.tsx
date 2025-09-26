"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, Users, BarChart3, Settings, Home, Tag, LogOut } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Productos", href: "/admin/products", icon: Package },
  { name: "Categorías", href: "/admin/categories", icon: Tag },
  { name: "Pedidos", href: "/admin/orders", icon: ShoppingCart },
  { name: "Usuarios", href: "/admin/users", icon: Users },
  { name: "Estadísticas", href: "/admin/analytics", icon: BarChart3 },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    try {
      await supabase.auth.signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">AnimeShop</h2>
        <p className="text-sm text-muted-foreground">Panel de Admin</p>
      </div>

      <nav className="px-4 space-y-2 flex-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3", isActive && "bg-secondary text-secondary-foreground")}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
