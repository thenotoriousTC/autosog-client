
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ImagePreview from './ImagePreview';
import DropZone from './DropZone';
import ImageTips from './ImageTips';
import { compressImages, type ImageCompressionOptions } from '@/lib/imageCompression';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onChange: (files: string[]) => void;
  maxImages?: number;
  value?: string[];
  className?: string;
  compressionOptions?: Partial<ImageCompressionOptions>;
}

export function ImageUploader({
  onChange,
  maxImages = 10,
  value = [],
  className,
  compressionOptions,
}: ImageUploaderProps) {
  const [imageURLs, setImageURLs] = useState<string[]>(value);
  const [compressionStats, setCompressionStats] = useState<Array<{
    originalSize: number;
    compressedSize: number;
  }>>([]);
  const { toast } = useToast();

  const handleFileSelect = async (fileList: FileList) => {
    if (imageURLs.length >= maxImages) {
      toast({
        title: "Upload limit reached",
        description: `You can only upload up to ${maxImages} images.`,
        variant: "destructive"
      });
      return;
    }

    const newFiles = Array.from(fileList).slice(0, maxImages - imageURLs.length);
    
    // Filter to only include image files
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== newFiles.length) {
      toast({
        title: "Invalid files",
        description: "Some files were skipped because they are not images.",
        variant: "destructive"
      });
    }
    
    if (imageFiles.length === 0) return;
    
    try {
      // Show loading toast
      toast({
        title: "Processing images",
        description: "Compressing and preparing your images...",
      });
      
      // Compress the images
      const compressedImages = await compressImages(imageFiles, compressionOptions);
      
      // Update compression stats
      const newStats = compressedImages.map(img => ({
        originalSize: img.originalSize,
        compressedSize: img.compressedSize
      }));
      
      setCompressionStats([...compressionStats, ...newStats]);
      
      // Update the image URLs
      const newImageURLs = compressedImages.map(img => img.dataUrl);
      const updatedURLs = [...imageURLs, ...newImageURLs];
      
      setImageURLs(updatedURLs);
      onChange(updatedURLs);
      
      // Show success toast with compression info
      const totalOriginalSize = newStats.reduce((sum, stat) => sum + stat.originalSize, 0);
      const totalCompressedSize = newStats.reduce((sum, stat) => sum + stat.compressedSize, 0);
      const savingsPercent = Math.round((1 - totalCompressedSize / totalOriginalSize) * 100);
      
      if (savingsPercent > 5) {
        toast({
          title: "Images compressed",
          description: `Saved ${savingsPercent}% storage (${formatBytes(totalOriginalSize)} → ${formatBytes(totalCompressedSize)})`,
        });
      }
    } catch (error: any) {
      console.error('Error compressing images:', error);
      toast({
        title: "Image processing failed",
        description: error.message || "Failed to process images",
        variant: "destructive"
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedURLs = [...imageURLs];
    updatedURLs.splice(index, 1);
    
    // Also remove the corresponding compression stat if it exists
    if (compressionStats.length > index) {
      const updatedStats = [...compressionStats];
      updatedStats.splice(index, 1);
      setCompressionStats(updatedStats);
    }
    
    setImageURLs(updatedURLs);
    onChange(updatedURLs);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Images preview */}
      <ImagePreview imageURLs={imageURLs} onRemoveImage={removeImage} />
      
      {/* Drag & drop area */}
      <DropZone 
        onFileSelect={handleFileSelect}
        maxImages={maxImages}
        currentImages={imageURLs.length}
      />
      
      {/* Image tips */}
      <ImageTips />
    </div>
  );
}

/**
 * Format bytes to a human-readable string (KB, MB)
 */
function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

export default ImageUploader;
