import { CarListing, CarCondition } from './types';

// Helper function to generate a random date in the past
const randomPastDate = () => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 30) + 1; // Random number between 1 and 30
  const pastDate = new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
  return pastDate.toISOString();
};

// Helper function to generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Sample car makes and models
export const carMakes = [
  'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 
  'Kia', 'Mazda', 'Mercedes', 'Nissan', 'Peugeot', 'Renault', 'Seat', 
  'Skoda', 'Toyota', 'Volkswagen', 'Volvo'
];

export const carModels: Record<string, string[]> = {
  'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'Q3', 'Q5', 'Q7', 'TT', 'e-tron'],
  'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', 'X1', 'X3', 'X5', 'Z4', 'i3'],
  'Citroën': ['C3', 'C4', 'C5', 'Berlingo', 'C3 Aircross', 'C5 Aircross', 'SpaceTourer'],
  'Dacia': ['Sandero', 'Duster', 'Logan', 'Lodgy', 'Spring'],
  'Fiat': ['500', 'Panda', 'Tipo', '500X', 'Doblo', 'Talento'],
  'Ford': ['Fiesta', 'Focus', 'Kuga', 'Puma', 'Mondeo', 'Mustang', 'Explorer'],
  'Honda': ['Civic', 'Jazz', 'CR-V', 'HR-V', 'e'],
  'Hyundai': ['i10', 'i20', 'i30', 'Kona', 'Tucson', 'Santa Fe', 'IONIQ'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Stonic', 'Sportage', 'Sorento', 'e-Niro'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'MX-5'],
  'Mercedes': ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Navara'],
  'Peugeot': ['208', '308', '508', '2008', '3008', '5008', 'Rifter'],
  'Renault': ['Clio', 'Captur', 'Megane', 'Kadjar', 'Scenic', 'Zoe', 'Twingo'],
  'Seat': ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco', 'Alhambra'],
  'Skoda': ['Fabia', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Scala'],
  'Toyota': ['Yaris', 'Corolla', 'C-HR', 'RAV4', 'Prius', 'Aygo', 'Camry'],
  'Volkswagen': ['Polo', 'Golf', 'Passat', 'T-Roc', 'Tiguan', 'Touareg', 'ID.3', 'ID.4'],
  'Volvo': ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90']
};

// Sample body types
export const bodyTypes = ['Sedan', 'Hatchback', 'Estate', 'SUV', 'Coupe', 'Convertible', 'Pickup', 'Van', 'Other'];

// Sample fuel types
export const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'LPG', 'Other'];

// Sample transmission types
export const transmissionTypes = ['Manual', 'Automatic', 'Semi-Automatic', 'CVT'];

// Sample colors
export const colors = ['Black', 'White', 'Silver', 'Gray', 'Blue', 'Red', 'Green', 'Yellow', 'Brown', 'Orange', 'Purple', 'Beige'];

// Sample locations (French cities)
export const locations = [
  { city: 'Paris', country: 'France', postalCode: '75000' },
  { city: 'Lyon', country: 'France', postalCode: '69000' },
  { city: 'Marseille', country: 'France', postalCode: '13000' },
  { city: 'Toulouse', country: 'France', postalCode: '31000' },
  { city: 'Nice', country: 'France', postalCode: '06000' },
  { city: 'Nantes', country: 'France', postalCode: '44000' },
  { city: 'Strasbourg', country: 'France', postalCode: '67000' },
  { city: 'Montpellier', country: 'France', postalCode: '34000' },
  { city: 'Bordeaux', country: 'France', postalCode: '33000' },
  { city: 'Lille', country: 'France', postalCode: '59000' },
];

// Sample features
export const carFeatures = [
  'Air Conditioning', 'Parking Sensors', 'Reversing Camera', 'Navigation System',
  'Bluetooth', 'Cruise Control', 'Heated Seats', 'Sunroof', 'Leather Seats',
  'Apple CarPlay / Android Auto', 'Alloy Wheels', 'Keyless Entry', 'Lane Assist',
  'Climate Control', 'Automatic Headlights', 'Rain Sensing Wipers', 'Start/Stop System',
  'Electric Windows', 'USB Port', 'Adjustable Steering Wheel', 'Fog Lights',
  'Isofix', 'Paddle Shift', 'Voice Control', 'Wireless Charger', 'Panoramic Roof',
  'Hill Start Assist', 'Automatic Emergency Braking', 'Blind Spot Monitor',
  'Adaptive Cruise Control', 'Ambient Lighting', 'Digital Dashboard', 'Speed Limiter',
  'Front & Rear Parking Sensors', 'LED Headlights', 'Tinted Windows', 'Roof Rails'
];

// Generate sample placeholder images for cars
const generatePlaceholderImages = (index: number) => {
  const baseImageCount = 3 + Math.floor(Math.random() * 4); // 3-6 images per listing
  return Array.from({ length: baseImageCount }, (_, i) => {
    const imageNumber = (index * 10 + i) % 15 + 1; // 1-15 (to avoid too many similar images)
    return `https://source.unsplash.com/collection/1901880/600x400?sig=${imageNumber}`;
  });
};

