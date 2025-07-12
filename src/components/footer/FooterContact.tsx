import React from 'react';
import { MapPin, PhoneCall, Mail } from 'lucide-react';

interface FooterContactProps {
  address: {
    line1: string;
    line2: string;
  };
  phone: string;
  email: string;
}

/**
 * A component for displaying contact information in the footer
 */
const FooterContact: React.FC<FooterContactProps> = ({ address, phone, email }) => {
  return (
    <ul className="space-y-3">
      <li className="flex items-start">
        <MapPin className="mr-3 h-5 w-5 text-slate-300 flex-shrink-0 mt-0.5" />
        <span className="text-slate-300">
          {address.line1}<br />
          {address.line2}
        </span>
      </li>
      <li className="flex items-center">
        <PhoneCall className="mr-3 h-5 w-5 text-slate-300" />
        <a href={`tel:${phone}`} className="text-slate-300 hover:text-white transition-colors">
          {phone}
        </a>
      </li>
      <li className="flex items-center">
        <Mail className="mr-3 h-5 w-5 text-slate-300" />
        <a href={`mailto:${email}`} className="text-slate-300 hover:text-white transition-colors">
          {email}
        </a>
      </li>
    </ul>
  );
};

export default FooterContact; 