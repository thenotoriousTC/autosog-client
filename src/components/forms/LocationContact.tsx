
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { MapPin, Phone } from 'lucide-react';
import FormSection from '@/components/FormSection';
import LocationFields from './fields/LocationFields';
import ContactFields from './fields/ContactFields';

interface LocationContactProps {
  control: Control<any>;
}

/**
 * Location and contact information component for the car listing form
 */
const LocationContact: React.FC<LocationContactProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Location Section */}
      <FormSection 
        title={t('createListing.location.title')} 
        icon={MapPin} 
        description={t('createListing.location.description')}
      >
        <LocationFields control={control} />
      </FormSection>

      {/* Contact Information Section */}
      <FormSection 
        title={t('createListing.contact.title')} 
        icon={Phone} 
        description={t('createListing.contact.description')}
      >
        <ContactFields control={control} />
      </FormSection>
    </>
  );
};

export default React.memo(LocationContact);
