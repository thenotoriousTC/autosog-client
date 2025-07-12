
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

// Sample list of popular features
const popularFeatures = [{
  id: 'air-conditioning',
  label: 'airConditioning'
}, {
  id: 'power-steering',
  label: 'powerSteering'
}, {
  id: 'power-windows',
  label: 'powerWindows'
}, {
  id: 'abs',
  label: 'abs'
}, {
  id: 'airbags',
  label: 'airbags'
}, {
  id: 'navigation',
  label: 'navigation'
}, {
  id: 'bluetooth',
  label: 'bluetooth'
}, {
  id: 'cruise-control',
  label: 'cruiseControl'
}, {
  id: 'heated-seats',
  label: 'heatedSeats'
}, {
  id: 'sunroof',
  label: 'sunroof'
}, {
  id: 'parking-sensors',
  label: 'parkingSensors'
}, {
  id: 'backup-camera',
  label: 'backupCamera'
}];

interface FeaturesFieldProps {
  control: Control<any>;
}

const FeaturesField: React.FC<FeaturesFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {popularFeatures.map(feature => (
        <FormField 
          key={feature.id} 
          control={control} 
          name="features" 
          render={({ field }) => (
            <FormItem key={feature.id} className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value?.includes(feature.id)} 
                  onCheckedChange={(checked) => {
                    const currentValues = field.value || [];
                    if (checked) {
                      field.onChange([...currentValues, feature.id]);
                    } else {
                      field.onChange(currentValues.filter(value => value !== feature.id));
                    }
                  }} 
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                {t(`createListing.features.options.${feature.label}`)}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default FeaturesField;
