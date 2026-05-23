'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Heart } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { clsx } from 'clsx';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/actions`, label: t('actions') },
    { href: `/${locale}/partnerships`, label: t('partnerships') },
    { href: `/${locale}/mission`, label: t('mission') },
    { href: `/${locale}/members`, label: t('members') },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Association Solidarity"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-dark hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/support`}
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
            >
              <Heart size={16} />
              {t('support')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-dark hover:bg-light-bg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 font-body font-medium text-dark hover:text-primary hover:bg-light-bg rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href={`/${locale}/support`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-primary text-white px-5 py-3 rounded-full font-body font-semibold hover:bg-primary-dark transition-all"
              >
                <Heart size={16} />
                {t('support')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
