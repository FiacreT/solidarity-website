import { clsx } from 'clsx';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={clsx(centered && 'text-center', className)}>
      <h2
        className={clsx(
          'font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
          light ? 'text-white' : 'text-dark'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'mt-4 text-lg md:text-xl max-w-2xl leading-relaxed',
            centered && 'mx-auto',
            light ? 'text-white/80' : 'text-stone-500'
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={clsx(
          'mt-4 h-1 w-16 rounded-full bg-primary',
          centered && 'mx-auto'
        )}
      />
    </div>
  );
}
