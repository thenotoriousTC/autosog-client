
import React from 'react';
import { Link } from 'react-router-dom';

interface ListingBreadcrumbProps {
  make: string;
  model: string;
}

export function ListingBreadcrumb({ make, model }: ListingBreadcrumbProps) {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-6">
      <Link to="/" className="hover:text-primary">Home</Link>
      <span className="mx-2">/</span>
      <Link to="/search" className="hover:text-primary">Listings</Link>
      <span className="mx-2">/</span>
      <span className="text-foreground">{make} {model}</span>
    </div>
  );
}
