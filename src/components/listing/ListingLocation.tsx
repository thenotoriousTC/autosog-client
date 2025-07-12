
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface ListingLocationProps {
  city: string;
  state?: string;
  country?: string;
}

export function ListingLocation({ city, state, country }: ListingLocationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p>
            {city}
            {state && `, ${state}`}
            {country && `, ${country}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
