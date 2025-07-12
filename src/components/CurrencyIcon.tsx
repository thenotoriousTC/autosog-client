import React from 'react';
import { LucideProps } from 'lucide-react';

export const CurrencyIcon: React.FC<LucideProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Custom icon for Algerian Dinar */}
      <text x="4" y="17" fontSize="14" fontWeight="bold">دج</text>
    </svg>
  );
};

export default CurrencyIcon; 