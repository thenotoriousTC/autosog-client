
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface BodyTypeColorFieldsProps {
  control: Control<any>;
}

const BodyTypeColorFields: React.FC<BodyTypeColorFieldsProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Body Type */}
      <FormField 
        control={control} 
        name="bodyType" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.vehicle.bodyType')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('createListing.vehicle.selectBodyType')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Sedan">{t('createListing.vehicle.bodyTypes.sedan')}</SelectItem>
                <SelectItem value="Hatchback">{t('createListing.vehicle.bodyTypes.hatchback')}</SelectItem>
                <SelectItem value="Estate">{t('createListing.vehicle.bodyTypes.estate')}</SelectItem>
                <SelectItem value="SUV">{t('createListing.vehicle.bodyTypes.suv')}</SelectItem>
                <SelectItem value="Coupe">{t('createListing.vehicle.bodyTypes.coupe')}</SelectItem>
                <SelectItem value="Convertible">{t('createListing.vehicle.bodyTypes.convertible')}</SelectItem>
                <SelectItem value="Pickup">{t('createListing.vehicle.bodyTypes.pickup')}</SelectItem>
                <SelectItem value="Van">{t('createListing.vehicle.bodyTypes.van')}</SelectItem>
                <SelectItem value="Other">{t('createListing.vehicle.bodyTypes.other')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Color */}
      <FormField 
        control={control} 
        name="color" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.vehicle.color')}</FormLabel>
            <FormControl>
              <Input placeholder={t('createListing.vehicle.colorPlaceholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BodyTypeColorFields;
