
import { Layout } from '@/components/Layout';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <Layout
      title="À Propos de AutoSog | Marketplace de Voitures en Algérie"
      description="Découvrez AutoSog, votre plateforme de confiance pour acheter et vendre des voitures en Algérie comme Fiat, Renault, Peugeot à prix abordables."
      keywords="autosog, voitures algérie, fiat doblo, renault clio, peugeot, bon prix, marketplace autos, à propos"
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">{t('about.title')}</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{t('about.ourMission.title')}</h2>
          <p className="mb-4 text-lg">{t('about.ourMission.description')}</p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{t('about.whyChooseUs.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">{t('about.whyChooseUs.reasons.trusted.title')}</h3>
              <p>{t('about.whyChooseUs.reasons.trusted.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">{t('about.whyChooseUs.reasons.easyToUse.title')}</h3>
              <p>{t('about.whyChooseUs.reasons.easyToUse.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">{t('about.whyChooseUs.reasons.wideSelection.title')}</h3>
              <p>{t('about.whyChooseUs.reasons.wideSelection.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">{t('about.whyChooseUs.reasons.communityFocused.title')}</h3>
              <p>{t('about.whyChooseUs.reasons.communityFocused.description')}</p>
            </div>
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{t('about.ourStory.title')}</h2>
          <p className="mb-4 text-lg">{t('about.ourStory.description')}</p>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">{t('about.joinUs.title')}</h2>
          <p className="mb-4 text-lg">{t('about.joinUs.description')}</p>
        </section>
        
        {/* Added Company Information Section */}
        <section className="pt-10 border-t border-gray-200">
          <div className="text-center">
            <p className="text-lg font-semibold">Built by SiSoft</p>
            <p className="text-gray-600 mt-1">CEO & FOUNDER : TAKI CHITER</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
