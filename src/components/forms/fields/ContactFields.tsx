
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactFieldsProps {
  control: Control<any>;
}

const ContactFields: React.FC<ContactFieldsProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField 
        control={control} 
        name="seller.name" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.contact.name')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
          
      <FormField 
        control={control} 
        name="seller.phone" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.contact.phone')}</FormLabel>
            <FormControl>
              <Input type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
          
      <FormField 
        control={control} 
        name="seller.phoneSecondary" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.contact.phoneSecondary')}</FormLabel>
            <FormControl>
              <Input type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
          
      <FormField 
        control={control} 
        name="seller.email" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.contact.email')}</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
          
      <FormField 
        control={control} 
        name="seller.type" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('createListing.contact.sellerType')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('createListing.contact.selectSellerType')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="private">{t('createListing.contact.private')}</SelectItem>
                <SelectItem value="dealer">{t('createListing.contact.dealer')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactFields;
