
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { Calendar, Gauge, MapPin } from 'lucide-react';

interface ListingSummaryProps {
  title: string;
  year: number;
  mileage: number;
  city: string;
  price: number;
}

export function ListingSummary({ title, year, mileage, city, price }: ListingSummaryProps) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      <div className="flex items-center mt-4">
        <div className="mr-4 flex items-center text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span>{year}</span>
        </div>
        <div className="mr-4 flex items-center text-muted-foreground">
          <Gauge className="mr-1 h-4 w-4" />
          <span>{mileage.toLocaleString()} km</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{city}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-3xl font-bold text-primary">{formatCurrency(price)}</span>
      </div>
    </div>
  );
}
