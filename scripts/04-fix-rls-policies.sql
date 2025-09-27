-- Eliminar todas las políticas existentes que causan recursión
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Only admins can modify categories" ON categories;
DROP POLICY IF EXISTS "Only admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow all operations on products for development" ON products;
DROP POLICY IF EXISTS "Allow all operations on categories for development" ON categories;
DROP POLICY IF EXISTS "Allow all operations on admin_users for development" ON admin_users;

-- Deshabilitar RLS temporalmente para evitar problemas
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Crear políticas simples sin recursión
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Políticas simples para productos - permitir lectura a todos, escritura solo autenticados
CREATE POLICY "Allow public read access to active products" ON products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage products" ON products
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Políticas simples para categorías - permitir lectura a todos, escritura solo autenticados
CREATE POLICY "Allow public read access to categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage categories" ON categories
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Para admin_users, mantener RLS deshabilitado por ahora para evitar recursión
-- En producción, esto se puede manejar con políticas más específicas
