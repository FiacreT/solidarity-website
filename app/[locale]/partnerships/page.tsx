import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Handshake } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { getPartners } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

export const metadata: Metadata = {
  title: 'Nos partenariats — Solidarity',
  description: "Découvrez les partenaires de l'association Solidarity et comment nous rejoindre.",
};

function PartnershipsContent({
  partners,
  locale,
}: {
  partners: any[];
  locale: string;
}) {
  const t = useTranslations('partnerships');

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title={t('title')} subtitle={t('subtitle')} centered />
        </div>
      </section>

      {/* Current partners */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-dark mb-12">
            {t('current_title')}
          </h2>

          {/* Born To Shine (static) */}
          <div className="bg-light-bg rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="flex-shrink-0 w-32 h-32 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              <span className="font-heading text-xl font-bold text-primary text-center leading-tight px-2">
                Born To Shine
              </span>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-dark mb-3">
                Born To Shine
              </h3>
              <p className="font-body text-stone-600 leading-relaxed">
                {t('born_to_shine_desc')}
              </p>
            </div>
          </div>

          {/* Partners from Sanity */}
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-light-bg rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 mb-8"
            >
              <div className="flex-shrink-0 w-32 h-32 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden">
                {partner.logo ? (
                  <Image
                    src={urlFor(partner.logo).width(200).height(200).url()}
                    alt={partner.name}
                    width={128}
                    height={128}
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="font-heading text-lg font-bold text-primary text-center px-2">
                    {partner.name}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-dark mb-3">
                  {partner.name}
                </h3>
                <p className="font-body text-stone-600 leading-relaxed">
                  {partner.description?.[locale] || partner.description?.fr}
                </p>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:underline"
                  >
                    Visiter le site <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Become a partner */}
      <section className="py-24 bg-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-8">
            <Handshake size={32} className="text-primary" />
          </div>
          <h2 className="font-heading text-4xl font-bold text-white mb-6">
            {t('join_title')}
          </h2>
          <p className="font-body text-stone-400 text-lg leading-relaxed mb-10">
            {t('join_desc')}
          </p>
          <Link
            href={`/${locale}/support`}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-body font-bold text-lg hover:bg-primary-dark transition-all shadow-xl"
          >
            {t('join_cta')}
          </Link>
        </div>
      </section>
    </>
  );
}

export default async function PartnershipsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  let partners: any[] = [];
  try {
    partners = await getPartners();
  } catch {
    // Sanity not configured yet
  }

  return <PartnershipsContent partners={partners} locale={locale} />;
}
