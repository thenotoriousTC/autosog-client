
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CarMake } from '@/lib/types';

// Common car makes for the dropdown
const commonCarMakes: CarMake[] = ['Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Jeep', 'Kia', 'Lexus', 'Mazda', 'Mercedes-Benz', 'Nissan', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen'];

interface MakeModelFieldProps {
  control: Control<any>;
}

const MakeModelField: React.FC<MakeModelFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Make */}
      <FormField 
        control={control} 
        name="make" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.basics.make')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('createListing.basics.selectMake')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {commonCarMakes.map(make => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
                <SelectItem value="Other">{t('createListing.basics.other')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Model */}
      <FormField 
        control={control} 
        name="model" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.basics.model')}</FormLabel>
            <FormControl>
              <Input placeholder={t('createListing.basics.modelPlaceholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MakeModelField;
