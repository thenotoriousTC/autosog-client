
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import ImageUploader from '@/components/image-uploader';
import { ImageCompressionOptions } from '@/lib/imageCompression';

interface ImagesFieldProps {
  control: Control<any>;
}

// Default compression options for uploaded images
const defaultCompressionOptions: Partial<ImageCompressionOptions> = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.8,
  outputFormat: 'image/jpeg',
  preserveAspectRatio: true,
};

const ImagesField: React.FC<ImagesFieldProps> = ({ control }) => {
  const { t } = useTranslation();
  
  return (
    <FormField 
      control={control} 
      name="images" 
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ImageUploader 
              onChange={field.onChange} 
              value={field.value}
              maxImages={8} 
              compressionOptions={defaultCompressionOptions}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImagesField;
