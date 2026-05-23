import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { CheckCircle, Users } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'Notre mission — Solidarity',
  description:
    "Découvrez la mission de Solidarity : éducation, soutien et épanouissement des enfants vulnérables au Cameroun.",
};

function MissionContent() {
  const t = useTranslations('mission');

  const actions = [
    t('action1'),
    t('action2'),
    t('action3'),
    t('action4'),
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title={t('title')} subtitle={t('subtitle')} centered />
        </div>
      </section>

      {/* Mission content */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Actions list */}
            <div>
              <p className="font-body text-lg text-stone-600 mb-8 leading-relaxed">
                {t('content')}
              </p>
              <ul className="space-y-4">
                {actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckCircle size={22} className="text-secondary" />
                    </div>
                    <p className="font-body text-stone-700 leading-relaxed">{action}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Approach */}
            <div className="bg-light-bg rounded-3xl p-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Users size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-dark mb-4">
                {t('approach_title')}
              </h3>
              <p className="font-body text-stone-600 leading-relaxed">{t('approach_text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="font-heading text-3xl md:text-4xl font-bold text-white italic leading-tight">
            "Chaque enfant mérite une chance équitable de réussir."
          </blockquote>
          <p className="mt-6 font-body text-white/70">— Association Solidarity</p>
        </div>
      </section>
    </>
  );
}

export default function MissionPage() {
  return <MissionContent />;
}
