-- Step 1: Drop existing tables in reverse order of dependency to avoid errors.
DROP TABLE IF EXISTS ecommerce.order_items;
DROP TABLE IF EXISTS ecommerce.orders;

-- Step 2: Create the 'orders' table with an optimized structure.
CREATE TABLE ecommerce.orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total_price NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    shipping_address_snapshot JSONB NOT NULL
);

-- Step 3: Create the 'order_items' table.
CREATE TABLE ecommerce.order_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id BIGINT NOT NULL REFERENCES ecommerce.orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    title TEXT NOT NULL
);

-- Step 4: Add indexes for better query performance.
CREATE INDEX ON ecommerce.orders(user_id);
CREATE INDEX ON ecommerce.order_items(order_id);

-- Step 5: Enable Row Level Security (RLS) for the new tables.
ALTER TABLE ecommerce.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecommerce.order_items ENABLE ROW LEVEL SECURITY;

-- Step 6: Create RLS policies for row-level access.
CREATE POLICY "Allow users to see their own orders"
ON ecommerce.orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Allow users to see items for their own orders"
ON ecommerce.order_items FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM ecommerce.orders
    WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  )
);

-- Step 7: Grant base table-level permissions.
-- RLS policies will further restrict this access to specific rows.
GRANT SELECT ON ecommerce.orders TO authenticated;
GRANT SELECT ON ecommerce.order_items TO authenticated;