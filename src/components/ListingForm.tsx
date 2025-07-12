
import React from 'react';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Car, Check, Info } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import UploadProgressModal from '@/components/UploadProgressModal';
import { 
  useListingForm, 
  listingFormSchema, 
  defaultFormValues,
  FormValues 
} from '@/hooks/useListingForm';

// Import form section components
import BasicDetails from '@/components/forms/BasicDetails';
import PricingDetails from '@/components/forms/PricingDetails';
import VehicleDetails from '@/components/forms/VehicleDetails';
import DescriptionFeatures from '@/components/forms/DescriptionFeatures';
import LocationContact from '@/components/forms/LocationContact';

const ListingForm = () => {
  const { t } = useTranslation();
  const { 
    isSubmitting, 
    uploadProgress, 
    uploadStep, 
    showProgressModal, 
    onSubmit 
  } = useListingForm();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: defaultFormValues
  });
  
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });
  
  return (
    <div className="bg-card border rounded-lg p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Car className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">{t('createListing.carDetails')}</h2>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic car information */}
          <BasicDetails control={form.control} />
          
          {/* Pricing and condition */}
          <PricingDetails control={form.control} />
          
          {/* Vehicle specifications */}
          <VehicleDetails control={form.control} />
          
          {/* Description, features, and images */}
          <DescriptionFeatures control={form.control} />
          
          {/* Location and contact information */}
          <LocationContact control={form.control} />

          {/* Submit button and notice */}
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? 
                t('createListing.submit.submitting') : 
                <>
                  <Check className="mr-2 h-4 w-4" /> {t('createListing.submit.button')}
                </>
              }
            </Button>
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              <Info className="inline h-3 w-3 mr-1" />
              {t('createListing.submit.notice')}
            </p>
          </div>
        </form>
      </Form>
      
      {/* Upload Progress Modal */}
      <UploadProgressModal 
        isOpen={showProgressModal}
        progress={uploadProgress}
        step={uploadStep}
      />
    </div>
  );
};

export default ListingForm;
