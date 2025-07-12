
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { NavbarAuth } from '@/components/NavbarAuth';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// Import the other components
import NavbarLogo from './navbar/NavbarLogo';
import NavbarLinks from './navbar/NavbarLinks';
import MobileMenu from './navbar/MobileMenu';
import MobileMenuButton from './navbar/MobileMenuButton';

export function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on the home page
  const isHome = location.pathname === '/';

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoize toggleMenu function
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Memoize computed values to prevent unnecessary recalculations
  const navbarClasses = useMemo(() => cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
    isScrolled || !isHome 
      ? 'bg-white/90 backdrop-blur-lg shadow-sm' 
      : 'bg-transparent'
  ), [isScrolled, isHome]);

  // Define nav link text color
  const navLinkClass = useMemo(() => cn(
    "text-lg font-medium transition-colors hover:text-primary whitespace-nowrap min-w-[80px] text-center", 
    isScrolled || !isHome ? "text-foreground" : "text-white hover:text-white/80"
  ), [isScrolled, isHome]);

  // Define highlighted link class
  const highlightedLinkClass = useMemo(() => cn(
    "font-semibold",
    isScrolled || !isHome ? "text-primary" : "text-white"
  ), [isScrolled, isHome]);

  // Nav links array - memoize to prevent recreating on every render
  const navLinks = useMemo(() => [
    { path: '/', label: t('navbar.home') },
    { path: '/search', label: t('navbar.findCars') },
    { path: '/about', label: t('navbar.about') },
    { path: '/create-listing', label: t('navbar.sellYourCar'), isHighlighted: true }
  ], [t]);

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavbarLogo className={isScrolled || !isHome ? "text-primary" : "text-white"} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-10">
            <NavbarLinks 
              links={navLinks.filter(link => !link.isHighlighted)} 
              linkClassName={navLinkClass}
              highlightedLinkClassName={highlightedLinkClass}
            />
          </div>

          {/* Auth & Action Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <LanguageSwitcher />
            <NavbarAuth />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <LanguageSwitcher />
            <MobileMenuButton 
              onClick={toggleMenu} 
              className={isScrolled || !isHome ? "text-foreground" : "text-white"}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu - use the MobileMenu component */}
      <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </nav>
  );
}

export default Navbar;
