
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FuelTransmissionFieldsProps {
  control: Control<any>;
}

const FuelTransmissionFields: React.FC<FuelTransmissionFieldsProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Fuel Type */}
      <FormField 
        control={control} 
        name="fuelType" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.vehicle.fuelType')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('createListing.vehicle.selectFuelType')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Petrol">{t('createListing.vehicle.fuelTypes.petrol')}</SelectItem>
                <SelectItem value="Diesel">{t('createListing.vehicle.fuelTypes.diesel')}</SelectItem>
                <SelectItem value="Electric">{t('createListing.vehicle.fuelTypes.electric')}</SelectItem>
                <SelectItem value="Hybrid">{t('createListing.vehicle.fuelTypes.hybrid')}</SelectItem>
                <SelectItem value="Plug-in Hybrid">{t('createListing.vehicle.fuelTypes.plugInHybrid')}</SelectItem>
                <SelectItem value="LPG">{t('createListing.vehicle.fuelTypes.lpg')}</SelectItem>
                <SelectItem value="Other">{t('createListing.vehicle.fuelTypes.other')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Transmission */}
      <FormField 
        control={control} 
        name="transmission" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.vehicle.transmission')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('createListing.vehicle.selectTransmission')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Manual">{t('createListing.vehicle.transmissionTypes.manual')}</SelectItem>
                <SelectItem value="Automatic">{t('createListing.vehicle.transmissionTypes.automatic')}</SelectItem>
                <SelectItem value="Semi-Automatic">{t('createListing.vehicle.transmissionTypes.semiAutomatic')}</SelectItem>
                <SelectItem value="CVT">{t('createListing.vehicle.transmissionTypes.cvt')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FuelTransmissionFields;