// Generate 50 sample car listings
export const generateMockListings = (): CarListing[] => {
  return Array.from({ length: 50 }, (_, index) => {
    // Select random car make and model
    const make = carMakes[Math.floor(Math.random() * carMakes.length)];
    const model = carModels[make][Math.floor(Math.random() * carModels[make].length)];
    
    // Generate random car details
    const year = 2010 + Math.floor(Math.random() * 13); // 2010-2023
    const mileage = Math.floor(Math.random() * 150000) + 1000;
    const price = Math.floor(Math.random() * 40000) + 5000;
    const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)] as any;
    const transmission = transmissionTypes[Math.floor(Math.random() * transmissionTypes.length)] as any;
    const bodyType = bodyTypes[Math.floor(Math.random() * bodyTypes.length)] as any;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Generate random condition
    const conditionOptions: CarCondition[] = ['NEW', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
    const condition = conditionOptions[Math.floor(Math.random() * conditionOptions.length)];
    
    // Generate random features
    const numFeatures = 5 + Math.floor(Math.random() * 10); // 5-14 features
    const features = [...carFeatures].sort(() => 0.5 - Math.random()).slice(0, numFeatures);
    
    // Select random location
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // Generate images
    const images = generatePlaceholderImages(index);
    const mainImage = images[0];
    
    // Create listing ID
    const id = generateId();
    
    // Set dates
    const createdAt = randomPastDate();
    const updatedAt = createdAt;
    
    // Occasionally mark as featured
    const featured = Math.random() < 0.1; // 10% chance of being featured
    
    return {
      id,
      title: `${year} ${make} ${model} ${fuelType}`,
      make,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      bodyType,
      color,
      condition,
      description: `This ${year} ${make} ${model} is in excellent condition with only ${mileage.toLocaleString()} km. It comes with ${features.slice(0, 3).join(', ')} and many other features. Perfect family car with low consumption and great comfort for long journeys. The car has been well maintained and serviced regularly. Please contact for more information or to arrange a viewing.`,
      features,
      images,
      mainImage,
      location,
      seller: {
        id: `seller-${generateId()}`,
        name: `${Math.random() < 0.7 ? 'Private Seller' : 'AutoDealers Ltd'}`,
        phone: `+33 ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
        email: `seller${index}@example.com`,
        type: Math.random() < 0.7 ? 'private' : 'dealer',
      },
      createdAt,
      updatedAt,
      status: 'active',
      views: Math.floor(Math.random() * 1000),
      featured,
    };
  });
};

// Export mock listings
export const mockListings = generateMockListings();

// Helper function to get featured listings
export const getFeaturedListings = (): CarListing[] => {
  return mockListings.filter(listing => listing.featured).slice(0, 6);
};

// Helper function to get recent listings
export const getRecentListings = (): CarListing[] => {
  return [...mockListings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 12);
};

// Helper function to filter listings
export const filterListings = (filters: any): CarListing[] => {
  return mockListings.filter(listing => {
    // Apply filters if they exist
    if (filters.make && listing.make !== filters.make) return false;
    if (filters.model && listing.model !== filters.model) return false;
    if (filters.minYear && listing.year < filters.minYear) return false;
    if (filters.maxYear && listing.year > filters.maxYear) return false;
    if (filters.minPrice && listing.price < filters.minPrice) return false;
    if (filters.maxPrice && listing.price > filters.maxPrice) return false;
    if (filters.minMileage && listing.mileage < filters.minMileage) return false;
    if (filters.maxMileage && listing.mileage > filters.maxMileage) return false;
    if (filters.fuelTypes && filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(listing.fuelType)) return false;
    if (filters.transmissions && filters.transmissions.length > 0 && !filters.transmissions.includes(listing.transmission)) return false;
    if (filters.bodyTypes && filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(listing.bodyType)) return false;
    if (filters.colors && filters.colors.length > 0 && !filters.colors.includes(listing.color)) return false;
    if (filters.sellerType && filters.sellerType !== 'all' && listing.seller.type !== filters.sellerType) return false;
    if (filters.location && !listing.location.city.toLowerCase().includes(filters.location.toLowerCase())) return false;
    
    // Keyword search in title and description
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const inTitle = listing.title.toLowerCase().includes(keyword);
      const inDescription = listing.description.toLowerCase().includes(keyword);
      if (!inTitle && !inDescription) return false;
    }
    
    return true;
  });
};

// Get a listing by ID
export const getListingById = (id: string): CarListing | undefined => {
  return mockListings.find(listing => listing.id === id);
};

// Helper to get years for filters
export const getYearRange = (): { minYear: number, maxYear: number } => {
  const years = mockListings.map(listing => listing.year);
  return {
    minYear: Math.min(...years),
    maxYear: Math.max(...years)
  };
};

// Helper to get price range for filters
export const getPriceRange = (): { minPrice: number, maxPrice: number } => {
  const prices = mockListings.map(listing => listing.price);
  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices)
  };
};

// Helper to get mileage range for filters
export const getMileageRange = (): { minMileage: number, maxMileage: number } => {
  const mileages = mockListings.map(listing => listing.mileage);
  return {
    minMileage: Math.min(...mileages),
    maxMileage: Math.max(...mileages)
  };
};
