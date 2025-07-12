
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CarListing, FuelType, TransmissionType, BodyType, CarCondition, ListingStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export const useSearchListings = () => {
  const [listings, setListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Helper function to map database records to CarListing type
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

  const fetchInitialListings = useCallback(async (searchParams: URLSearchParams) => {
    // Debug: log incoming searchParams
    console.log('fetchInitialListings - searchParams:', Object.fromEntries(searchParams.entries()));
    try {
      setLoading(true);
      
      // Prepare the query
      let query = supabase
        .from('car_listings')
        .select('*')
        .eq('status', 'active');
      
      // Apply filters from URL if present
      const keyword = searchParams.get('keyword');
      const make = searchParams.get('make');
      const model = searchParams.get('model');
      const minYear = searchParams.get('minYear');
      const maxYear = searchParams.get('maxYear');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const fuelTypes = searchParams.get('fuelTypes');
      const transmissions = searchParams.get('transmissions');
      const bodyTypes = searchParams.get('bodyTypes');
      const location = searchParams.get('location');
      const sortBy = searchParams.get('sortBy') || 'newest';
      
      if (make) {
        query = query.eq('make', make);
      }
      
      if (model) {
        query = query.eq('model', model);
      }
      
      if (minYear) {
        query = query.gte('year', parseInt(minYear));
      }
      
      if (maxYear) {
        query = query.lte('year', parseInt(maxYear));
      }
      
      if (minPrice) {
        query = query.gte('price', parseInt(minPrice));
      }
      
      if (maxPrice) {
        query = query.lte('price', parseInt(maxPrice));
      }
      
      // Try to use ilike for keyword search in title/description if keyword is present
      if (keyword) {
        // Supabase: ilike for case-insensitive partial match
        // Note: this will only filter by title; for more fields, use or() if supported
        query = query.or(
          `title.ilike.%${keyword}%,description.ilike.%${keyword}%,make.ilike.%${keyword}%,model.ilike.%${keyword}%`
        );
      }
      
      // Add ordering based on sortBy
      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'oldest') {
        query = query.order('created_at', { ascending: true });
      } else if (sortBy === 'lowest-price') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'highest-price') {
        query = query.order('price', { ascending: false });
      } else if (sortBy === 'lowest-mileage') {
        query = query.order('mileage', { ascending: true });
      } else if (sortBy === 'highest-mileage') {
        query = query.order('mileage', { ascending: false });
      }
      
      // Execute the query
      const { data, error } = await query;
      
      if (error) throw error;
      
      console.log("Fetched data from Supabase:", data);
      
      // Map database records to CarListing type
      const mappedListings = mapDbToListing(data || []);
      console.log("Mapped Listings:", mappedListings);
      
      // If keyword is present, filter in memory (fallback in case ilike/or not supported)
      let filteredListings = mappedListings;
      if (keyword) {
        const keywordLower = keyword.toLowerCase();
        filteredListings = mappedListings.filter(listing => {
          // Defensive: check fields exist
          return (
            (listing.title && listing.title.toLowerCase().includes(keywordLower)) ||
            (listing.description && listing.description.toLowerCase().includes(keywordLower)) ||
            (listing.make && listing.make.toLowerCase().includes(keywordLower)) ||
            (listing.model && listing.model.toLowerCase().includes(keywordLower))
          );
        });
      }
      console.log('Keyword used:', keyword);
      console.log('Filtered Listings:', filteredListings);
      
      // If fuel types filter is present
      if (fuelTypes) {
        const fuelTypesArray = fuelTypes.split(',');
        filteredListings = filteredListings.filter(listing => 
          fuelTypesArray.includes(listing.fuelType)
        );
      }
      
      // If transmissions filter is present
      if (transmissions) {
        const transmissionsArray = transmissions.split(',');
        filteredListings = filteredListings.filter(listing => 
          transmissionsArray.includes(listing.transmission)
        );
      }
      
      // If body types filter is present
      if (bodyTypes) {
        const bodyTypesArray = bodyTypes.split(',');
        filteredListings = filteredListings.filter(listing => 
          bodyTypesArray.includes(listing.bodyType)
        );
      }
      
      // If location filter is present
      if (location) {
        const locationLower = location.toLowerCase();
        filteredListings = filteredListings.filter(listing => 
          listing.location.city.toLowerCase().includes(locationLower) ||
          (listing.location.state && listing.location.state.toLowerCase().includes(locationLower)) ||
          listing.location.country.toLowerCase().includes(locationLower)
        );
      }
      
      setListings(filteredListings);
    } catch (error: any) {
      console.error("Error fetching listings:", error);
      toast({
        title: "Error loading listings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [mapDbToListing, toast]);

  // Refactored: handleFilterChange no longer fetches listings directly.
  // It is now a no-op or can be removed. The only source of truth is fetchInitialListings triggered by useEffect in SearchResults.tsx.
  // Refactored: handleFilterChange is now a no-op. All fetching is handled by fetchInitialListings in SearchResults.tsx.
  const handleFilterChange = () => {};


  return { listings, loading, fetchInitialListings, handleFilterChange };
};
