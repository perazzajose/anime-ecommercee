-- Habilitar Row Level Security en las tablas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas para productos - Cualquiera puede ver productos activos
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (is_active = true);

-- Políticas para categorías - Cualquiera puede ver categorías
CREATE POLICY "Anyone can view categories" ON categories
    FOR SELECT USING (true);

-- Para simplificar, vamos a permitir operaciones CRUD sin autenticación por ahora
-- En producción, deberías implementar autenticación adecuada

-- Políticas temporales para desarrollo (REMOVER EN PRODUCCIÓN)
CREATE POLICY "Allow all operations on products for development" ON products
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on categories for development" ON categories
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on admin_users for development" ON admin_users
    FOR ALL USING (true) WITH CHECK (true);

-- Insertar usuario admin de prueba
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@anime-store.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;
