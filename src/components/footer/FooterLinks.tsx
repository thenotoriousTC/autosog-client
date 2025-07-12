import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
  path: string;
  label: string;
  external?: boolean;
}

interface FooterLinksProps {
  links: FooterLink[];
}

/**
 * A reusable component for displaying a list of footer links
 */
const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => {
  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          {link.external ? (
            <a 
              href={link.path} 
              className="text-slate-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <Link to={link.path} className="text-slate-300 hover:text-white transition-colors">
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks; 