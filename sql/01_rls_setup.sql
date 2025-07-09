-- This script sets up Row-Level Security (RLS) for the ecommerce schema.
-- It ensures that only the Payload admin can access and manage all orders.

-- Step 1: Create a helper function to check if the current user is an admin.
-- This function checks if the email of the authenticated user exists in the public.users table.
-- NOTE: This assumes your Payload admin user logs in via Supabase Auth with the same email
-- as is stored in the public.users table.
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from users
    where email = auth.jwt()->>'email'
  );
$$;

-- Step 2: Enable Row Level Security on the tables in the ecommerce schema.
alter table ecommerce.orders enable row level security;
alter table ecommerce.order_items enable row level security;

-- Step 3: Create policies to grant access based on the is_admin() function.
-- This policy allows users for whom is_admin() returns true to perform any action
-- on the ecommerce.orders table.
create policy "Allow admin full access on orders"
on ecommerce.orders
for all
using (is_admin());

-- This policy allows users for whom is_admin() returns true to perform any action
-- on the ecommerce.order_items table.
create policy "Allow admin full access on order_items"
on ecommerce.order_items
for all
using (is_admin());
