import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Phone, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BidFormProps {
  listingId: string;
  currentPrice: number;
  highestBid: number | null;
  onBidPlaced: () => void;
}

export function BidForm({ listingId, currentPrice, highestBid, onBidPlaced }: BidFormProps) {
  const [bidAmount, setBidAmount] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Place a bid
  const placeBid = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'You need to be signed in to place a bid.',
        variant: 'destructive'
      });
      return;
    }

    const amount = parseFloat(bidAmount);
    
    // Basic validation
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid bid amount.',
        variant: 'destructive'
      });
      return;
    }

    if (amount <= currentPrice) {
      toast({
        title: 'Bid Too Low',
        description: 'Your bid must be higher than the current price.',
        variant: 'destructive'
      });
      return;
    }

    // Check if there's a higher bid
    if (highestBid !== null && amount <= highestBid) {
      toast({
        title: 'Bid Too Low',
        description: 'Your bid must be higher than the current highest bid.',
        variant: 'destructive'
      });
      return;
    }

    // Validate phone number
    if (!phoneNumber || phoneNumber.trim() === '') {
      toast({
        title: 'Phone Number Required',
        description: 'Please enter your phone number.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    setHasError(false);
    
    try {
      // First try with phone_number field
      const { error } = await supabase
        .from('bids')
        .insert({
          listing_id: listingId,
          user_id: user.id,
          amount: amount,
          phone_number: phoneNumber
        });
      
      if (error) {
        console.error('Error placing bid with phone number:', error);
        
        // If the error is likely due to missing phone_number column, try without it
        if (error.message.includes('phone_number') || error.code === '42703') {
          console.log('Attempting to place bid without phone number field');
          
          const { error: fallbackError } = await supabase
            .from('bids')
            .insert({
              listing_id: listingId,
              user_id: user.id,
              amount: amount
            });
            
          if (fallbackError) {
            console.error('Fallback bid placement also failed:', fallbackError);
            throw fallbackError;
          } else {
            // Fallback worked, but show a warning
            setHasError(true);
            toast({
              title: 'Bid Placed with Warning',
              description: 'Your bid was placed, but without the phone number. Contact the administrator to update the database.',
              variant: 'default'
            });
          }
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Bid Placed!',
          description: `Your bid of ${formatCurrency(amount)} has been placed.`,
        });
      }
      
      // Clear input and refresh bids
      setBidAmount('');
      onBidPlaced();
    } catch (error: any) {
      console.error('Error placing bid:', error);
      toast({
        title: 'Error',
        description: 'Failed to place bid. Please try again or contact support.',
        variant: 'destructive'
      });
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Place Your Bid</h3>
      
      {hasError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            There was an issue with the database. The administrator needs to run the SQL script to add the phone_number column.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="bidAmount">Bid Amount</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="bidAmount"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter amount"
              min={highestBid ? highestBid + 1 : currentPrice + 1}
              step="0.01"
              disabled={isLoading || !user}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Phone className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              disabled={isLoading || !user}
              className="pl-10"
            />
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={placeBid} 
          disabled={isLoading || !user}
        >
          {isLoading ? 'Placing Bid...' : 'Place Bid'}
        </Button>
      </div>
      {!user && (
        <p className="text-sm text-muted-foreground">
          You need to be signed in to place a bid.
        </p>
      )}
    </div>
  );
}
