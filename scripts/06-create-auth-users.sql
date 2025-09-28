-- Create admin users in Supabase Auth and admin_users table
-- This script creates the actual authentication users

-- First, we need to create the users in Supabase Auth
-- Note: This needs to be done through the Supabase dashboard or API

-- Insert admin users into our admin_users table
-- These will be linked to the auth users once they're created

INSERT INTO admin_users (id, email, created_at, updated_at) 
VALUES 
  -- We'll update these IDs once the auth users are created
  ('00000000-0000-0000-0000-000000000001', 'admin@anime-store.com', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'admin@animeshop.com', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Verify the admin users were created
SELECT * FROM admin_users;
