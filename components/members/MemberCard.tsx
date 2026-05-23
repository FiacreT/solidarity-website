import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface MemberCardProps {
  member: {
    _id: string;
    name: string;
    role?: { fr: string; en: string };
    photo?: any;
    status: string;
  };
  locale: string;
}

export default function MemberCard({ member, locale }: MemberCardProps) {
  const role = member.role?.[locale as 'fr' | 'en'] || member.role?.fr || '';

  return (
    <div className="group text-center">
      {/* Photo */}
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-light-bg shadow-md group-hover:shadow-xl transition-shadow">
        {member.photo ? (
          <Image
            src={urlFor(member.photo).width(256).height(256).url()}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <span className="font-heading text-3xl font-bold text-primary">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <h3 className="font-heading text-lg font-bold text-dark">{member.name}</h3>
      {role && (
        <p className="mt-1 font-body text-sm text-stone-500">{role}</p>
      )}
    </div>
  );
}
