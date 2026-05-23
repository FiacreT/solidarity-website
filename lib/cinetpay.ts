export interface CinetPayConfig {
  apikey: string;
  site_id: string;
  notify_url: string;
  return_url: string;
  transaction_id: string;
  amount: number;
  currency: string;
  channels: string;
  description: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone_number?: string;
  customer_address?: string;
  customer_city?: string;
  customer_country?: string;
  customer_state?: string;
  customer_zip_code?: string;
}

export function generateTransactionId(): string {
  return `SOL_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export function initCinetPay(config: CinetPayConfig): void {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = 'https://cdn.cinetpay.com/seamless/main.js';
  script.onload = () => {
    (window as any).CinetPay.setConfig({
      apikey: config.apikey,
      site_id: config.site_id,
      notify_url: config.notify_url,
      return_url: config.return_url,
      mode: 'PRODUCTION',
    });

    (window as any).CinetPay.getCheckout({
      transaction_id: config.transaction_id,
      amount: config.amount,
      currency: config.currency || 'XAF',
      channels: config.channels || 'ALL',
      description: config.description,
      customer_name: config.customer_name || '',
      customer_email: config.customer_email || '',
      customer_phone_number: config.customer_phone_number || '',
      customer_address: config.customer_address || '',
      customer_city: config.customer_city || 'Douala',
      customer_country: config.customer_country || 'CM',
      customer_state: config.customer_state || 'CM',
      customer_zip_code: config.customer_zip_code || '00225',
    });

    (window as any).CinetPay.waitResponse(function (data: any) {
      if (data.status === 'ACCEPTED') {
        window.location.href = config.return_url + '?status=success';
      } else {
        window.location.href = config.return_url + '?status=failed';
      }
    });
  };
  document.head.appendChild(script);
}
