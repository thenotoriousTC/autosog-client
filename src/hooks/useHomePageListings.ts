
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CarListing, FuelType, TransmissionType, BodyType, CarCondition, ListingStatus, SearchFilters } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function useHomePageListings() {
  const [featuredListings, setFeaturedListings] = useState<CarListing[]>([]);
  const [recentListings, setRecentListings] = useState<CarListing[]>([]);
  const [categoryListings, setCategoryListings] = useState<Record<string, CarListing[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Map database records to CarListing type
  const mapDbToListing = useCallback((items: any[]): CarListing[] => items.map(item => ({
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
      city: typeof item.location === 'object' ? String(item.location?.city || '') : '',
      state: typeof item.location === 'object' ? String(item.location?.state || '') : '',
      country: typeof item.location === 'object' ? String(item.location?.country || '') : '',
      postalCode: typeof item.location === 'object' ? String(item.location?.postalCode || '') : ''
    },
    seller: {
      id: typeof item.seller === 'object' ? String(item.seller?.id || '') : '',
      name: typeof item.seller === 'object' ? String(item.seller?.name || '') : '',
      phone: typeof item.seller === 'object' ? String(item.seller?.phone || '') : '',
      email: typeof item.seller === 'object' ? String(item.seller?.email || '') : '',
      type: typeof item.seller === 'object' ? 
        ((String(item.seller?.type) === 'private' || String(item.seller?.type) === 'dealer') ? 
          (String(item.seller?.type) as 'private' | 'dealer') : 'private') : 'private'
    },
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    status: item.status as ListingStatus,
    views: item.views,
    featured: item.featured
  })), []);

  // Fetch both featured, recent, and category-based listings
  const fetchListings = useCallback(async () => {
    try {
      setIsLoading(true);
      
      console.log("Fetching featured listings with status: active");
      // Fetch featured listings
      const { data: featuredData, error: featuredError } = await supabase
        .from('car_listings')
        .select('*')
        .eq('featured', true)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (featuredError) throw featuredError;
      console.log("Featured listings fetched:", featuredData);
      
      console.log("Fetching recent listings with status: active");
      // Fetch recent listings
      const { data: recentData, error: recentError } = await supabase
        .from('car_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(12);
      
      if (recentError) throw recentError;
      console.log("Recent listings fetched:", recentData);
      
      console.log("Fetching all listings for category organization");
      // Fetch all listings to organize by category
      const { data: allListings, error: allListingsError } = await supabase
        .from('car_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
        
      if (allListingsError) throw allListingsError;
      console.log("All listings fetched for categories:", allListings?.length || 0);
      
      // Convert to CarListing type
      const mappedListings = mapDbToListing(allListings || []);
      
      // Organize by body type (category)
      const categorizedListings: Record<string, CarListing[]> = {};
      mappedListings.forEach(listing => {
        const category = listing.bodyType;
        if (!categorizedListings[category]) {
          categorizedListings[category] = [];
        }
        if (categorizedListings[category].length < 6) { // Limit to 6 per category
          categorizedListings[category].push(listing);
        }
      });
      
      console.log("Listings organized by categories:", Object.keys(categorizedListings));
      
      // Set state with the fetched and organized data
      setFeaturedListings(mapDbToListing(featuredData || []));
      setRecentListings(mapDbToListing(recentData || []));
      setCategoryListings(categorizedListings);
    } catch (error: any) {
      toast({
        title: "Error loading listings",
        description: error.message,
        variant: "destructive"
      });
      console.error("Error loading listings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [mapDbToListing, toast]);

  // Handle filter changes
  const handleFilterChange = async (filters: SearchFilters) => {
    try {
      setIsLoading(true);
      
      let query = supabase
        .from('car_listings')
        .select('*')
        .eq('status', 'active');
      
      // Apply filters
      if (filters.make) {
        query = query.eq('make', filters.make);
      }
      
      if (filters.model) {
        query = query.eq('model', filters.model);
      }
      
      if (filters.minYear) {
        query = query.gte('year', filters.minYear);
      }
      
      if (filters.maxYear) {
        query = query.lte('year', filters.maxYear);
      }
      
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      
      // Execute query
      const { data, error } = await query.order('created_at', { ascending: false }).limit(12);
      
      if (error) throw error;
      
      // Update listings for filtered results
      const mappedListings = mapDbToListing(data || []);
      
      // Organize filtered results by category
      const categorizedListings: Record<string, CarListing[]> = {};
      mappedListings.forEach(listing => {
        const category = listing.bodyType;
        if (!categorizedListings[category]) {
          categorizedListings[category] = [];
        }
        categorizedListings[category].push(listing);
      });
      
      setCategoryListings(categorizedListings);
    } catch (error: any) {
      toast({
        title: "Error applying filters",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    featuredListings,
    recentListings,
    categoryListings,
    isLoading,
    handleFilterChange,
    fetchListings
  };
}
