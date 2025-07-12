import React, { ReactNode } from 'react';

interface FooterSectionProps {
  title: string;
  children: ReactNode;
}

/**
 * A reusable footer section component for displaying groups of footer content
 */
const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default FooterSection; 