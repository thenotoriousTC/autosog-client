
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import { SEO } from './SEO';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export function Layout({ children, title, description, keywords, image }: LayoutProps) {
  const location = useLocation();
  const { i18n } = useTranslation();
  const isHome = location.pathname === '/';
  const isRTL = i18n.language === 'ar';

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  return (
    <div className={cn(
      "flex flex-col min-h-screen",
      isRTL ? "font-arabic" : ""
    )}>
      <SEO title={title} description={description} keywords={keywords} image={image} />
      <Navbar />
      {/* Add appropriate padding so content doesn't get hidden, but not on home page */}
      <main className={cn(
        "flex-grow",
        isHome ? "" : "pt-16"
      )}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
