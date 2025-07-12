
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ConditionFieldProps {
  control: Control<any>;
}

const ConditionField: React.FC<ConditionFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormField 
      control={control} 
      name="condition" 
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{t('createListing.pricing.condition')}</FormLabel>
          <FormControl>
            <RadioGroup 
              onValueChange={field.onChange} 
              defaultValue={field.value} 
              className="flex flex-col space-y-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3 bg-accent/20">
                  <FormControl>
                    <RadioGroupItem value="NEW" />
                  </FormControl>
                  <FormLabel className="font-medium cursor-pointer">{t('createListing.pricing.new')}</FormLabel>
                </FormItem>
                {Array.from({ length: 10 }).map((_, i) => {
                  const value = (10 - i).toString();
                  const label = 
                    value === '10' ? t('createListing.pricing.excellent') : 
                    value === '7' ? t('createListing.pricing.good') : 
                    value === '5' ? t('createListing.pricing.average') : 
                    value === '3' ? t('createListing.pricing.poor') : 
                    value === '1' ? t('createListing.pricing.terrible') : 
                    value;
                  return (
                    <FormItem key={value} className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{label}</FormLabel>
                    </FormItem>
                  );
                })}
              </div>
            </RadioGroup>
          </FormControl>
          <FormDescription>
            {t('createListing.pricing.conditionDescription')}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ConditionField;
