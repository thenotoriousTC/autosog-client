import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SocialLink {
  icon: LucideIcon;
  url: string;
  label: string;
}

interface FooterSocialProps {
  socialLinks: SocialLink[];
}

/**
 * A component for displaying social media links in the footer
 */
const FooterSocial: React.FC<FooterSocialProps> = ({ socialLinks }) => {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <a 
            key={index}
            href={social.url} 
            className="text-slate-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
};

export default FooterSocial; 