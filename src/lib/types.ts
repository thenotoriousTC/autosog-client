
export type CarMake = string;
export type CarModel = string;
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'Plug-in Hybrid' | 'LPG' | 'Other';
export type TransmissionType = 'Manual' | 'Automatic' | 'Semi-Automatic' | 'CVT';
export type BodyType = 'Sedan' | 'Hatchback' | 'Estate' | 'SUV' | 'Coupe' | 'Convertible' | 'Pickup' | 'Van' | 'Other';
export type Color = string;
export type ListingStatus = 'draft' | 'pending' | 'active' | 'sold' | 'rejected';
export type CarCondition = 'NEW' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1';

export interface CarListing {
  id: string;
  title: string;
  make: CarMake;
  model: CarModel;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  color: Color;
  condition: CarCondition;
  description: string;
  features: string[];
  images: string[];
  mainImage: string;
  location: {
    city: string;
    state?: string;
    country: string;
    postalCode: string;
  };
  seller: {
    id: string;
    name: string;
    phone: string;
    email: string;
    type: 'private' | 'dealer';
  };
  createdAt: string;
  updatedAt: string;
  status: ListingStatus;
  views: number;
  featured: boolean;
}

export interface Bid {
  id: string;
  listingId: string;
  userId: string;
  amount: number;
  phoneNumber?: string;
  createdAt: string;
}

export interface SearchFilters {
  make?: CarMake;
  model?: CarModel;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  fuelTypes?: FuelType[];
  transmissions?: TransmissionType[];
  bodyTypes?: BodyType[];
  colors?: Color[];
  sellerType?: 'private' | 'dealer' | 'all';
  location?: string;
  radius?: number;
  keyword?: string;
  sortBy?: 'newest' | 'oldest' | 'lowest-price' | 'highest-price' | 'lowest-mileage' | 'highest-mileage';
}
