-- This script replaces the generic RLS policy with more explicit ones
-- to ensure that admin users have the necessary permissions to update and delete orders.

-- Step 1: Drop the existing generic policy on the orders table.
drop policy if exists "Allow admin full access on orders" on ecommerce.orders;

-- Step 2: Create specific policies for SELECT, UPDATE, and DELETE.
-- This ensures the admin can see all orders.
create policy "Allow admin to select orders" on ecommerce.orders
for select
using (is_admin());

-- This ensures the admin can update any order.
create policy "Allow admin to update orders" on ecommerce.orders
for update
using (is_admin())
with check (is_admin());

-- This ensures the admin can delete any order.
create policy "Allow admin to delete orders" on ecommerce.orders
for delete
using (is_admin());
