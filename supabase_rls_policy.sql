-- Row Level Security policy for the bids table

-- Enable Row Level Security on bids table
ALTER TABLE IF EXISTS public.bids ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to delete their own bids
CREATE POLICY IF NOT EXISTS "Allow users to delete their own bids"
ON public.bids
FOR DELETE
USING (auth.uid() = user_id);

-- Grant permissions to authenticated users
GRANT DELETE ON public.bids TO authenticated; 