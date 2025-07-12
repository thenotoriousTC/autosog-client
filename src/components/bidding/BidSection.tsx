import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { BidForm } from './BidForm';
import { BidList } from './BidList';
import { useBidData } from '@/hooks/useBidData';

interface BidSectionProps {
  listingId: string;
  currentPrice: number;
}

export function BidSection({ listingId, currentPrice }: BidSectionProps) {
  const { user } = useAuth();
  const { 
    bids, 
    userProfiles, 
    loadingBids, 
    deletingBidId,
    highestBid, 
    fetchBids,
    deleteBid 
  } = useBidData(listingId);

  // Handler for deleting a bid
  const handleDeleteBid = async (bidId: string) => {
    if (user && user.id) {
      await deleteBid(bidId, user.id);
      // Refresh the bids list after deletion attempt (whether successful or not)
      await fetchBids();
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5" />
          Bidding
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Place Bid Section */}
          <BidForm 
            listingId={listingId} 
            currentPrice={currentPrice} 
            highestBid={highestBid}
            onBidPlaced={fetchBids}
          />

          {/* Current Bids Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Bids</h3>
            <BidList 
              bids={bids} 
              userProfiles={userProfiles}
              currentUserId={user?.id} 
              isLoading={loadingBids}
              deletingBidId={deletingBidId}
              onDeleteBid={handleDeleteBid}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
