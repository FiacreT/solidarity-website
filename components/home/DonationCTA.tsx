import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export default function DonationCTA() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-8">
          <Heart size={32} className="text-white" fill="currentColor" />
        </div>

        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
          {t('donate_title')}
        </h2>
        <p className="mt-6 font-body text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
          {t('donate_subtitle')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/support`}
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-body font-bold text-lg hover:bg-accent transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <Heart size={20} fill="currentColor" />
            {t('donate_cta')}
          </Link>
          <Link
            href={`/${locale}/actions`}
            className="inline-flex items-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-full font-body font-semibold text-lg hover:border-white hover:bg-white/10 transition-all"
          >
            {t('view_all_actions')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
