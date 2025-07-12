
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { TopSearchBar } from '@/components/search/TopSearchBar';
import { SearchResultsGrid } from '@/components/search/SearchResultsGrid';
import { useSearchListings } from '@/hooks/useSearchListings';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { listings, loading, fetchInitialListings, handleFilterChange } = useSearchListings();

  useEffect(() => {
    fetchInitialListings(searchParams);
  }, [fetchInitialListings, searchParams]);

  // Create a dynamic title based on search params
  const generateTitle = () => {
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const bodyType = searchParams.get('bodyType');
    
    let title = "Résultats de recherche | AutoSog";
    
    if (make && model) {
      title = `${make} ${model} à vendre en Algérie | AutoSog`;
    } else if (make) {
      title = `Voitures ${make} à vendre en Algérie | AutoSog`;
    } else if (bodyType) {
      title = `${bodyType} à vendre en Algérie | AutoSog`;
    }
    
    return title;
  };

  return (
    <Layout
      title={generateTitle()}
      description="Trouvez des voitures d'occasion et neuves qui correspondent à votre recherche: Fiat Doblo, Renault Clio, Peugeot, Volkswagen Golf et plus."
      keywords="recherche voiture, fiat doblo, renault clio, peugeot, volkswagen golf, bon prix, essence, diesel, gpl"
    >
      <div className="flex flex-col">
        {/* Fixed position search bar */}
        <div className="fixed top-16 left-0 right-0 z-10 bg-white border-b shadow-sm">
          <TopSearchBar onFilterChange={handleFilterChange} />
        </div>
        
        {/* Add padding to account for the fixed search bar */}
        <div className="mt-52 md:mt-40 container mx-auto px-4 py-6">
          <SearchResultsGrid listings={listings} loading={loading} />
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
