-- This script provides a comprehensive set of RLS policies for the admin dashboard.
-- It ensures the admin has full control over orders and order_items,
-- while keeping the tables secure.

-- Step 1: Re-affirm the helper function to identify an admin.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE email = auth.jwt()->>'email'
  );
$$;

-- Step 2: Grant explicit permissions for the 'orders' table.
-- Admin can see all orders.
CREATE POLICY "Allow admin to SELECT orders" ON ecommerce.orders
FOR SELECT USING (is_admin());

-- Admin can update any order (e.g., change status).
CREATE POLICY "Allow admin to UPDATE orders" ON ecommerce.orders
FOR UPDATE USING (is_admin()) WITH CHECK (is_admin());

-- Admin can delete any order.
CREATE POLICY "Allow admin to DELETE orders" ON ecommerce.orders
FOR DELETE USING (is_admin());


-- Step 3: Grant explicit permissions for the 'order_items' table.
-- This is the key step that was missing.

-- Admin can see all order items.
CREATE POLICY "Allow admin to SELECT order_items" ON ecommerce.order_items
FOR SELECT USING (is_admin());

-- Admin can delete order items (this is required to delete an order).
CREATE POLICY "Allow admin to DELETE order_items" ON ecommerce.order_items
FOR DELETE USING (is_admin());
