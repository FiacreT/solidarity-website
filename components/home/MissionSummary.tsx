import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { BookOpen, Lightbulb, Utensils, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const actions = [
  {
    key: 'kits',
    icon: BookOpen,
    color: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    key: 'coaching',
    icon: Lightbulb,
    color: 'text-secondary',
    iconBg: 'bg-secondary/10',
  },
  {
    key: 'meals',
    icon: Utensils,
    color: 'text-secondary-dark',
    iconBg: 'bg-secondary/20',
  },
];

export default function MissionSummary() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('mission_title')}
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map(({ key, icon: Icon, color, iconBg }) => (
            <div
              key={key}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${iconBg} mb-6`}>
                <Icon size={28} className={color} />
              </div>
              <h3 className="font-heading text-xl font-bold text-dark mb-3">
                {t(`mission_${key}_title` as any)}
              </h3>
              <p className="font-body text-stone-500 leading-relaxed">
                {t(`mission_${key}_desc` as any)}
              </p>
              <div className="mt-6">
                <Link
                  href={`/${locale}/actions`}
                  className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:gap-3 transition-all"
                >
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
