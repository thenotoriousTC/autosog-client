
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { ListingCard } from '@/components/ListingCard';
import { CarListing } from '@/lib/types';

interface SearchResultsGridProps {
  listings: CarListing[];
  loading: boolean;
}

export const SearchResultsGrid = ({ listings, loading }: SearchResultsGridProps) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-primary animate-spin mr-2" />
        <span>{t('search.loading')}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">{t('search.noResults')}</h2>
          <p className="text-muted-foreground">{t('search.noResults')}</p>
        </div>
      )}
    </div>
  );
};
