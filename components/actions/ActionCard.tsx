import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';
import { urlFor } from '@/lib/sanity/image';

interface ActionCardProps {
  action: {
    _id: string;
    title: { fr: string; en: string };
    description?: { fr: string; en: string };
    mainImage?: any;
    date?: string;
    category?: string;
  };
  locale: string;
}

const categoryLabels: Record<string, { fr: string; en: string }> = {
  kits: { fr: 'Kits scolaires', en: 'School kits' },
  coaching: { fr: 'Coaching', en: 'Coaching' },
  repas: { fr: 'Distribution repas', en: 'Meal distribution' },
};

export default function ActionCard({ action, locale }: ActionCardProps) {
  const title = action.title?.[locale as 'fr' | 'en'] || action.title?.fr || '';
  const description = action.description?.[locale as 'fr' | 'en'] || action.description?.fr || '';
  const categoryLabel = action.category
    ? categoryLabels[action.category]?.[locale as 'fr' | 'en'] || action.category
    : null;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 bg-light-bg overflow-hidden">
        {action.mainImage ? (
          <Image
            src={urlFor(action.mainImage).width(600).height(400).url()}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
            <span className="font-heading text-4xl text-primary/40">✦</span>
          </div>
        )}
        {categoryLabel && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-xs font-body font-semibold">
              <Tag size={12} />
              {categoryLabel}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-dark line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && (
          <p className="mt-2 font-body text-stone-500 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        )}
        {action.date && (
          <div className="mt-4 flex items-center gap-2 text-stone-400 text-sm">
            <Calendar size={14} />
            <time dateTime={action.date}>
              {new Date(action.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        )}
      </div>
    </article>
  );
}
