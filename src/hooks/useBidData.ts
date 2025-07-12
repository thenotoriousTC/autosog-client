import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Bid } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
}

export function useBidData(listingId: string) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});
  const [loadingBids, setLoadingBids] = useState(true);
  const [deletingBidId, setDeletingBidId] = useState<string | null>(null);
  const { toast } = useToast();

  // Get the highest bid amount
  const highestBid = bids.length > 0 ? bids[0].amount : null;

  // Transform bid data from Supabase format to our Bid type
  const transformBidData = useCallback((data: any[]): Bid[] => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(bid => ({
      id: bid.id,
      listingId: bid.listing_id,
      userId: bid.user_id,
      amount: bid.amount,
      phoneNumber: bid.phone_number || '',
      createdAt: bid.created_at
    }));
  }, []);

  // Fetch user profiles for all bidders
  const fetchUserProfiles = useCallback(async (userIds: string[]) => {
    if (!userIds.length) return;
    
    try {
      // Use a more direct query to get profiles data
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', userIds);
        
      if (error) {
        console.error('Error fetching user profiles:', error);
        return;
      }
      
      if (data) {
        // Create a map of user profiles keyed by user ID
        const profilesMap: Record<string, UserProfile> = {};
        data.forEach(profile => {
          profilesMap[profile.id] = {
            id: profile.id,
            first_name: profile.first_name || '',
            last_name: profile.last_name || ''
          };
        });
        
        console.log('User Profiles Fetched:', profilesMap);
        setUserProfiles(profilesMap);
      }
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  }, []);

  // Delete a bid
  const deleteBid = useCallback(async (bidId: string, userId: string) => {
    try {
      setDeletingBidId(bidId);
      
      // Simple direct deletion approach
      const { error } = await supabase
        .from('bids')
        .delete()
        .eq('id', bidId);
      
      if (error) {
        console.error('Error deleting bid:', error);
        toast({
          title: 'Error',
          description: 'Could not delete your bid. Please try again.',
          variant: 'destructive'
        });
        return false;
      }
      
      // Update local state to remove the deleted bid
      setBids(prevBids => prevBids.filter(bid => bid.id !== bidId));
      
      toast({
        title: 'Success',
        description: 'Bid deleted successfully.',
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting bid:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setDeletingBidId(null);
    }
  }, [toast, supabase]);

  // Fetch current bids
  const fetchBids = useCallback(async () => {
    if (!listingId) return;
    
    try {
      setLoadingBids(true);
      // Use the RPC function to get bids for the listing
      const { data, error } = await supabase.rpc('get_bids_for_listing', { 
        listing_id: listingId 
      });
      
      if (error) {
        console.error('Error fetching bids:', error);
        toast({
          title: 'Error',
          description: 'Failed to load bids. Please try again.',
          variant: 'destructive'
        });
        return;
      }
      
      const transformedBids = transformBidData(data || []);
      setBids(transformedBids);
      
      // Get unique user IDs from bids to fetch profiles
      const userIds = Array.from(new Set(transformedBids.map(bid => bid.userId)));
      console.log('User IDs from bids:', userIds);
      
      if (userIds.length > 0) {
        await fetchUserProfiles(userIds);
      }
    } catch (error: any) {
      console.error('Error fetching bids:', error);
      toast({
        title: 'Error',
        description: 'Failed to load bids. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoadingBids(false);
    }
  }, [listingId, toast, transformBidData, fetchUserProfiles]);

  // Load bids when component mounts or listingId changes
  useEffect(() => {
    let isMounted = true;
    
    const loadBids = async () => {
      if (isMounted) {
        await fetchBids();
      }
    };
    
    if (listingId) {
      loadBids();
    }
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [listingId, fetchBids]);

  return { 
    bids, 
    userProfiles, 
    loadingBids,
    deletingBidId,
    highestBid, 
    fetchBids,
    deleteBid
  };
}
