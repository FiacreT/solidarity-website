export const partner = {
  name: 'partner',
  title: 'Partenaire',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom',
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description',
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: { hotspot: true },
    },
    {
      name: 'website',
      type: 'url',
      title: 'Site web',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
};
