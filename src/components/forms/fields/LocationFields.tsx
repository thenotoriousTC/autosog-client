
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface LocationFieldsProps {
  control: Control<any>;
}

const LocationFields: React.FC<LocationFieldsProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField 
        control={control} 
        name="location.city" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.location.city')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField 
        control={control} 
        name="location.state" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.location.state')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default LocationFields;
