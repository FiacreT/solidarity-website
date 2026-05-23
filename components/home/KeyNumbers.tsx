import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';

const stats = [
  { value: '500+', key: 'children' },
  { value: '5+', key: 'years' },
  { value: '10+', key: 'partners' },
  { value: '1000+', key: 'meals' },
];

export default function KeyNumbers() {
  const t = useTranslations('home');

  return (
    <section className="py-24 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('stats_title')}
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, key }) => (
            <div key={key} className="text-center group">
              <div className="font-heading text-5xl md:text-6xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">
                {value}
              </div>
              <div className="mt-2 font-body text-stone-600 font-medium">
                {t(`stats_${key}` as any)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
