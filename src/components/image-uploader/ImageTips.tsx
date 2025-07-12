
import React from 'react';
import { Check, Image as ImageIcon } from 'lucide-react';

const ImageTips: React.FC = () => {
  return (
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
  );
};

export default ImageTips;
