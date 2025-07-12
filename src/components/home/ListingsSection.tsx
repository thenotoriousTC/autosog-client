
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CarListing } from '@/lib/types';
import { ListingCard } from '@/components/ListingCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

interface ListingsSectionProps {
  title?: string;
  listings: CarListing[];
  isLoading: boolean;
  gridLayout?: string;
  sectionType?: 'featured' | 'recent' | 'category';
}

export function ListingsSection({ 
  title, 
  listings, 
  isLoading, 
  gridLayout = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  sectionType
}: ListingsSectionProps) {
  const { t } = useTranslation();
  
  const skeletonCards = Array.from({ length: 6 }, (_, i) => (
    <div key={i} className="space-y-3">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ));
  
  // Use translations for category names
  const displayTitle = title || (sectionType === 'featured' ? 
    t('sections.featuredListings') : 
    sectionType === 'recent' ? 
      t('sections.recentListings') : 
      t('sections.categoryListings'));
  
  if (listings.length === 0 && !isLoading) {
    return null; // Don't render empty sections
  }
  
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{displayTitle}</h2>
          {(sectionType === 'featured' || sectionType === 'category') && (
            <Link to="/search" className="text-primary hover:underline">
              {t('search.viewAll')}
            </Link>
          )}
        </div>
        
        {isLoading ? (
          <div className={`grid ${gridLayout}`}>
            {skeletonCards}
          </div>
        ) : listings.length > 0 ? (
          <div className={`grid ${gridLayout}`}>
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">{t('search.noResults')}</p>
        )}
      </div>
    </section>
  );
}
