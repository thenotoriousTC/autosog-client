
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TitleFieldProps {
  control: Control<any>;
}

const TitleField: React.FC<TitleFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormField 
      control={control} 
      name="title" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('createListing.basics.listingTitle')}</FormLabel>
          <FormControl>
            <Input placeholder={t('createListing.basics.titlePlaceholder')} {...field} />
          </FormControl>
          <FormDescription>
            {t('createListing.basics.titleDescription')}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleField;
