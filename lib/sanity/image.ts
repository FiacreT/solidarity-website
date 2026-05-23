import createImageUrlBuilder from '@sanity/image-url';
import { getSanityClient } from './client';

export function urlFor(source: any) {
  const builder = createImageUrlBuilder(getSanityClient());
  return builder.image(source);
}
