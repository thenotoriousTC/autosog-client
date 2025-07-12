import React from 'react';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { SearchFilters } from '@/components/SearchFilters';
import { SearchFilters as SearchFiltersType } from '@/lib/types';

interface HeroSectionProps {
  onFilterChange: (filters: SearchFiltersType) => Promise<void>;
}

export function HeroSection({ onFilterChange }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/hero-background.jpg')",
          backgroundColor: "gray" // Fallback
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchFilters onFilterChange={onFilterChange} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
