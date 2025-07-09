-- Grant usage permission on the ecommerce schema to the authenticated role.
-- This allows authenticated users to access functions and types within this schema.
GRANT USAGE ON SCHEMA ecommerce TO authenticated;

-- Step 1: Define a composite type that represents a single order item.
DROP TYPE IF EXISTS ecommerce.order_item_type CASCADE;
CREATE TYPE ecommerce.order_item_type AS (
    product_id TEXT,
    quantity INT,
    price NUMERIC(10, 2),
    title TEXT
);

-- Step 2: Create the REAL function in the 'ecommerce' schema.
CREATE OR REPLACE FUNCTION ecommerce.create_order_with_items(
    p_user_id UUID,
    p_total_price NUMERIC(10, 2),
    p_shipping_address_snapshot JSONB,
    p_order_items ecommerce.order_item_type[]
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_order_id BIGINT;
    item ecommerce.order_item_type;
BEGIN
    INSERT INTO ecommerce.orders (user_id, total_price, shipping_address_snapshot)
    VALUES (p_user_id, p_total_price, p_shipping_address_snapshot)
    RETURNING id INTO new_order_id;

    FOREACH item IN ARRAY p_order_items
    LOOP
        INSERT INTO ecommerce.order_items (order_id, product_id, quantity, price, title)
        VALUES (new_order_id, item.product_id, item.quantity, item.price, item.title);
    END LOOP;

    RETURN new_order_id;
END;
$$;

-- Step 3: Create the WRAPPER function in the 'public' schema.
CREATE OR REPLACE FUNCTION public.create_order_with_items(
    p_user_id UUID,
    p_total_price NUMERIC(10, 2),
    p_shipping_address_snapshot JSONB,
    p_order_items ecommerce.order_item_type[]
)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN ecommerce.create_order_with_items(
        p_user_id,
        p_total_price,
        p_shipping_address_snapshot,
        p_order_items
    );
END;
$$;

-- Step 4: Grant execute permissions on the PUBLIC wrapper function to the 'authenticated' role.
GRANT EXECUTE ON FUNCTION public.create_order_with_items(UUID, NUMERIC, JSONB, ecommerce.order_item_type[]) TO authenticated;
