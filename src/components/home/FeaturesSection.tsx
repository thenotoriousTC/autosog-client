import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Phone, Clock, Shield } from 'lucide-react';
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-elevation-low text-center"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">
        {description}
      </p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Search className="h-7 w-7 text-primary" />,
      title: t('features.wideSelection.title'),
      description: t('features.wideSelection.description')
    },
    {
      icon: <Phone className="h-7 w-7 text-primary" />,
      title: t('features.directContact.title'),
      description: t('features.directContact.description')
    },
    {
      icon: <Clock className="h-7 w-7 text-primary" />,
      title: t('features.timeSaving.title'),
      description: t('features.timeSaving.description')
    },
    {
      icon: <Shield className="h-7 w-7 text-primary" />,
      title: t('features.trustedPlatform.title'),
      description: t('features.trustedPlatform.description')
    }
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('sections.whyChooseUs')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best car buying and selling experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

