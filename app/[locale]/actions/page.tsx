import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { BookOpen, Lightbulb, Utensils } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import ActionCard from '@/components/actions/ActionCard';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}
import MediaGallery from '@/components/actions/MediaGallery';
import { getActions } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Nos actions — Solidarity',
  description:
    'Découvrez les actions de Solidarity : distributions de kits scolaires, coaching jeunes et distribution de repas à Douala.',
};

const actionTypes = [
  {
    key: 'kits',
    icon: BookOpen,
    color: 'text-primary',
    bg: 'bg-primary/5',
    category: 'kits',
  },
  {
    key: 'coaching',
    icon: Lightbulb,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    category: 'coaching',
  },
  {
    key: 'meals',
    icon: Utensils,
    color: 'text-secondary-dark',
    bg: 'bg-secondary/10',
    category: 'repas',
  },
];

function ActionsContent({
  actionsByCategory,
  locale,
}: {
  actionsByCategory: Record<string, any[]>;
  locale: string;
}) {
  const t = useTranslations('actions');

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title={t('title')} subtitle={t('subtitle')} centered />
        </div>
      </section>

      {/* Action sections */}
      {actionTypes.map(({ key, icon: Icon, color, bg, category }) => {
        const actions = actionsByCategory[category] || [];
        const allImages = actions.flatMap((a: any) => a.gallery || []);

        return (
          <section key={key} className="py-20 bg-white even:bg-light-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-6 mb-10">
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}>
                  <Icon size={28} className={color} />
                </div>
                <div>
                  <h2 className="font-heading text-3xl font-bold text-dark">
                    {t(`${key}_title` as any)}
                  </h2>
                  <p className="mt-2 font-body text-stone-500 max-w-2xl leading-relaxed">
                    {t(`${key}_desc` as any)}
                  </p>
                </div>
              </div>

              {actions.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {actions.map((action: any) => (
                      <ActionCard key={action._id} action={action} locale={locale} />
                    ))}
                  </div>
                  {allImages.length > 0 && (
                    <MediaGallery images={allImages} title={t('gallery_title')} />
                  )}
                </>
              ) : (
                <p className="font-body text-stone-400 italic">{t('no_actions')}</p>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}

export default async function ActionsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  let actionsByCategory: Record<string, any[]> = {};

  try {
    const all = await getActions();
    actionsByCategory = all.reduce((acc: Record<string, any[]>, action: any) => {
      const cat = action.category || 'other';
      acc[cat] = acc[cat] || [];
      acc[cat].push(action);
      return acc;
    }, {});
  } catch {
    // Sanity not configured yet
  }

  return <ActionsContent actionsByCategory={actionsByCategory} locale={locale} />;
}
