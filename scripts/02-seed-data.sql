-- Insertar categorías de productos anime
INSERT INTO categories (name, description, image_url) VALUES
('Figuras', 'Figuras coleccionables de personajes de anime', '/placeholder.svg?height=200&width=200'),
('Manga', 'Libros de manga en español y japonés', '/placeholder.svg?height=200&width=200'),
('Merchandising', 'Productos oficiales de series de anime', '/placeholder.svg?height=200&width=200'),
('Nendoroids', 'Figuras Nendoroid de Good Smile Company', '/placeholder.svg?height=200&width=200'),
('Funkos', 'Figuras Funko Pop de personajes de anime', '/placeholder.svg?height=200&width=200'),
('Accesorios', 'Llaveros, pins, stickers y más', '/placeholder.svg?height=200&width=200')
ON CONFLICT (name) DO NOTHING;

-- Insertar productos de ejemplo
INSERT INTO products (
  name, description, price, stock_quantity, category_id, image_url, 
  anime_series, character_name, manufacturer, scale, material
) VALUES
(
  'Figura Nezuko Kamado',
  'Figura premium de Nezuko Kamado de Demon Slayer. Detalles increíbles y alta calidad.',
  89.99, 15,
  (SELECT id FROM categories WHERE name = 'Figuras'),
  '/placeholder.svg?height=400&width=300',
  'Demon Slayer', 'Nezuko Kamado', 'Good Smile Company', '1/8', 'PVC/ABS'
),
(
  'Nendoroid Tanjiro Kamado',
  'Nendoroid de Tanjiro con accesorios intercambiables y expresiones.',
  45.99, 25,
  (SELECT id FROM categories WHERE name = 'Nendoroids'),
  '/placeholder.svg?height=400&width=300',
  'Demon Slayer', 'Tanjiro Kamado', 'Good Smile Company', 'Nendoroid', 'PVC/ABS'
),
(
  'Manga Demon Slayer Vol. 1',
  'Primer volumen del manga Demon Slayer en español.',
  12.99, 50,
  (SELECT id FROM categories WHERE name = 'Manga'),
  '/placeholder.svg?height=400&width=300',
  'Demon Slayer', NULL, 'Panini Comics', NULL, 'Papel'
),
(
  'Figura Goku Ultra Instinct',
  'Figura de Goku en su forma Ultra Instinct de Dragon Ball Super.',
  129.99, 8,
  (SELECT id FROM categories WHERE name = 'Figuras'),
  '/placeholder.svg?height=400&width=300',
  'Dragon Ball Super', 'Son Goku', 'Bandai', '1/8', 'PVC'
),
(
  'Funko Pop Naruto',
  'Figura Funko Pop de Naruto Uzumaki en su traje clásico.',
  15.99, 30,
  (SELECT id FROM categories WHERE name = 'Funkos'),
  '/placeholder.svg?height=400&width=300',
  'Naruto', 'Naruto Uzumaki', 'Funko', 'Pop', 'Vinilo'
),
(
  'Llavero Pikachu',
  'Llavero oficial de Pikachu de Pokémon.',
  8.99, 100,
  (SELECT id FROM categories WHERE name = 'Accesorios'),
  '/placeholder.svg?height=400&width=300',
  'Pokémon', 'Pikachu', 'The Pokémon Company', NULL, 'PVC'
)
ON CONFLICT DO NOTHING;

-- Insertar usuario admin por defecto (password: admin123)
INSERT INTO admin_users (email, password_hash, name) VALUES
('admin@animeshop.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Administrador')
ON CONFLICT (email) DO NOTHING;
