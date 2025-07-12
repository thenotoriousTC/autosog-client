
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FooterSection from './footer/FooterSection';
import FooterLinks from './footer/FooterLinks';
import FooterSocial from './footer/FooterSocial';
import FooterContact from './footer/FooterContact';

export const Footer = () => {
  const { t } = useTranslation();
  
  // Define link groups for reusability with translations
  const quickLinks = [
    { path: '/', label: t('navbar.home', 'Home') },
    { path: '/search', label: t('navbar.findCars', 'Search Cars') },
    { path: '/create-listing', label: t('navbar.sellYourCar', 'Sell Your Car') },
    { path: '/about', label: t('navbar.about', 'About Us') },
    { path: '#', label: t('navbar.contact', 'Contact Us') }
  ];

  const categoryLinks = [
    { path: '/search?bodyType=Sedan', label: t('vehicle.bodyTypes.sedan', 'Sedans') },
    { path: '/search?bodyType=SUV', label: t('vehicle.bodyTypes.suv', 'SUVs') },
    { path: '/search?bodyType=Hatchback', label: t('vehicle.bodyTypes.hatchback', 'Hatchbacks') },
    { path: '/search?fuelType=Electric', label: t('vehicle.fuelTypes.electric', 'Electric Cars') },
    { path: '/search?fuelType=Hybrid', label: t('vehicle.fuelTypes.hybrid', 'Hybrid Cars') }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' }
  ];

  const legalLinks = [
    { path: '#', label: t('footer.privacy', 'Privacy Policy') },
    { path: '#', label: t('footer.terms', 'Terms of Service') },
    { path: '#', label: t('footer.cookies', 'Cookie Policy') }
  ];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About section */}
          <div>
            <h3 className="text-xl font-bold mb-4">AutoSog</h3>
            <p className="text-slate-300 mb-4">
              {t('footer.description', 'The premier marketplace for buying and selling cars. Find your perfect vehicle or sell your car quickly and easily.')}
            </p>
            <FooterSocial socialLinks={socialLinks} />
          </div>

          {/* Quick links */}
          <FooterSection title={t('footer.quickLinks', 'Quick Links')}>
            <FooterLinks links={quickLinks} />
          </FooterSection>

          {/* Categories */}
          <FooterSection title={t('footer.categories', 'Categories')}>
            <FooterLinks links={categoryLinks} />
          </FooterSection>

          {/* Contact information */}
          <FooterSection title={t('footer.contactUs', 'Contact Us')}>
            <FooterContact 
              address={{
                line1: '123 Car Street, Auto City',
                line2: '75000 Paris, France'
              }}
              phone="+33 1 23 45 67 89"
              email="contact@autosog.com"
            />
          </FooterSection>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} AutoSog. {t('footer.allRightsReserved', 'All rights reserved.')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <FooterLinks links={legalLinks} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
