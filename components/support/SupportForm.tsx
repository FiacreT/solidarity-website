'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle } from 'lucide-react';

interface SupportFormProps {
  formId: string;
}

export default function SupportForm({ formId }: SupportFormProps) {
  const t = useTranslations('support');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [types, setTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('support_type', types.join(', '));

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setTypes([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
          <CheckCircle size={32} className="text-secondary" />
        </div>
        <p className="font-body text-lg font-semibold text-dark">{t('form_success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block font-body text-sm font-medium text-dark mb-1.5">
          {t('form_name')} *
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 font-body text-dark focus:outline-none focus:border-primary transition-colors"
          placeholder="Jean Dupont"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-body text-sm font-medium text-dark mb-1.5">
          {t('form_email')} *
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 font-body text-dark focus:outline-none focus:border-primary transition-colors"
          placeholder="jean@exemple.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block font-body text-sm font-medium text-dark mb-1.5">
          {t('form_phone')}
        </label>
        <input
          type="tel"
          name="phone"
          className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 font-body text-dark focus:outline-none focus:border-primary transition-colors"
          placeholder="+237 6XX XXX XXX"
        />
      </div>

      {/* Support type */}
      <div>
        <p className="block font-body text-sm font-medium text-dark mb-2">
          Type de soutien
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'volunteer', label: t('form_type_volunteer') },
            { value: 'donate', label: t('form_type_donate') },
            { value: 'partner', label: t('form_type_partner') },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleType(value)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium border-2 transition-all ${
                types.includes(value)
                  ? 'border-primary bg-primary text-white'
                  : 'border-stone-200 text-stone-600 hover:border-primary hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block font-body text-sm font-medium text-dark mb-1.5">
          {t('form_message')}
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 font-body text-dark focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="Partagez votre message..."
        />
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-500">{t('form_error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-full font-body font-bold text-lg hover:bg-primary-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        <Send size={20} />
        {status === 'loading' ? 'Envoi...' : t('form_submit')}
      </button>
    </form>
  );
}
