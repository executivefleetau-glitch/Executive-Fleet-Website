-- Row-Level Security (RLS) Migration
-- This script enables RLS on sensitive tables and creates security policies

-- ============================================
-- ENABLE ROW-LEVEL SECURITY
-- ============================================

-- Enable RLS on bookings table (admin-only access)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Enable RLS on users table (admins see all, editors see only themselves)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- Policy 1: Bookings - Admin Only Access
-- Only users with role='admin' can see, insert, update, or delete bookings
CREATE POLICY "admin_only_bookings" ON bookings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = current_setting('app.current_user_id', true)::text 
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = current_setting('app.current_user_id', true)::text 
      AND users.role = 'admin'
    )
  );

-- Policy 2: Users - Admins see all, Editors see only themselves
CREATE POLICY "user_access_policy" ON users
  FOR SELECT
  USING (
    -- Allow if user is admin OR viewing their own record
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = current_setting('app.current_user_id', true)::text
      AND (u.role = 'admin' OR u.id = users.id)
    )
  );

-- Policy 3: Users - Only admins can modify user records
CREATE POLICY "admin_only_user_modifications" ON users
  FOR INSERT, UPDATE, DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = current_setting('app.current_user_id', true)::text 
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = current_setting('app.current_user_id', true)::text 
      AND users.role = 'admin'
    )
  );

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- To test RLS policies, run these queries:

-- 1. Set session as admin user (replace with actual admin user ID)
-- SET app.current_user_id = 'your-admin-user-id';
-- SELECT * FROM bookings; -- Should return all bookings
-- SELECT * FROM users; -- Should return all users

-- 2. Set session as editor user (replace with actual editor user ID)
-- SET app.current_user_id = 'your-editor-user-id';
-- SELECT * FROM bookings; -- Should return 0 rows
-- SELECT * FROM users; -- Should return only the editor's own user record

-- 3. Reset session
-- RESET app.current_user_id;
