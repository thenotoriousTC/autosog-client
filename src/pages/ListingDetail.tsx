
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CarListing } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { BidSection } from '@/components/bidding/BidSection';
import { ImageGallery } from '@/components/listing/ImageGallery';
import { VehicleSpecifications } from '@/components/listing/VehicleSpecifications';
import { ListingDescription } from '@/components/listing/ListingDescription';
import { ListingFeatures } from '@/components/listing/ListingFeatures';
import { ListingLocation } from '@/components/listing/ListingLocation';
import { ListingSummary } from '@/components/listing/ListingSummary';
import { SellerInfo } from '@/components/listing/SellerInfo';
import { SafetyTips } from '@/components/listing/SafetyTips';
import { ListingStats } from '@/components/listing/ListingStats';
import { ListingBreadcrumb } from '@/components/listing/ListingBreadcrumb';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<CarListing | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Transform data from Supabase format to our CarListing type
  const transformListingData = useCallback((data: any): CarListing => {
    return {
      id: data.id,
      title: data.title,
      make: data.make,
      model: data.model,
      year: data.year,
      price: data.price,
      mileage: data.mileage,
      fuelType: data.fuel_type,
      transmission: data.transmission,
      bodyType: data.body_type,
      color: data.color,
      condition: data.condition,
      description: data.description,
      features: data.features || [],
      images: data.images || [],
      mainImage: data.main_image || '',
      location: data.location || { city: '', country: '' },
      seller: data.seller || { name: '', type: 'private', phone: '' },
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      status: data.status,
      views: data.views || 0,
      featured: data.featured || false,
    };
  }, []);

  // Fetch listing data
  useEffect(() => {
    let isMounted = true;
    
    const fetchListing = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('car_listings')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data && isMounted) {
          const transformedData = transformListingData(data);
          setListing(transformedData);
          
          // Increment view count in a separate call
          incrementViews(transformedData.views);
        }
      } catch (error: any) {
        console.error('Error fetching listing:', error);
        if (isMounted) {
          toast({
            title: 'Error',
            description: 'Failed to load listing details. Please try again.',
            variant: 'destructive'
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    const incrementViews = async (currentViews: number) => {
      if (!id) return;
      
      try {
        const { error } = await supabase
          .from('car_listings')
          .update({ views: currentViews + 1 })
          .eq('id', id);
          
        if (error) throw error;
        
        // Only update local state if component is still mounted
        if (isMounted) {
          setListing(prev => prev ? {...prev, views: prev.views + 1} : null);
        }
      } catch (error) {
        console.error('Error incrementing views:', error);
      }
    };
    
    fetchListing();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id, toast, transformListingData]);

  // Skeleton loader for the detail page
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="w-full h-96 rounded-lg" />
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-24 h-24 rounded-md" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="w-full h-12 mb-4" />
              <Skeleton className="w-3/4 h-8 mb-4" />
              <Skeleton className="w-full h-40" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
          <p className="mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  const sellerJoinDate = listing.createdAt && !isNaN(new Date(listing.createdAt).getTime()) 
    ? new Date(listing.createdAt).toLocaleDateString() 
    : undefined;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <ListingBreadcrumb make={listing.make} model={listing.model} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Images and details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <ImageGallery 
              images={listing.images} 
              mainImage={listing.mainImage} 
              title={listing.title} 
              status={listing.status}
              featured={listing.featured}
            />

            {/* Vehicle details */}
            <VehicleSpecifications 
              make={listing.make}
              model={listing.model}
              year={listing.year}
              bodyType={listing.bodyType}
              fuelType={listing.fuelType}
              transmission={listing.transmission}
              color={listing.color}
              mileage={listing.mileage}
              condition={listing.condition}
            />
            
            {/* Description */}
            <ListingDescription description={listing.description} />
            
            {/* Features */}
            <ListingFeatures features={listing.features} />
            
            {/* Location */}
            <ListingLocation 
              city={listing.location.city} 
              state={listing.location.state} 
              country={listing.location.country} 
            />
            
            {/* Bidding section */}
            <BidSection 
              listingId={listing.id} 
              currentPrice={listing.price} 
            />
          </div>
          
          {/* Right column: Summary and contact */}
          <div className="space-y-6">
            {/* Title and price */}
            <ListingSummary 
              title={listing.title}
              year={listing.year}
              mileage={listing.mileage}
              city={listing.location.city}
              price={listing.price}
            />
            
            {/* Seller information */}
            <SellerInfo 
              name={listing.seller.name}
              type={listing.seller.type}
              phone={listing.seller.phone}
              email={listing.seller.email}
              joinDate={sellerJoinDate}
            />
            
            {/* Listing stats */}
            <ListingStats 
              views={listing.views} 
              createdAt={listing.createdAt} 
            />
            
            {/* Safety tips */}
            <SafetyTips />
          </div>
        </div>
      </div>
    </Layout>
  );
}
