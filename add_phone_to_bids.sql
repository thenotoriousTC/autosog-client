-- Run this SQL script in your Supabase SQL Editor to fix the phone number issue

-- Step 1: Add phone_number column to bids table
ALTER TABLE public.bids 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Step 2: Drop the existing function first
DROP FUNCTION IF EXISTS public.get_bids_for_listing(uuid);

-- Step 3: Create the updated function with phone_number field
CREATE OR REPLACE FUNCTION public.get_bids_for_listing(listing_id uuid)
RETURNS TABLE (
  id uuid,
  listing_id uuid,
  user_id uuid,
  amount numeric,
  phone_number text,
  created_at timestamptz
) 
LANGUAGE sql
SECURITY definer
AS $$
  SELECT 
    id,
    listing_id,
    user_id,
    amount,
    phone_number,
    created_at
  FROM 
    bids
  WHERE 
    listing_id = $1
  ORDER BY 
    amount DESC;
$$; 