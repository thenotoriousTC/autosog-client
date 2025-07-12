import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, LogOut, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';

interface PendingListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: string;
  created_at: string;
  user_id: string;
}

// Define a type for the data passed to the row component
interface ListingRowData {
  items: PendingListing[];
  removeListingFn: (id: string) => void;
}

// Create a Row component to render each listing with proper typing
const ListingRow = React.memo((props: ListChildComponentProps<ListingRowData>) => {
  const { data, index, style } = props;
  const listing = data.items[index];
  
  return (
    <div style={style} className="border-b border-muted hover:bg-muted/50">
      <div className="flex flex-wrap h-full items-center">
        <div className="w-3/12 p-3">{listing.title}</div>
        <div className="w-2/12 p-3">{listing.make} {listing.model}</div>
        <div className="w-1/12 p-3">{listing.year}</div>
        <div className="w-2/12 p-3">{formatCurrency(listing.price)}</div>
        <div className="w-2/12 p-3">{new Date(listing.created_at).toLocaleDateString()}</div>
        <div className="w-2/12 p-3">
          <div className="flex gap-2">
            <Button
              onClick={() => data.removeListingFn(listing.id)}
              variant="destructive"
              size="sm"
            >
              <XCircle className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

const AdminDashboard = () => {
  const [listings, setListings] = useState<PendingListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin, adminLogout } = useAdmin();
  const navigate = useNavigate();
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Memoize fetchAllListings with useCallback
  const fetchAllListings = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('car_listings')
        .select('id, title, make, model, year, price, status, created_at, user_id')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log("Fetched all listings:", data);
      setListings(data || []);
    } catch (error: any) {
      console.error("Error fetching listings:", error);
      toast({
        title: "Error fetching listings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]); // Include toast in dependencies

  useEffect(() => {
    if (isAdmin) {
      fetchAllListings();
    }
  }, [isAdmin, fetchAllListings]); // Include fetchAllListings in dependencies

  // Memoize removeListing with useCallback
  const removeListing = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('car_listings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      console.log(`Listing ${id} removed`);
      
      toast({
        title: "Listing removed",
        description: "The listing has been removed from the platform.",
        variant: "default"
      });
      
      // Update the local state by filtering out the removed listing
      setListings(listings.filter(listing => listing.id !== id));
    } catch (error: any) {
      console.error("Error removing listing:", error);
      toast({
        title: "Error removing listing",
        description: error.message,
        variant: "destructive"
      });
    }
  }, [toast, listings]); // Include toast and listings in dependencies

  // Memoize handleLogout with useCallback
  const handleLogout = useCallback(() => {
    adminLogout();
    navigate('/admin/login');
  }, [adminLogout, navigate]); // Include adminLogout and navigate in dependencies

  // Use useMemo to derive filtered listings statistics
  const listingStats = useMemo(() => {
    if (!listings.length) return { total: 0, pending: 0, active: 0, sold: 0, rejected: 0 };
    
    return {
      total: listings.length,
      pending: listings.filter(l => l.status === 'pending').length,
      active: listings.filter(l => l.status === 'active').length,
      sold: listings.filter(l => l.status === 'sold').length,
      rejected: listings.filter(l => l.status === 'rejected').length
    };
  }, [listings]);

  // Create a memoized version of listings with the removal function attached
  const listingsWithFunctions = useMemo((): ListingRowData => {
    return {
      items: listings,
      removeListingFn: removeListing
    };
  }, [listings, removeListing]);

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
          <p>You need to be logged in as an admin to view this page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          
          {/* Admin Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Shield className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Administrator</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    admin@autosog.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center cursor-pointer" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>All Listings</CardTitle>
            <CardDescription>
              View and manage all listings on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={fetchAllListings} 
                className="mb-4"
                disabled={loading}
              >
                Refresh Listings
              </Button>
              
              {loading ? (
                <p>Loading listings...</p>
              ) : listings.length === 0 ? (
                <p>No listings found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <div className="w-full">
                    <div className="bg-muted p-3">
                      <div className="flex flex-wrap">
                        <div className="w-3/12 font-medium">Title</div>
                        <div className="w-2/12 font-medium">Make/Model</div>
                        <div className="w-1/12 font-medium">Year</div>
                        <div className="w-2/12 font-medium">Price</div>
                        <div className="w-2/12 font-medium">Date</div>
                        <div className="w-2/12 font-medium">Actions</div>
                      </div>
                    </div>
                    
                    <div ref={listContainerRef} style={{ height: '500px' }}>
                      <List
                        height={500}
                        width="100%"
                        itemCount={listings.length}
                        itemSize={60}
                        itemData={listingsWithFunctions}
                      >
                        {ListingRow}
                      </List>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{listingStats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{listingStats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{listingStats.sold}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">{listingStats.rejected}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
