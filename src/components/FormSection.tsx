
import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  icon?: LucideIcon;
  description?: string;
  className?: string;
}

/**
 * A reusable form section component that provides consistent styling
 * and layout for grouping related form fields.
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  icon: Icon,
  description,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
