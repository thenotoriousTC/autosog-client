-- Updated Row Level Security policy for the bids table

-- Enable Row Level Security on bids table
ALTER TABLE IF EXISTS public.bids ENABLE ROW LEVEL SECURITY;

-- Drop existing policy first if it exists
DROP POLICY IF EXISTS "Allow users to delete their own bids" ON public.bids;

-- Create a policy to allow users to delete their own bids
CREATE POLICY "Allow users to delete their own bids"
ON public.bids
FOR DELETE
USING (auth.uid() = user_id);

-- Grant delete permissions to authenticated users
GRANT DELETE ON public.bids TO authenticated;

-- Note: We've fixed the syntax error by removing the IF NOT EXISTS clause from CREATE POLICY
-- and added a DROP POLICY statement instead.
-- Your bids table likely uses UUIDs as primary keys or has a different sequence naming convention. 