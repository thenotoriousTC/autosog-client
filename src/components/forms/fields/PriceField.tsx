
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { DollarSign } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface PriceFieldProps {
  control: Control<any>;
}

const PriceField: React.FC<PriceFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormField 
      control={control} 
      name="price" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('createListing.pricing.price')}</FormLabel>
          <FormControl>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" type="number" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceField;
