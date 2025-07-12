
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  image = '/og-image.png'
}) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  // Set default values for each route
  const getDefaultSEO = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return {
        title: t('seo.home.title', 'AutoSog - Marketplace de Voitures en Algérie | Fiat, Renault, Peugeot'),
        description: t('seo.home.description', 'Trouvez des voitures d\'occasion et neuves en Algérie: Fiat Doblo, Renault Clio, Peugeot, Volkswagen Golf. Prix abordables.'),
        keywords: 'voitures, doblo, fiat, renault clio, peugeot, volkswagen golf, prix algerie'
      };
    } else if (path.startsWith('/search')) {
      return {
        title: t('seo.search.title', 'Rechercher des Voitures | AutoSog'),
        description: t('seo.search.description', 'Recherchez parmi des milliers de voitures en Algérie. Filtrez par marque, modèle, prix.'),
        keywords: 'recherche voiture, fiat doblo, renault clio, peugeot, bon prix, alger, oran'
      };
    } else if (path.startsWith('/about')) {
      return {
        title: t('seo.about.title', 'À Propos de AutoSog | Marketplace de Voitures'),
        description: t('seo.about.description', 'Découvrez AutoSog, votre plateforme de confiance pour acheter et vendre des voitures en Algérie.'),
        keywords: 'autosog, voitures algérie, marketplace autos, à propos, fiable'
      };
    } else if (path.startsWith('/listing/')) {
      return {
        title: t('seo.listing.title', 'Détails de la Voiture | AutoSog'),
        description: t('seo.listing.description', 'Détails complets de la voiture, spécifications, prix et informations de contact.'),
        keywords: 'détails voiture, fiat, renault, peugeot, prix, contact vendeur, algérie'
      };
    }
    
    // Default fallback
    return {
      title: t('seo.default.title', 'AutoSog - Marketplace de Voitures en Algérie'),
      description: t('seo.default.description', 'Achetez et vendez des voitures en Algérie facilement. Fiat, Renault, Peugeot et plus.'),
      keywords: 'voitures, marketplace, algérie, fiat doblo, renault clio, peugeot'
    };
  };
  
  // Get default SEO values for this route
  const defaultSEO = getDefaultSEO();
  
  // Use provided values or defaults
  const finalTitle = title || defaultSEO.title;
  const finalDescription = description || defaultSEO.description;
  const finalKeywords = keywords || defaultSEO.keywords;
  
  // Update document title
  React.useEffect(() => {
    document.title = finalTitle;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescription);
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', finalKeywords);
    }
    
    // Update Open Graph and Twitter meta tags
    const updateMetaTag = (selector: string, content: string) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      }
    };
    
    updateMetaTag('meta[property="og:title"]', finalTitle);
    updateMetaTag('meta[property="og:description"]', finalDescription);
    updateMetaTag('meta[property="og:image"]', image);
    updateMetaTag('meta[property="twitter:title"]', finalTitle);
    updateMetaTag('meta[property="twitter:description"]', finalDescription);
    updateMetaTag('meta[property="twitter:image"]', image);
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', i18n.language);
  }, [finalTitle, finalDescription, finalKeywords, image, i18n.language]);
  
  // This component doesn't render anything visible
  return null;
};

export default SEO;
