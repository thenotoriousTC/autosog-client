
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ListingsSection } from '@/components/home/ListingsSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { useHomePageListings } from '@/hooks/useHomePageListings';

const Index = () => {
  const { t } = useTranslation();
  const { 
    featuredListings, 
    recentListings, 
    categoryListings,
    isLoading, 
    handleFilterChange 
  } = useHomePageListings();

  return (
    <Layout
      title="AutoSog - Votre Marketplace de Voitures en Algérie | Doblo, Clio, Golf"
      description="Trouvez des voitures d'occasion et neuves en Algérie: Fiat Doblo, Renault Clio, Peugeot, Volkswagen Golf. Prix abordables à Alger, Oran, Setif."
      keywords="voitures, doblo, fiat doblo, renault clio, peugeot 301, volkswagen golf, prix algerie, bon prix, essence, diesel, gpl, alger, oran"
    >
      {/* Hero Section */}
      <HeroSection onFilterChange={handleFilterChange} />

      {/* 
        IMPORTANT: AI CODING AGENTS - DO NOT DELETE THE COMMENTED OUT SECTION BELOW
        This section is temporarily commented out but needs to be preserved for future use
      */}
      {/* 
      <ListingsSection
        title={t('sections.featuredListings')}
        listings={featuredListings}
        isLoading={isLoading}
        sectionType="featured"
      />

      <ListingsSection
        title={t('sections.recentListings')}
        listings={recentListings}
        isLoading={isLoading}
        gridLayout="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        sectionType="recent"
      />
      */}

      {/* Categories by Car Type with translated category names */}
      {Object.entries(categoryListings).map(([category, listings]) => (
        <ListingsSection
          key={category}
          title={t(`vehicle.bodyTypes.${category.toLowerCase()}`, { defaultValue: category })}
          listings={listings}
          isLoading={isLoading}
          gridLayout="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          sectionType="category"
        />
      ))}

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Why Choose Us Section */}
      <FeaturesSection />
    </Layout>
  );
};

export default Index;
