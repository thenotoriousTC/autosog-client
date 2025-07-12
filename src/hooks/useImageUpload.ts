
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UseImageUploadOptions {
  userId: string | undefined;
  onProgress?: (progress: number) => void;
  onStepChange?: (step: string) => void;
}

export const useImageUpload = ({ userId, onProgress, onStepChange }: UseImageUploadOptions) => {
  const { toast } = useToast();
  
  /**
   * Uploads images to Supabase storage
   * @param images Array of image data URLs
   * @returns Array of public URLs for the uploaded images
   */
  const uploadImagesToStorage = async (images: string[]): Promise<string[]> => {
    if (!images.length) return [];
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to upload images",
        variant: "destructive"
      });
      return [];
    }
    
    const imageUrls: string[] = [];
    const totalImages = images.length;
    let uploadedCount = 0;
    
    onStepChange?.('Uploading images');
    
    try {
      for (let i = 0; i < images.length; i++) {
        const imageDataUrl = images[i];
        
        // Convert data URL to blob
        const res = await fetch(imageDataUrl);
        const blob = await res.blob();
        
        // Determine file extension from blob type
        const fileExt = getFileExtensionFromMimeType(blob.type);
        const fileName = `${userId}-${Date.now()}-${i}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Upload the blob to Supabase Storage
        const { data, error } = await supabase.storage
          .from('car_images')
          .upload(filePath, blob);
        
        if (error) {
          console.error('Error uploading image:', error);
          toast({
            title: "Image upload failed",
            description: error.message,
            variant: "destructive"
          });
          continue;
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('car_images')
          .getPublicUrl(filePath);
          
        imageUrls.push(publicUrlData.publicUrl);
        
        // Update progress
        uploadedCount++;
        onProgress?.(Math.round((uploadedCount / totalImages) * 70)); // Images take up 70% of the process
      }
      
      return imageUrls;
    } catch (error: any) {
      console.error('Error in image upload process:', error);
      toast({
        title: "Image upload process failed",
        description: error.message || "Failed to process images",
        variant: "destructive"
      });
      return [];
    }
  };
  
  return { uploadImagesToStorage };
};

/**
 * Get file extension from MIME type
 */
function getFileExtensionFromMimeType(mimeType: string): string {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    case 'image/svg+xml':
      return 'svg';
    case 'image/bmp':
      return 'bmp';
    default:
      return 'jpg'; // Default to jpg if mime type is unknown
  }
}
