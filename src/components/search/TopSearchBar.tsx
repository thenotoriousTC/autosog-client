
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SearchFilters } from '@/components/SearchFilters';

interface TopSearchBarProps {
  onFilterChange: (filters: any) => void;
}

export const TopSearchBar = ({ onFilterChange }: TopSearchBarProps) => {
  return (
    <div className="fixed top-16 left-0 right-0 z-20 bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <SearchFilters onFilterChange={onFilterChange} expanded={false} />
      </div>
    </div>
  );
};
