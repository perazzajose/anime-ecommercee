-- Habilitar Row Level Security en las tablas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas para productos (solo admins pueden modificar)
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can insert products" ON products
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

CREATE POLICY "Only admins can update products" ON products
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

CREATE POLICY "Only admins can delete products" ON products
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

-- Políticas para categorías
CREATE POLICY "Anyone can view categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify categories" ON categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

-- Políticas para admin_users (solo admins pueden ver otros admins)
CREATE POLICY "Only admins can view admin_users" ON admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

-- Crear usuario admin por defecto en auth.users
-- Nota: En producción, esto se debe hacer a través de la interfaz de Supabase
-- o usando la API de administración
