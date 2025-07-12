
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/Layout';
import ListingForm from '@/components/ListingForm';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const CreateListing = () => {
  const { t } = useTranslation();
  
  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">{t('createListing.pageTitle')}</h1>
          <p className="text-muted-foreground mb-8">
            {t('createListing.pageSubtitle')}
          </p>
          <ListingForm />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default CreateListing;
