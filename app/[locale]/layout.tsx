import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/app/globals.css';

const locales = ['fr', 'en'];

export const metadata: Metadata = {
  title: "Solidarity — Association pour l'éducation des enfants vulnérables",
  description:
    "SOLIDARITY agit au Cameroun pour l'éducation et le bien-être des enfants vulnérables. Kits scolaires, coaching, distribution de repas.",
  openGraph: {
    title: 'Solidarity',
    description: "Chaque enfant mérite une chance d'accès à l'éducation",
    url: 'https://www.solidarity.cm',
    siteName: 'Association Solidarity',
    locale: 'fr_CM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="pt-16 md:pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
