
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Car } from 'lucide-react';
import FormSection from '@/components/FormSection';
import TitleField from './fields/TitleField';
import MakeModelField from './fields/MakeModelField';
import YearField from './fields/YearField';

interface BasicDetailsProps {
  control: Control<any>;
}

/**
 * Basic details component for the car listing form
 * Contains title, make, model, and year fields
 */
const BasicDetails: React.FC<BasicDetailsProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormSection 
      title={t('createListing.basics.title')} 
      icon={Car} 
      description={t('createListing.basics.description')}
    >
      {/* Title */}
      <div className="col-span-2">
        <TitleField control={control} />
      </div>

      <MakeModelField control={control} />
      
      <div className="col-span-1">
        <YearField control={control} />
      </div>
    </FormSection>
  );
};

export default React.memo(BasicDetails);
