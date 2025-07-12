
import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onChange: (files: string[]) => void;
  maxImages?: number;
  value?: string[];
  className?: string;
}

export function ImageUploader({
  onChange,
  maxImages = 10,
  value = [],
  className,
}: ImageUploaderProps) {
  const [imageURLs, setImageURLs] = useState<string[]>(value);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addNewFiles(e.target.files);
  };

  const addNewFiles = (fileList: FileList) => {
    if (imageURLs.length >= maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }

    const newFiles = Array.from(fileList).slice(0, maxImages - imageURLs.length);
    
    // Convert files to URLs
    const newURLs: string[] = [];
    
    newFiles.forEach((file) => {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload only image files.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target) return;
        
        const url = event.target.result as string;
        newURLs.push(url);
        
        // Update state and call onChange when all files are processed
        if (newURLs.length === newFiles.length) {
          const updatedURLs = [...imageURLs, ...newURLs];
          setImageURLs(updatedURLs);
          onChange(updatedURLs);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const updatedURLs = [...imageURLs];
    updatedURLs.splice(index, 1);
    setImageURLs(updatedURLs);
    onChange(updatedURLs);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      addNewFiles(e.dataTransfer.files);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Images preview */}
      {imageURLs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imageURLs.map((url, index) => (
            <div 
              key={index} 
              className="relative group aspect-[4/3] bg-muted rounded-md overflow-hidden"
            >
              <img
                src={url}
                alt={`Upload preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-md">
                  Main Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Drag & drop area */}
      {imageURLs.length < maxImages && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-input hover:border-primary/50",
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            multiple
          />
          <div className="flex flex-col items-center justify-center space-y-3 text-muted-foreground">
            <div className="bg-primary/10 rounded-full p-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium">
                <span>Drag & drop</span> or <span className="text-primary">browse</span>
              </p>
              <p className="mt-1 text-xs">
                JPEG, PNG, GIF up to 5MB
              </p>
              <p className="mt-3 text-xs">
                {imageURLs.length} / {maxImages} images uploaded
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Image tips */}
      <div className="bg-secondary/50 rounded-lg p-4 text-sm space-y-2">
        <h4 className="font-medium flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4" /> Tips for quality photos:
        </h4>
        <ul className="space-y-1 text-muted-foreground">
          <li className="flex items-start gap-1.5">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> 
            Take photos in good lighting
          </li>
          <li className="flex items-start gap-1.5">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> 
            Capture exterior from multiple angles
          </li>
          <li className="flex items-start gap-1.5">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> 
            Include interior shots and dashboard
          </li>
          <li className="flex items-start gap-1.5">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /> 
            Add photos of wheels and engine
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ImageUploader;
