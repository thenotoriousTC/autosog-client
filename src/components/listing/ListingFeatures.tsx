
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface ListingFeaturesProps {
  features: string[];
}

export function ListingFeatures({ features }: ListingFeaturesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Features & Equipment</CardTitle>
      </CardHeader>
      <CardContent>
        {features && features.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No features listed</p>
        )}
      </CardContent>
    </Card>
  );
}
