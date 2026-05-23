import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import SupportForm from '@/components/support/SupportForm';
import DonationButton from '@/components/support/DonationButton';
import { Heart, Shield, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Soutenir — Solidarity',
  description:
    "Rejoignez l'aventure de la solidarité. Faites un don, devenez bénévole ou partenaire de l'association Solidarity.",
};

function SupportContent() {
  const t = useTranslations('support');
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || 'placeholder';

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title={t('title')} subtitle={t('subtitle')} centered />
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-dark mb-8">
                {t('form_title')}
              </h2>
              <SupportForm formId={formId} />
            </div>

            {/* Donation */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-dark mb-4">
                {t('donate_title')}
              </h2>
              <p className="font-body text-stone-500 mb-8 leading-relaxed">
                {t('donate_subtitle')}
              </p>

              {/* Payment methods */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-light-bg px-4 py-2 rounded-full">
                  <Smartphone size={16} className="text-primary" />
                  <span className="font-body text-sm font-medium text-dark">MTN Mobile Money</span>
                </div>
                <div className="flex items-center gap-2 bg-light-bg px-4 py-2 rounded-full">
                  <Smartphone size={16} className="text-secondary" />
                  <span className="font-body text-sm font-medium text-dark">Orange Money</span>
                </div>
                <div className="flex items-center gap-2 bg-light-bg px-4 py-2 rounded-full">
                  <Shield size={16} className="text-blue-600" />
                  <span className="font-body text-sm font-medium text-dark">Visa</span>
                </div>
              </div>

              <DonationButton label={t('donate_button')} suggestedLabel={t('donate_amounts')} />

              {/* Impact block */}
              <div className="mt-12 bg-light-bg rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart size={20} className="text-primary" fill="currentColor" />
                  <h3 className="font-heading text-lg font-bold text-dark">
                    L'impact de votre don
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    { amount: '1 000 FCFA', impact: 'finance des fournitures essentielles pour 1 enfant' },
                    { amount: '2 500 FCFA', impact: 'offre un kit scolaire complet' },
                    { amount: '5 000 FCFA', impact: 'soutient une session de coaching' },
                    { amount: '10 000 FCFA', impact: 'permet de distribuer des repas pour une journée' },
                  ].map(({ amount, impact }) => (
                    <li key={amount} className="flex items-start gap-3">
                      <span className="font-body font-bold text-primary text-sm flex-shrink-0">
                        {amount}
                      </span>
                      <span className="font-body text-stone-600 text-sm">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function SupportPage() {
  return <SupportContent />;
}
