
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Gauge, Heart, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CarListing } from '@/lib/types';
import { cn, formatCurrency } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { ListingStatusBanner } from './ListingStatusBanner';

interface ListingCardProps {
  listing: CarListing;
  featured?: boolean;
  className?: string;
  showStatus?: boolean;
}

export function ListingCard({ listing, featured = false, className, showStatus = false }: ListingCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();
  
  // Check if this is the user's own listing
  const isOwnListing = user && user.id === listing.seller.id;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Translate vehicle details
  const translateFuelType = (fuelType: string) => t(`vehicle.fuelTypes.${fuelType.toLowerCase()}`, { defaultValue: fuelType });
  const translateTransmission = (transmission: string) => t(`vehicle.transmissionTypes.${transmission.toLowerCase()}`, { defaultValue: transmission });
  const translateBodyType = (bodyType: string) => t(`vehicle.bodyTypes.${bodyType.toLowerCase()}`, { defaultValue: bodyType });

  return (
    <Link 
      to={`/listing/${listing.id}`} 
      className={cn(
        'group relative bg-white rounded-xl overflow-hidden shadow-elevation-low hover:shadow-elevation-medium transition-all duration-300',
        featured ? 'lg:row-span-2 lg:col-span-2' : '',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status banner for own listings */}
      {(showStatus || isOwnListing) && (
        <div className="absolute top-0 left-0 right-0 z-10">
          <ListingStatusBanner status={listing.status} />
        </div>
      )}
      
      {/* Image container */}
      <div className="relative overflow-hidden">
        <div className={cn(
          "aspect-[4/3]",
          featured ? "md:aspect-[16/9]" : ""
        )}>
          <img 
            src={listing.mainImage} 
            alt={listing.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              imageLoaded ? "blur-0 scale-100" : "blur-sm scale-105",
              isHovered ? "scale-105" : "scale-100"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Floating elements on the image */}
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          {/* Featured badge */}
          {listing.featured && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-md font-medium animate-fade-in">
              {t('featured', 'Featured')}
            </span>
          )}
          
          {/* Favorite button */}
          <button 
            onClick={toggleFavorite}
            className={cn(
              "ml-auto p-2 rounded-full transition-all duration-300 transform",
              isFavorite ? 
                "bg-destructive text-white scale-105" : 
                "bg-white/80 backdrop-blur-sm text-foreground hover:bg-white"
            )}
          >
            <Heart size={16} className={isFavorite ? "fill-white" : ""} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{listing.title}</h3>
          <p className="text-lg font-bold text-primary">{formatCurrency(listing.price)}</p>
        </div>
        
        {/* Car details */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{listing.year}</span>
            </div>
            <div className="flex items-center">
              <Gauge className="mr-1 h-4 w-4" />
              <span>{listing.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{listing.location.city}</span>
            </div>
          </div>
          
          {/* Tags with translations */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
              {translateFuelType(listing.fuelType)}
            </span>
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
              {translateTransmission(listing.transmission)}
            </span>
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
              {translateBodyType(listing.bodyType)}
            </span>
          </div>
        </div>
      </div>
      
      {/* View details overlay on hover */}
      <div className={cn(
        "absolute inset-0 bg-primary/10 backdrop-blur-xs flex items-center justify-center opacity-0 transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <div className="bg-white rounded-full py-2 px-4 shadow-elevation-medium flex items-center font-medium">
          {t('viewDetails', 'View Details')} <ArrowUpRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

export default React.memo(ListingCard, (prevProps, nextProps) => {
  // Custom comparison function for deep comparison of the listing object
  return prevProps.listing.id === nextProps.listing.id && 
         prevProps.featured === nextProps.featured &&
         prevProps.showStatus === nextProps.showStatus;
});
