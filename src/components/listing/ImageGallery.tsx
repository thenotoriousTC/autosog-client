
import React, { useState } from 'react';
import { Share2, Heart, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  mainImage: string;
  title: string;
  status: string;
  featured: boolean;
}

export function ImageGallery({ images, mainImage, title, status, featured }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(mainImage || (images && images.length > 0 ? images[0] : null));
  const [favorite, setFavorite] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
    toast({
      title: favorite ? 'Removed from favorites' : 'Added to favorites',
      description: favorite ? 'This listing has been removed from your favorites' : 'This listing has been added to your favorites',
    });
  };
  
  const shareListingUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: title || 'Car Listing',
        text: `Check out this car listing!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Listing URL copied to clipboard',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden bg-accent aspect-video relative">
        {selectedImage ? (
          <img 
            src={selectedImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Info className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Actions overlay */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button variant="secondary" size="icon" onClick={shareListingUrl} className="rounded-full">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button 
            variant={favorite ? "destructive" : "secondary"} 
            size="icon" 
            onClick={toggleFavorite}
            className="rounded-full"
          >
            <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
          </Button>
        </div>
        
        {/* Status badge if applicable */}
        {status !== 'active' && (
          <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full capitalize">
            {status}
          </div>
        )}
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
            Featured
          </div>
        )}
      </div>
      
      {/* Thumbnail gallery */}
      {images && images.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(image)}
              className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === image ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img 
                src={image} 
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
