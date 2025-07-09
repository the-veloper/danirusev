-- This script creates RPC functions for updating and deleting orders.
-- These functions run with 'security definer' to safely perform actions
-- across the 'ecommerce' schema, after verifying the user is an admin.

-- Drop functions if they exist to allow for re-creation.
DROP FUNCTION IF EXISTS delete_order_by_id(bigint);
DROP FUNCTION IF EXISTS update_order_status_by_id(bigint, text);


-- Function to delete an order and its items.
-- It first checks if the caller is an admin.
CREATE OR REPLACE FUNCTION delete_order_by_id(order_id_to_delete bigint)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- First, verify the user is an admin.
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Permission denied: User is not an admin.';
  END IF;

  -- Delete associated order items.
  DELETE FROM ecommerce.order_items WHERE order_id = order_id_to_delete;

  -- Delete the order itself.
  DELETE FROM ecommerce.orders WHERE id = order_id_to_delete;
END;
$$;


-- Function to update the status of an order.
-- It first checks if the caller is an admin.
CREATE OR REPLACE FUNCTION update_order_status_by_id(order_id_to_update bigint, new_status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- First, verify the user is an admin.
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Permission denied: User is not an admin.';
  END IF;

  -- Update the order status.
  UPDATE ecommerce.orders
  SET status = new_status
  WHERE id = order_id_to_update;
END;
$$;
