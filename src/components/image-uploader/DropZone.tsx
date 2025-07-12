
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  onFileSelect: (files: FileList) => void;
  maxImages: number;
  currentImages: number;
  className?: string;
}

const DropZone: React.FC<DropZoneProps> = ({ 
  onFileSelect, 
  maxImages, 
  currentImages,
  className 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

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
      onFileSelect(e.dataTransfer.files);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onFileSelect(e.target.files);
  };

  // Hide the dropzone if we've reached the maximum number of images
  if (currentImages >= maxImages) return null;

  return (
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
            {currentImages} / {maxImages} images uploaded
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
