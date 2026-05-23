import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { MapPin, Heart } from 'lucide-react';
import { getReports } from '@/lib/sanity/queries';

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');

  let reports: any[] = [];
  try {
    reports = await getReports();
  } catch {
    // Sanity not configured yet
  }

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src="/logo.png"
                alt="Association Solidarity"
                width={80}
                height={80}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-3 font-body text-stone-400 text-sm leading-relaxed">
              {t('tagline')}
            </p>
            <div className="mt-4 flex items-center gap-2 text-stone-400 text-sm">
              <MapPin size={16} className="text-primary flex-shrink-0" />
              <span>{t('location')}</span>
            </div>
            <div className="mt-4">
              <p className="text-stone-400 text-sm mb-2">{t('follow_us')}</p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-stone-800 text-stone-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* About column */}
          <div>
            <h3 className="font-body font-semibold text-white mb-4">{t('about_col')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="font-body text-stone-400 hover:text-primary text-sm transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/mission`} className="font-body text-stone-400 hover:text-primary text-sm transition-colors">
                  {tNav('mission')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/members`} className="font-body text-stone-400 hover:text-primary text-sm transition-colors">
                  {tNav('members')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partnerships`} className="font-body text-stone-400 hover:text-primary text-sm transition-colors">
                  {tNav('partnerships')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions column */}
          <div>
            <h3 className="font-body font-semibold text-white mb-4">{t('actions_col')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/actions`} className="font-body text-stone-400 hover:text-primary text-sm transition-colors">
                  {tNav('actions')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/support`} className="font-body text-stone-400 hover:text-primary text-sm transition-colors">
                  {tNav('support')}
                </Link>
              </li>
            </ul>

            {reports.length > 0 && (
              <div className="mt-6">
                <h3 className="font-body font-semibold text-white mb-4">{t('reports_col')}</h3>
                <ul className="space-y-2">
                  {reports.map((report) => (
                    <li key={report._id}>
                      <a
                        href={report.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-stone-400 hover:text-primary text-sm transition-colors"
                      >
                        {report.title?.[locale] || report.title?.fr} ({report.year})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-body font-semibold text-white mb-4">{t('contact_col')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-stone-400 text-sm">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Douala, Cameroun</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href={`/${locale}/support`}
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-primary-dark transition-all"
              >
                <Heart size={14} />
                Faire un don
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 text-center">
          <p className="font-body text-stone-500 text-sm">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
