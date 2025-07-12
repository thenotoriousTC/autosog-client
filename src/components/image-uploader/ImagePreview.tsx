
import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  imageURLs: string[];
  onRemoveImage: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageURLs, onRemoveImage }) => {
  if (imageURLs.length === 0) return null;

  return (
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
              onClick={() => onRemoveImage(index)}
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
  );
};

export default ImagePreview;
