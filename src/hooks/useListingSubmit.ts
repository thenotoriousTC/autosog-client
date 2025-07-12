
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useImageUpload } from './useImageUpload';
import type { FormValues } from '@/schemas/listingFormSchema';

interface UseListingSubmitOptions {
  userId: string | undefined;
}

export const useListingSubmit = ({ userId }: UseListingSubmitOptions) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState('');
  const [showProgressModal, setShowProgressModal] = useState(false);
  
  const { uploadImagesToStorage } = useImageUpload({
    userId,
    onProgress: setUploadProgress,
    onStepChange: setUploadStep
  });

  const submitListing = async (formData: FormValues) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a listing.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    setShowProgressModal(true);
    setUploadProgress(0);
    setUploadStep('Preparing your listing');
    
    try {
      console.log("Starting listing creation process...");
      
      // Upload images to Supabase Storage
      console.log("Uploading images...");
      const uploadedImageUrls = await uploadImagesToStorage(formData.images);
      
      if (!uploadedImageUrls.length && formData.images.length > 0) {
        toast({
          title: "Image upload error",
          description: "Failed to upload images. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        setShowProgressModal(false);
        return;
      }
      
      console.log("Images uploaded successfully:", uploadedImageUrls);
      
      // Update progress and step
      setUploadProgress(80);
      setUploadStep('Saving your listing details');
      
      // Prepare the data for Supabase
      const carListingData = {
        user_id: userId,
        title: formData.title,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        condition: formData.condition,
        price: formData.price,
        mileage: formData.mileage,
        fuel_type: formData.fuelType,
        transmission: formData.transmission,
        body_type: formData.bodyType,
        color: formData.color,
        description: formData.description,
        features: formData.features || [],
        images: uploadedImageUrls,
        main_image: uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null,
        location: formData.location,
        seller: {
          ...formData.seller,
          id: userId
        },
        status: 'active',
      };
      
      console.log("Saving listing to database:", carListingData);
      
      // Insert the car listing to Supabase
      const { data: insertedData, error } = await supabase
        .from('car_listings')
        .insert(carListingData)
        .select();
      
      if (error) {
        console.error('Error creating listing:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to create listing. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        setShowProgressModal(false);
        return;
      }
      
      console.log("Listing created successfully:", insertedData);
      
      // Complete the progress
      setUploadProgress(100);
      setUploadStep('Listing created successfully!');
      
      // Show success toast
      toast({
        title: "Success!",
        description: "Your car listing has been submitted."
      });
      
      // Short delay before redirecting
      setTimeout(() => {
        // Navigate to the my listings page
        navigate('/my-listings');
      }, 1000);
    } catch (error: any) {
      console.error('Error in submitListing:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      setShowProgressModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    isSubmitting,
    uploadProgress,
    uploadStep,
    showProgressModal,
    submitListing
  };
};
