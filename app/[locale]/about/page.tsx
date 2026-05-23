import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import { Heart, Eye, Target, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À propos — Solidarity',
  description:
    "Découvrez l'histoire de l'association Solidarity, sa mission, sa vision et ses valeurs.",
};

function AboutContent() {
  const t = useTranslations('about');

  const values = [
    { icon: Heart, key: 'solidarity' },
    { icon: Star, key: 'engagement' },
    { icon: Eye, key: 'transparency' },
    { icon: Target, key: 'social' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title={t('title')} centered />
          <p className="mt-8 font-body text-lg text-stone-600 leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Decorative */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl aspect-square flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="font-heading text-8xl text-primary/20 font-bold">"</div>
                  <p className="font-heading text-xl text-primary/60 italic mt-4">
                    Hébreux 13:1-2
                  </p>
                  <p className="mt-4 font-body text-stone-500 text-sm leading-relaxed italic">
                    Persévérez dans l'amour fraternel. N'oubliez pas l'hospitalité...
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary/20" />
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-secondary/20" />
            </div>

            {/* Story text */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-dark mb-6">
                {t('founder_title')}
              </h2>
              <div className="space-y-4">
                {t('founder_story')
                  .split('\n\n')
                  .map((paragraph, i) => (
                    <p key={i} className="font-body text-stone-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-light-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-dark mb-4">
                {t('vision_title')}
              </h3>
              <p className="font-body text-stone-600 leading-relaxed">{t('vision_text')}</p>
            </div>
            <div className="bg-white rounded-3xl p-10 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                <Target size={24} className="text-secondary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-dark mb-4">
                {t('mission_title')}
              </h3>
              <p className="font-body text-stone-600 leading-relaxed">{t('mission_text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('values_title')} centered className="mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, key }) => (
              <div key={key} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-light-bg group-hover:bg-primary/10 transition-colors mb-4">
                  <Icon size={28} className="text-primary" />
                </div>
                <p className="font-heading text-lg font-bold text-dark">
                  {t(`value_${key}` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function AboutPage() {
  return <AboutContent />;
}
