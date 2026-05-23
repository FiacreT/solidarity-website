import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import MissionSummary from '@/components/home/MissionSummary';
import KeyNumbers from '@/components/home/KeyNumbers';
import DonationCTA from '@/components/home/DonationCTA';
import ActionCard from '@/components/actions/ActionCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { getActions } from '@/lib/sanity/queries';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  let recentActions: any[] = [];
  try {
    const all = await getActions();
    recentActions = all.slice(0, 3);
  } catch {
    // Sanity not configured yet
  }

  return (
    <>
      <HeroSection />
      <MissionSummary />
      <KeyNumbers />
      {recentActions.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RecentActionsSection actions={recentActions} locale={locale} />
          </div>
        </section>
      )}
      <DonationCTA />
    </>
  );
}

function RecentActionsSection({ actions, locale }: { actions: any[]; locale: string }) {
  const t = useTranslations('home');

  return (
    <>
      <div className="flex items-end justify-between mb-12">
        <SectionTitle title={t('recent_actions_title')} subtitle={t('recent_actions_subtitle')} />
        <Link
          href={`/${locale}/actions`}
          className="hidden md:inline-flex items-center gap-2 font-body font-semibold text-primary hover:gap-3 transition-all"
        >
          {t('view_all_actions')}
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {actions.map((action) => (
          <ActionCard key={action._id} action={action} locale={locale} />
        ))}
      </div>
      <div className="mt-8 text-center md:hidden">
        <Link href={`/${locale}/actions`} className="inline-flex items-center gap-2 font-body font-semibold text-primary">
          {t('view_all_actions')} <ArrowRight size={18} />
        </Link>
      </div>
    </>
  );
}
