import { createClient, type SanityClient } from '@sanity/client';

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    });
  }
  return _client;
}

export function isSanityConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
}
