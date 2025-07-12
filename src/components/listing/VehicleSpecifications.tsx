
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface VehicleSpecificationsProps {
  make: string;
  model: string;
  year: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  color: string;
  mileage: number;
  condition: string;
}

export function VehicleSpecifications({
  make,
  model,
  year,
  bodyType,
  fuelType,
  transmission,
  color,
  mileage,
  condition
}: VehicleSpecificationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Make</p>
            <p>{make}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Model</p>
            <p>{model}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Year</p>
            <p>{year}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Body Type</p>
            <p>{bodyType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Fuel Type</p>
            <p>{fuelType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Transmission</p>
            <p>{transmission}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Color</p>
            <p>{color}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Mileage</p>
            <p>{mileage.toLocaleString()} km</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Condition</p>
            <p>{condition === 'NEW' ? 'New' : `${condition}/10`}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
