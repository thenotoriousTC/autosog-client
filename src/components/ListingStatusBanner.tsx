
import React from 'react';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import type { ListingStatus } from '@/lib/types';

interface ListingStatusBannerProps {
  status: ListingStatus;
  className?: string;
}

export function ListingStatusBanner({ status, className }: ListingStatusBannerProps) {
  // Define status-specific styling and content
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          icon: <CheckCircle className="h-4 w-4 mr-1" />,
          text: "Approved",
          bgColor: "bg-green-50 border-green-200 text-green-800"
        };
      case 'pending':
        return {
          icon: <Clock className="h-4 w-4 mr-1" />,
          text: "Pending Approval",
          bgColor: "bg-yellow-50 border-yellow-200 text-yellow-800"
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-4 w-4 mr-1" />,
          text: "Rejected",
          bgColor: "bg-red-50 border-red-200 text-red-800"
        };
      default:
        return {
          icon: <Clock className="h-4 w-4 mr-1" />,
          text: "Pending",
          bgColor: "bg-gray-50 border-gray-200 text-gray-800"
        };
    }
  };

  const config = getStatusConfig();
  
  return (
    <div className={cn(
      "flex items-center justify-center py-1 px-2 text-xs font-medium border rounded-md w-full",
      config.bgColor,
      className
    )}>
      {config.icon}
      {config.text}
    </div>
  );
}
