
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface MileageFieldProps {
  control: Control<any>;
}

const MileageField: React.FC<MileageFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormField 
      control={control} 
      name="mileage" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('createListing.pricing.mileage')}</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MileageField;
