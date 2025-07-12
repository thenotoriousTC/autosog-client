import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Sliders, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  carMakes, 
  carModels, 
  bodyTypes, 
  fuelTypes, 
  transmissionTypes, 
  getYearRange, 
  getPriceRange,
  getMileageRange
} from '@/lib/data';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  className?: string;
  expanded?: boolean;
}

export function SearchFilters({ onFilterChange, className, expanded = false }: SearchFiltersProps) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  
  // Get ranges for sliders
  const { minYear, maxYear } = getYearRange();
  const { minPrice, maxPrice } = getPriceRange();
  const { minMileage, maxMileage } = getMileageRange();
  
  // Filter states
  const [keyword, setKeyword] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [minYearValue, setMinYearValue] = useState(minYear);
  const [maxYearValue, setMaxYearValue] = useState(maxYear);
  const [minPriceValue, setMinPriceValue] = useState(minPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(maxPrice);
  const [minMileageValue, setMinMileageValue] = useState(minMileage);
  const [maxMileageValue, setMaxMileageValue] = useState(maxMileage);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [sellerType, setSellerType] = useState('all');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const activeFilterCount = [
    make, model, 
    minYearValue > minYear, maxYearValue < maxYear,
    minPriceValue > minPrice, maxPriceValue < maxPrice,
    minMileageValue > minMileage, maxMileageValue < maxMileage,
    selectedFuelTypes.length > 0, selectedBodyTypes.length > 0,
    selectedTransmissions.length > 0, 
    sellerType !== 'all', location
  ].filter(Boolean).length;

  // Initialize from URL params
  useEffect(() => {
    const makeParam = searchParams.get('make') || '';
    const modelParam = searchParams.get('model') || '';
    const keywordParam = searchParams.get('keyword') || '';
    
    // Use different variable names to avoid the "used before declaration" error
    const minYearParam = searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : minYear;
    const maxYearParam = searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : maxYear;
    const minPriceParam = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : minPrice;
    const maxPriceParam = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : maxPrice;
    const minMileageParam = searchParams.get('minMileage') ? parseInt(searchParams.get('minMileage')!) : minMileage;
    const maxMileageParam = searchParams.get('maxMileage') ? parseInt(searchParams.get('maxMileage')!) : maxMileage;
    
    const fuelTypesParam = searchParams.get('fuelTypes')?.split(',') || [];
    const transmissionsParam = searchParams.get('transmissions')?.split(',') || [];
    const bodyTypesParam = searchParams.get('bodyTypes')?.split(',') || [];
    const sellerTypeParam = searchParams.get('sellerType') || 'all';
    const locationParam = searchParams.get('location') || '';
    const sortByParam = searchParams.get('sortBy') || 'newest';
    
    setKeyword(keywordParam);
    setMake(makeParam);
    setSelectedMake(makeParam);
    setModel(modelParam);
    setMinYearValue(minYearParam);
    setMaxYearValue(maxYearParam);
    setMinPriceValue(minPriceParam);
    setMaxPriceValue(maxPriceParam);
    setMinMileageValue(minMileageParam);
    setMaxMileageValue(maxMileageParam);
    setSelectedFuelTypes(fuelTypesParam);
    setSelectedTransmissions(transmissionsParam);
    setSelectedBodyTypes(bodyTypesParam);
    setSellerType(sellerTypeParam);
    setLocation(locationParam);
    setSortBy(sortByParam);
    
    // Update available models if make is selected
    if (makeParam && carModels[makeParam]) {
      setAvailableModels(carModels[makeParam]);
    }
  }, []);
  
  // Update available models when make changes
  useEffect(() => {
    if (selectedMake && carModels[selectedMake]) {
      setAvailableModels(carModels[selectedMake]);
    } else {
      setAvailableModels([]);
    }
    
    // Reset model if make changes
    if (make !== selectedMake) {
      setModel('');
    }
    
    setMake(selectedMake);
  }, [selectedMake]);
  
  // Apply filters
  const applyFilters = () => {
    const filters = {
      keyword,
      make,
      model,
      minYear: minYearValue,
      maxYear: maxYearValue,
      minPrice: minPriceValue,
      maxPrice: maxPriceValue,
      minMileage: minMileageValue,
      maxMileage: maxMileageValue,
      fuelTypes: selectedFuelTypes,
      transmissions: selectedTransmissions,
      bodyTypes: selectedBodyTypes,
      sellerType,
      location,
      sortBy
    };
    
    onFilterChange(filters);
    const params = new URLSearchParams();
    
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.make) params.set('make', filters.make);
    if (filters.model) params.set('model', filters.model);
    if (filters.minYear !== minYear) params.set('minYear', filters.minYear.toString());
    if (filters.maxYear !== maxYear) params.set('maxYear', filters.maxYear.toString());
    if (filters.minPrice !== minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.minMileage !== minMileage) params.set('minMileage', filters.minMileage.toString());
    if (filters.maxMileage !== maxMileage) params.set('maxMileage', filters.maxMileage.toString());
    if (filters.fuelTypes.length) params.set('fuelTypes', filters.fuelTypes.join(','));
    if (filters.transmissions.length) params.set('transmissions', filters.transmissions.join(','));
    if (filters.bodyTypes.length) params.set('bodyTypes', filters.bodyTypes.join(','));
    if (filters.sellerType !== 'all') params.set('sellerType', filters.sellerType);
    if (filters.location) params.set('location', filters.location);
    if (filters.sortBy !== 'newest') params.set('sortBy', filters.sortBy);
    
    navigate(`/search?${params.toString()}`);
  };
  
  // Reset filters
  const resetFilters = () => {
    setKeyword('');
    setSelectedMake('');
    setMake('');
    setModel('');
    setMinYearValue(minYear);
    setMaxYearValue(maxYear);
    setMinPriceValue(minPrice);
    setMaxPriceValue(maxPrice);
    setMinMileageValue(minMileage);
    setMaxMileageValue(maxMileage);
    setSelectedFuelTypes([]);
    setSelectedTransmissions([]);
    setSelectedBodyTypes([]);
    setSellerType('all');
    setLocation('');
    setSortBy('newest');
    
    const filters = {
      keyword: '',
      make: '',
      model: '',
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      fuelTypes: [],
      transmissions: [],
      bodyTypes: [],
      sellerType: 'all',
      location: '',
      sortBy: 'newest'
    };
    
    onFilterChange(filters);
    setSearchParams({});
  };
  
  // Update URL search 

  // Toggle fuel type selection
  const toggleFuelType = (type: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  // Toggle transmission selection
  const toggleTransmission = (type: string) => {
    setSelectedTransmissions(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  // Toggle body type selection
  const toggleBodyType = (type: string) => {
    setSelectedBodyTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Quick search bar - always visible */}
      <form onSubmit={(e) => {
      e.preventDefault();
      applyFilters();
    }}>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder={t('search.keyword')}
            className="w-full pl-4 py-6 rounded-lg border-input shadow-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
          type='submit'
            className="py-6 px-6 bg-primary hover:bg-primary/90 text-white shadow-sm"
            onClick={applyFilters}
          >
            {t('search.button')}
          </Button>    
        </div>
      </div>
</form>
      {/* Advanced filters panel */}
     
    </div>
  );
}

export default SearchFilters;
