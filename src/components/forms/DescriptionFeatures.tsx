
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FileText, ListChecks } from 'lucide-react';
import FormSection from '@/components/FormSection';
import DescriptionField from './fields/DescriptionField';
import FeaturesField from './fields/FeaturesField';
import ImagesField from './fields/ImagesField';

interface DescriptionFeaturesProps {
  control: Control<any>;
}

/**
 * Description, features, and images component for the car listing form
 */
const DescriptionFeatures: React.FC<DescriptionFeaturesProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Description Section */}
      <FormSection 
        title={t('createListing.description.title')} 
        icon={FileText} 
        description={t('createListing.description.description')}
      >
        <DescriptionField control={control} />
      </FormSection>

      {/* Features Section */}
      <FormSection 
        title={t('createListing.features.title')} 
        icon={ListChecks} 
        description={t('createListing.features.description')}
      >
        <FeaturesField control={control} />
      </FormSection>

      {/* Images Section */}
      <FormSection 
        title={t('createListing.photos.title')} 
        description={t('createListing.photos.description')}
      >
        <ImagesField control={control} />
      </FormSection>
    </>
  );
};

export default React.memo(DescriptionFeatures);
