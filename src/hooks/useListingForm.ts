
import { useAuth } from '@/contexts/AuthContext';
import { useListingSubmit } from './useListingSubmit';
import { defaultFormValues } from '@/schemas/listingFormSchema';

// Export the schema from the dedicated file
export { listingFormSchema, defaultFormValues, type FormValues } from '@/schemas/listingFormSchema';

export const useListingForm = () => {
  const { user } = useAuth();
  const { 
    isSubmitting, 
    uploadProgress, 
    uploadStep, 
    showProgressModal, 
    submitListing 
  } = useListingSubmit({ userId: user?.id });
  
  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    await submitListing(data);
  };
  
  return {
    isSubmitting,
    uploadProgress,
    uploadStep,
    showProgressModal,
    onSubmit
  };
};

type FormValues = import('@/schemas/listingFormSchema').FormValues;
