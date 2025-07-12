
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { ListingCard } from '@/components/ListingCard';
import { supabase } from '@/integrations/supabase/client';
import { CarListing, FuelType, TransmissionType, BodyType, CarCondition, ListingStatus } from '@/lib/types';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function MyListings() {
  const { user, isLoading } = useAuth();
  const [listings, setListings] = useState<CarListing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserListings(user.id);
    }
  }, [user]);

  const fetchUserListings = async (userId: string) => {
    try {
      setIsLoadingListings(true);
      const { data, error } = await supabase
        .from('car_listings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Map the database fields to our CarListing type
      const mappedListings: CarListing[] = (data || []).map(item => {
        // Parse location and seller as objects safely
        const location = typeof item.location === 'object' && item.location !== null ? item.location as Record<string, any> : {};
        const seller = typeof item.seller === 'object' && item.seller !== null ? item.seller as Record<string, any> : {};
        
        return {
          id: item.id,
          title: item.title,
          make: item.make,
          model: item.model,
          year: item.year,
          price: item.price,
          mileage: item.mileage,
          fuelType: item.fuel_type as FuelType,
          transmission: item.transmission as TransmissionType,
          bodyType: item.body_type as BodyType,
          color: item.color,
          condition: item.condition as CarCondition,
          description: item.description,
          features: item.features || [],
          images: item.images || [],
          mainImage: item.main_image || '',
          location: {
            city: location.city ? String(location.city) : '',
            state: location.state ? String(location.state) : '',
            country: location.country ? String(location.country) : '',
            postalCode: location.postalCode ? String(location.postalCode) : ''
          },
          seller: {
            id: seller.id ? String(seller.id) : '',
            name: seller.name ? String(seller.name) : '',
            phone: seller.phone ? String(seller.phone) : '',
            email: seller.email ? String(seller.email) : '',
            type: (seller.type === 'private' || seller.type === 'dealer') ? 
              (String(seller.type) as 'private' | 'dealer') : 'private'
          },
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          status: item.status as ListingStatus,
          views: item.views,
          featured: item.featured
        };
      });

      setListings(mappedListings);
    } catch (error: any) {
      toast({
        title: "Error fetching listings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoadingListings(false);
    }
  };

  if (isLoading || isLoadingListings) {
    return (
      <Layout>
        <div className="container mx-auto py-20 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Listings</h1>
            <p className="text-muted-foreground mt-1">Manage your car listings</p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <Link to="/create-listing">
              <Plus className="mr-2 h-4 w-4" /> Create New Listing
            </Link>
          </Button>
        </div>

        {listings.length === 0 ? (
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">No listings yet</h3>
            <p className="text-muted-foreground mb-6">You haven't created any car listings yet.</p>
            <Button asChild>
              <Link to="/create-listing">
                <Plus className="mr-2 h-4 w-4" /> Create Your First Listing
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                showStatus={false}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
