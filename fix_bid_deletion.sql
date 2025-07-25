-- Add this to your Supabase SQL Editor to fix bid deletion issues

-- 1. First, check existing RLS policies on the bids table
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'bids';

-- 2. Check if the bids table exists and its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'bids';

-- 3. Enable RLS on the bids table (if not already enabled)
ALTER TABLE IF EXISTS public.bids ENABLE ROW LEVEL SECURITY;

-- 4. Drop any existing policies that might interfere with deletion
DROP POLICY IF EXISTS "Users can delete their own bids" ON public.bids;

-- 5. Create a policy to allow users to manage their own bids
CREATE POLICY "Users can manage their own bids"
ON public.bids
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6. Specific policy for deleting bids
CREATE POLICY IF NOT EXISTS "Allow users to delete their own bids"
ON public.bids
FOR DELETE
USING (auth.uid() = user_id);

-- 7. Grant appropriate permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bids TO authenticated;

-- Note: After running this SQL, restart your application and try deleting a bid again.
-- The deletion should now persist across page refreshes.
