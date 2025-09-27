// Keep only the types here for backward compatibility
export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock_quantity: number
  category_id: string | null
  image_url: string | null
  images: string[]
  anime_series: string | null
  character_name: string | null
  manufacturer: string | null
  release_date: string | null
  dimensions: string | null
  weight: string | null
  material: string | null
  scale: string | null
  is_featured: boolean
  is_active: boolean
  tags: string[]
  created_at: string
  updated_at: string
  category?: Category
}

export interface Category {
  id: string
  name: string
  description: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}
