'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { clsx } from 'clsx';

interface LanguageSwitcherProps {
  light?: boolean;
}

export default function LanguageSwitcher({ light = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-1">
      {['fr', 'en'].map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={clsx(
            'px-2 py-1 rounded text-sm font-semibold font-body uppercase transition-colors',
            locale === lang
              ? light
                ? 'text-white bg-white/20'
                : 'text-primary bg-primary/10'
              : light
              ? 'text-white/60 hover:text-white'
              : 'text-stone-500 hover:text-primary'
          )}
          aria-label={lang === 'fr' ? 'Passer en français' : 'Switch to English'}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
