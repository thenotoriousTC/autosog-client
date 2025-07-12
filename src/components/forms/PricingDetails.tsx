
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { DollarSign } from 'lucide-react';
import FormSection from '@/components/FormSection';
import PriceField from './fields/PriceField';
import MileageField from './fields/MileageField';
import ConditionField from './fields/ConditionField';

interface PricingDetailsProps {
  control: Control<any>;
}

/**
 * Pricing and condition details component for the car listing form
 * Contains condition, price, and mileage fields
 */
const PricingDetails: React.FC<PricingDetailsProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormSection 
      title={t('createListing.pricing.title')} 
      icon={DollarSign} 
      description={t('createListing.pricing.description')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PriceField control={control} />
        <MileageField control={control} />
      </div>

      <ConditionField control={control} />
    </FormSection>
  );
};

export default React.memo(PricingDetails);
