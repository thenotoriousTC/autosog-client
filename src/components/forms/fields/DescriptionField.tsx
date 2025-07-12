
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface DescriptionFieldProps {
  control: Control<any>;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormField 
      control={control} 
      name="description" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('createListing.description.title')}</FormLabel>
          <FormControl>
            <Textarea 
              placeholder={t('createListing.description.placeholder')} 
              className="min-h-32" 
              {...field} 
            />
          </FormControl>
          <FormDescription>
            {t('createListing.description.advice')}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionField;
