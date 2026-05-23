import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('not_found');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="font-heading text-[160px] font-bold text-primary/10 leading-none select-none">
          404
        </div>
        <h1 className="font-heading text-3xl font-bold text-dark -mt-8 mb-4">
          {t('title')}
        </h1>
        <p className="font-body text-stone-500 text-lg leading-relaxed mb-10">
          {t('message')}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-body font-bold text-lg hover:bg-primary-dark transition-all shadow-xl"
        >
          <Home size={20} />
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
