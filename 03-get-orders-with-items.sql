CREATE OR REPLACE FUNCTION public.get_user_orders_with_items()
RETURNS JSONB -- Return a single JSONB object containing an array of orders
LANGUAGE sql
STABLE -- Indicates the function doesn't modify the database
SECURITY INVOKER -- Runs with the permissions of the user calling it, respecting RLS
AS $$
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', o.id,
      'created_at', o.created_at,
      'total_price', o.total_price,
      'status', o.status,
      'shipping_address_snapshot', o.shipping_address_snapshot,
      'order_items', (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', oi.id,
            'quantity', oi.quantity,
            'price', oi.price,
            'title', oi.title,
            'product_id', oi.product_id
          )
        )
        FROM ecommerce.order_items oi
        WHERE oi.order_id = o.id
      )
    ) ORDER BY o.created_at DESC
  )
  FROM ecommerce.orders o
  WHERE o.user_id = auth.uid();
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_user_orders_with_items() TO authenticated;
