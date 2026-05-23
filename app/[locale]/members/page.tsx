import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import MemberCard from '@/components/members/MemberCard';
import { getMembers } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Nos membres — Solidarity',
  description: "Rencontrez les membres de l'association Solidarity.",
};

const statusGroups = [
  { key: 'bureau', translationKey: 'bureau_title' },
  { key: 'sympathisant', translationKey: 'sympathizers_title' },
  { key: 'benevole', translationKey: 'volunteers_title' },
] as const;

function MembersContent({
  membersByStatus,
  locale,
}: {
  membersByStatus: Record<string, any[]>;
  locale: string;
}) {
  const t = useTranslations('members');

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-light-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title={t('title')} subtitle={t('subtitle')} centered />
        </div>
      </section>

      {/* Members by group */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {statusGroups.map(({ key, translationKey }) => {
            const members = membersByStatus[key] || [];
            if (members.length === 0) return null;

            return (
              <div key={key}>
                <h2 className="font-heading text-2xl font-bold text-dark mb-10 pb-4 border-b border-stone-100">
                  {t(translationKey)}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {members.map((member) => (
                    <MemberCard key={member._id} member={member} locale={locale} />
                  ))}
                </div>
              </div>
            );
          })}

          {Object.keys(membersByStatus).length === 0 && (
            <p className="font-body text-stone-400 italic text-center">{t('no_members')}</p>
          )}
        </div>
      </section>
    </>
  );
}

export default async function MembersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  let membersByStatus: Record<string, any[]> = {};

  try {
    const all = await getMembers();
    membersByStatus = all.reduce((acc: Record<string, any[]>, member: any) => {
      const status = member.status || 'other';
      acc[status] = acc[status] || [];
      acc[status].push(member);
      return acc;
    }, {});
  } catch {
    // Sanity not configured yet
  }

  return <MembersContent membersByStatus={membersByStatus} locale={locale} />;
}
