import React from 'react';
import { Bid } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Clock, Trash2, Phone } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
}

interface BidListProps {
  bids: Bid[];
  userProfiles: Record<string, UserProfile>;
  currentUserId?: string;
  isLoading: boolean;
  deletingBidId?: string | null;
  onDeleteBid?: (bidId: string) => void;
}

export function BidList({ 
  bids, 
  userProfiles, 
  currentUserId, 
  isLoading, 
  deletingBidId,
  onDeleteBid 
}: BidListProps) {
  const [bidToDelete, setBidToDelete] = React.useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <p className="text-center py-4 text-muted-foreground">
        No bids have been placed yet. Be the first to bid!
      </p>
    );
  }

  // Helper function to get user display name
  const getUserDisplayName = (userId: string) => {
    // Current user is always displayed as "You"
    if (userId === currentUserId) {
      return 'You';
    }
    
    const profile = userProfiles[userId];
    
    if (profile) {
      const firstName = profile.first_name || '';
      const lastName = profile.last_name || '';
      
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      } else if (firstName) {
        return firstName;
      } else if (lastName) {
        return lastName;
      }
    }
    
    return 'Anonymous User';
  };

  // Helper function to get user initials for avatar
  const getUserInitials = (userId: string) => {
    if (userId === currentUserId) {
      return 'YU';
    }
    
    const profile = userProfiles[userId];
    if (profile) {
      const firstName = profile.first_name || '';
      const lastName = profile.last_name || '';
      
      const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
      const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
      
      return firstInitial + lastInitial || 'AU';
    }
    
    return 'AU';
  };

  // Handle confirming bid deletion
  const handleDeleteConfirm = () => {
    if (bidToDelete && onDeleteBid) {
      onDeleteBid(bidToDelete);
    }
    setBidToDelete(null);
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string | undefined) => {
    if (!phone) return 'Not provided';
    return phone;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bidder</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Date</TableHead>
            {currentUserId && <TableHead className="w-[80px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bids.map((bid) => (
            <TableRow key={bid.id}>
              <TableCell className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {getUserInitials(bid.userId)}
                  </AvatarFallback>
                </Avatar>
                <span className={bid.userId === currentUserId ? "font-medium" : ""}>
                  {getUserDisplayName(bid.userId)}
                </span>
              </TableCell>
              <TableCell className="font-medium">{formatCurrency(bid.amount)}</TableCell>
              <TableCell className="text-muted-foreground">
                {bid.phoneNumber ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center cursor-pointer">
                          <Phone className="mr-2 h-4 w-4" />
                          <span className="text-sm">{formatPhoneNumber(bid.phoneNumber)}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Call: {bid.phoneNumber}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground/50" />
                    <span className="text-sm text-muted-foreground/50">Not provided</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {new Date(bid.createdAt).toLocaleDateString()}
                </div>
              </TableCell>
              {currentUserId && (
                <TableCell>
                  {bid.userId === currentUserId && (
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={deletingBidId === bid.id}
                      onClick={() => setBidToDelete(bid.id)}
                    >
                      {deletingBidId === bid.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-destructive"></div>
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!bidToDelete} onOpenChange={(open) => !open && setBidToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bid</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this bid? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
