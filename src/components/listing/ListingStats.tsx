
import React from 'react';

interface ListingStatsProps {
  views: number;
  createdAt: string;
}

export function ListingStats({ views, createdAt }: ListingStatsProps) {
  const formattedDate = createdAt && !isNaN(new Date(createdAt).getTime())
    ? new Date(createdAt).toLocaleDateString()
    : 'Recently posted';

  return (
    <div className="bg-muted rounded-lg p-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{views} Views</span>
        <span>
          Posted: {formattedDate}
        </span>
      </div>
    </div>
  );
}
