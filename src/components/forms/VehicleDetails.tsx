
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Settings } from 'lucide-react';
import FormSection from '@/components/FormSection';
import FuelTransmissionFields from './fields/FuelTransmissionFields';
import BodyTypeColorFields from './fields/BodyTypeColorFields';

interface VehicleDetailsProps {
  control: Control<any>;
}

/**
 * Vehicle specifications component for the car listing form
 * Contains fuel type, transmission, body type, and color fields
 */
const VehicleDetails: React.FC<VehicleDetailsProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormSection 
      title={t('createListing.vehicle.title')} 
      icon={Settings} 
      description={t('createListing.vehicle.description')}
    >
      <FuelTransmissionFields control={control} />
      <BodyTypeColorFields control={control} />
    </FormSection>
  );
};

export default React.memo(VehicleDetails);
