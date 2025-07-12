
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  mobile?: boolean;
}

export function LanguageSwitcher({ className, mobile = false }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  // Flag emojis for languages
  const languageFlags = {
    en: "🇺🇸", // USA flag
    fr: "🇫🇷", // France flag
    ar: "🇩🇿", // Algeria flag
  };

  // Determine the current language display text and direction
  const isRTL = i18n.language === 'ar';

  if (mobile) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Language / Langue / اللغة</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => changeLanguage('fr')}
            className={cn(
              "px-3 py-2 text-sm rounded-md flex-1 flex items-center justify-center gap-2",
              i18n.language === 'fr' 
                ? "bg-primary/10 text-primary" 
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <span>{languageFlags.fr}</span> Français
          </button>
          <button
            onClick={() => changeLanguage('ar')}
            className={cn(
              "px-3 py-2 text-sm rounded-md flex-1 flex items-center justify-center gap-2",
              i18n.language === 'ar' 
                ? "bg-primary/10 text-primary" 
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <span>{languageFlags.ar}</span> العربية
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={cn(
              "px-3 py-2 text-sm rounded-md flex-1 flex items-center justify-center gap-2",
              i18n.language === 'en' 
                ? "bg-primary/10 text-primary" 
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <span>{languageFlags.en}</span> English
          </button>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className={cn("", className)}>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-lg border border-gray-200 bg-white/90 flex gap-2 items-center px-3 shadow-sm hover:bg-gray-50"
        >
          <Globe className="h-4 w-4 text-primary" />
          <span className="flex items-center gap-1">
            {i18n.language === 'en' ? (
              <>{languageFlags.en} EN</>
            ) : i18n.language === 'fr' ? (
              <>{languageFlags.fr} FR</>
            ) : (
              <>{languageFlags.ar} AR</>
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('fr')} className="flex gap-2 items-center">
          <span>{languageFlags.fr}</span>
          <span className={i18n.language === 'fr' ? "font-medium" : ""}>{t('language.french')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ar')} className="flex gap-2 items-center">
          <span>{languageFlags.ar}</span>
          <span className={i18n.language === 'ar' ? "font-medium" : ""}>{t('language.arabic')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')} className="flex gap-2 items-center">
          <span>{languageFlags.en}</span>
          <span className={i18n.language === 'en' ? "font-medium" : ""}>{t('language.english')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
