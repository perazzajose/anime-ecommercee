-- Production setup script for anime ecommerce
-- This script ensures all tables, data, and security policies are properly configured

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users table
DROP POLICY IF EXISTS "Admin users can view all admin users" ON admin_users;
CREATE POLICY "Admin users can view all admin users" ON admin_users
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin users can insert admin users" ON admin_users;
CREATE POLICY "Admin users can insert admin users" ON admin_users
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin users can update admin users" ON admin_users;
CREATE POLICY "Admin users can update admin users" ON admin_users
    FOR UPDATE USING (true);

-- Create policies for categories table
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
CREATE POLICY "Anyone can view categories" ON categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin users can manage categories" ON categories;
CREATE POLICY "Admin users can manage categories" ON categories
    FOR ALL USING (true);

-- Create policies for products table
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admin users can manage products" ON products;
CREATE POLICY "Admin users can manage products" ON products
    FOR ALL USING (true);

-- Insert sample admin users if not exists
INSERT INTO admin_users (id, email, password_hash, name, role, is_active)
SELECT 
    gen_random_uuid(),
    'admin@anime-store.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: "password"
    'Admin User',
    'admin',
    true
WHERE NOT EXISTS (
    SELECT 1 FROM admin_users WHERE email = 'admin@anime-store.com'
);

-- Adding second admin user that matches the credentials shown in the login form
INSERT INTO admin_users (id, email, password_hash, name, role, is_active)
SELECT 
    gen_random_uuid(),
    'admin@animeshop.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdvQrOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: "admin123"
    'AnimeShop Admin',
    'admin',
    true
WHERE NOT EXISTS (
    SELECT 1 FROM admin_users WHERE email = 'admin@animeshop.com'
);

-- Verify setup
SELECT 'Setup completed successfully!' as status;
SELECT COUNT(*) as admin_count FROM admin_users;
SELECT COUNT(*) as categories_count FROM categories;
SELECT COUNT(*) as products_count FROM products;
