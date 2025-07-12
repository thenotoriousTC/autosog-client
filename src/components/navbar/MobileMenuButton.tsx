
import React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MobileMenuButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * Mobile menu toggle button component for the navbar
 */
const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ 
  onClick, 
  className 
}) => {
  return (
    <Button 
      onClick={onClick} 
      variant="ghost"
      size="icon"
      className={cn(
        "relative rounded-full text-foreground",
        className
      )}
      aria-label="Menu"
    >
      <span className="sr-only">Menu</span>
      <Menu className="h-5 w-5" />
    </Button>
  );
};

export default MobileMenuButton;
