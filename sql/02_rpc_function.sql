-- This script updates the RPC function to fetch more detailed order information.
-- It first drops the existing function to allow for changing the return signature,
-- then recreates it with the new structure.

DROP FUNCTION IF EXISTS get_all_orders_with_details();

CREATE OR REPLACE FUNCTION get_all_orders_with_details()
RETURNS TABLE (
  "orderId" bigint,
  "customerEmail" text,
  "customerName" text,
  "customerPhone" text,
  "productTitles" text,
  "total" numeric,
  "status" text,
  "createdAt" timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    o.id AS "orderId",
    u.email AS "customerEmail",
    p.full_name AS "customerName",
    (o.shipping_address_snapshot->>'phoneNumber') AS "customerPhone",
    (SELECT string_agg(oi.title, ', ') FROM ecommerce.order_items oi WHERE oi.order_id = o.id) AS "productTitles",
    o.total_price AS total,
    o.status,
    o.created_at AS "createdAt"
  FROM
    ecommerce.orders AS o
  JOIN
    ecommerce.profiles AS p ON o.user_id = p.id
  JOIN
    auth.users AS u ON o.user_id = u.id
  ORDER BY
    o.created_at DESC;
$$;