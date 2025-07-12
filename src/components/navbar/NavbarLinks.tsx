
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLink {
  path: string;
  label: string;
  isHighlighted?: boolean;
}

interface NavbarLinksProps {
  links: NavLink[];
  linkClassName: string;
  highlightedLinkClassName?: string;
  onClick?: () => void;
  mobileView?: boolean;
}

/**
 * Component for rendering navigation links in the navbar
 */
const NavbarLinks: React.FC<NavbarLinksProps> = ({ 
  links, 
  linkClassName, 
  highlightedLinkClassName,
  onClick,
  mobileView = false
}) => {
  return (
    <>
      {links.map((link, index) => (
        <Link 
          key={index}
          to={link.path} 
          className={cn(
            linkClassName,
            link.isHighlighted && highlightedLinkClassName,
            mobileView && "block px-3 py-2 rounded-md text-base font-medium"
          )}
          onClick={onClick}
        >
          <span className="px-2">{link.label}</span>
        </Link>
      ))}
    </>
  );
};

export default React.memo(NavbarLinks); 
