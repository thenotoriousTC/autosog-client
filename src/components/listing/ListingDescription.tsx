
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ListingDescriptionProps {
  description: string;
}

export function ListingDescription({ description }: ListingDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
