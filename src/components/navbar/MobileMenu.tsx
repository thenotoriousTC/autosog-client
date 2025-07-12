
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavbarAuth } from '@/components/NavbarAuth';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { X, ChevronRight, Home, Search, Info, Phone, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRenderCount } from '@/hooks/use-render-count';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerFooter,
  DrawerClose
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

/**
 * Mobile menu component that appears as a drawer on smaller screens
 */
const MobileMenu = ({ isOpen, toggleMenu }: MobileMenuProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  // Track render count in development mode
  if (process.env.NODE_ENV === 'development') {
    useRenderCount('MobileMenu', true);
  }

  // Prevent body scrolling when the drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Only render on mobile devices and when the menu is open
  if (!isMobile && !isOpen) return null;

  const navLinks = [
    { path: '/', label: t('navbar.home'), icon: Home },
    { path: '/search', label: t('navbar.findCars'), icon: Search },
    { path: '/about', label: t('navbar.about'), icon: Info },
    { path: '/contact', label: t('navbar.contact'), icon: Phone },
    { path: '/create-listing', label: t('navbar.sellYourCar'), icon: Car, isHighlighted: true }
  ];

  return (
    <Drawer open={isOpen} onOpenChange={toggleMenu}>
      <DrawerOverlay className="bg-black/60 backdrop-blur-sm" />
      <DrawerContent className="h-[85vh] rounded-t-xl bg-white shadow-xl">
        <DrawerHeader className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <DrawerClose asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">{t('common.close')}</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        {/* Navigation Links with modern styling */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <div className="space-y-1">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={i}
                    to={link.path}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors",
                      link.isHighlighted 
                        ? "bg-primary/5 text-primary font-medium" 
                        : "text-gray-700"
                    )}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center">
                      <Icon className={cn(
                        "h-5 w-5 mr-3", 
                        link.isHighlighted ? "text-primary" : "text-gray-500"
                      )} />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                );
              })}
            </div>
          </nav>
          
          {/* Authentication section */}
          <div className="px-4 py-6 border-t mt-2">
            <NavbarAuth mobileView={true} />
            <LanguageSwitcher mobile={true} />
          </div>
        </div>
        
        <DrawerFooter className="border-t px-4 py-3">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} CarMarket
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default React.memo(MobileMenu);
