import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D0D2B] via-[#5C1840] to-stone-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <Heart size={16} className="text-primary" fill="currentColor" />
          <span className="font-body text-white/90 text-sm font-medium">
            Association Solidarity — Douala, Cameroun
          </span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          {t('hero_title')}
        </h1>

        <p className="mt-6 font-body text-lg sm:text-xl md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed">
          {t('hero_subtitle')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/actions`}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-body font-semibold text-lg hover:bg-primary-dark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            {t('cta_discover')}
            <ArrowRight size={20} />
          </Link>
          <Link
            href={`/${locale}/support`}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-full font-body font-semibold text-lg hover:bg-white/25 transition-all"
          >
            <Heart size={20} />
            {t('cta_donate')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-0.5 h-12 bg-white/40 rounded-full" />
      </div>
    </section>
  );
}
