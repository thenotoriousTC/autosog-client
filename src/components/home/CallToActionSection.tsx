import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CallToActionSection() {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            {t('cta.subtitle')}
          </p>
          <Button asChild size="lg">
            <Link to="/create-listing">
              {t('cta.button')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
