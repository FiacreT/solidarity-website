'use client';

import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { generateTransactionId } from '@/lib/cinetpay';

const SUGGESTED_AMOUNTS = [1000, 2500, 5000, 10000];

interface DonationButtonProps {
  label: string;
  suggestedLabel: string;
}

export default function DonationButton({ label, suggestedLabel }: DonationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<number | ''>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleAmountSelect = (val: number) => {
    setSelectedAmount(val);
    setAmount(val);
  };

  const handleDonate = () => {
    const finalAmount = typeof amount === 'number' && amount > 0 ? amount : null;
    if (!finalAmount) return;

    const apikey = process.env.NEXT_PUBLIC_CINETPAY_API_KEY || '';
    const site_id = process.env.NEXT_PUBLIC_CINETPAY_SITE_ID || '';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.solidarity.cm';

    if (typeof window !== 'undefined') {
      import('@/lib/cinetpay').then(({ initCinetPay }) => {
        initCinetPay({
          apikey,
          site_id,
          notify_url: `${siteUrl}/api/cinetpay/notify`,
          return_url: `${siteUrl}/fr/support`,
          transaction_id: generateTransactionId(),
          amount: finalAmount,
          currency: 'XAF',
          channels: 'ALL',
          description: 'Don Association Solidarity',
        });
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-body font-bold text-lg hover:bg-primary-dark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
      >
        <Heart size={20} fill="currentColor" />
        {label}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-2xl font-bold text-dark">Faire un don</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-400 hover:text-dark transition-colors"
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            </div>

            <p className="font-body text-stone-500 text-sm mb-6">{suggestedLabel}</p>

            {/* Suggested amounts */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {SUGGESTED_AMOUNTS.map((val) => (
                <button
                  key={val}
                  onClick={() => handleAmountSelect(val)}
                  className={`py-3 px-4 rounded-xl font-body font-semibold text-sm border-2 transition-all ${
                    selectedAmount === val
                      ? 'border-primary bg-primary text-white'
                      : 'border-stone-200 text-stone-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  {val.toLocaleString('fr-FR')} FCFA
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="relative mb-6">
              <input
                type="number"
                placeholder="Autre montant (FCFA)"
                value={selectedAmount === null ? amount : ''}
                onChange={(e) => {
                  setSelectedAmount(null);
                  setAmount(e.target.value ? Number(e.target.value) : '');
                }}
                className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 font-body text-dark focus:outline-none focus:border-primary transition-colors"
                min={100}
              />
            </div>

            <button
              onClick={handleDonate}
              disabled={!amount || (typeof amount === 'number' && amount <= 0)}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-full font-body font-bold text-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Heart size={20} fill="currentColor" />
              Confirmer le don
            </button>

            <p className="mt-4 text-center font-body text-xs text-stone-400">
              Paiement sécurisé via CinetPay · Mobile Money MTN/Orange · Visa
            </p>
          </div>
        </div>
      )}
    </>
  );
}
