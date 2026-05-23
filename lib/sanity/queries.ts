import { getSanityClient, isSanityConfigured } from './client';

export async function getActions(category?: string) {
  if (!isSanityConfigured()) return [];
  const filter = category ? `&& category == "${category}"` : '';
  return getSanityClient().fetch(`
    *[_type == "action" ${filter}] | order(date desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      gallery,
      date,
      category
    }
  `);
}

export async function getMembers() {
  if (!isSanityConfigured()) return [];
  return getSanityClient().fetch(`
    *[_type == "member"] | order(order asc) {
      _id,
      name,
      role,
      status,
      photo,
      order
    }
  `);
}

export async function getPartners() {
  if (!isSanityConfigured()) return [];
  return getSanityClient().fetch(`
    *[_type == "partner"] {
      _id,
      name,
      description,
      logo,
      website
    }
  `);
}

export async function getReports() {
  if (!isSanityConfigured()) return [];
  return getSanityClient().fetch(`
    *[_type == "report"] | order(year desc) {
      _id,
      title,
      year,
      "fileUrl": file.asset->url
    }
  `);
}
