import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavbarLogoProps {
  className?: string;
}

/**
 * Logo component for the navbar
 */
const NavbarLogo: React.FC<NavbarLogoProps> = ({ className }) => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className={cn("text-2xl font-bold transition-colors", className)}>
        AutoDZ
      </Link>
    </div>
  );
};

export default NavbarLogo; 