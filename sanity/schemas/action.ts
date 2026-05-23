export const action = {
  name: 'action',
  title: 'Action',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Titre',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title.fr' },
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description',
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Image principale',
      options: { hotspot: true },
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Galerie photos',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Catégorie',
      options: {
        list: [
          { title: 'Kits scolaires', value: 'kits' },
          { title: 'Coaching jeunes', value: 'coaching' },
          { title: 'Distribution de repas', value: 'repas' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title.fr',
      media: 'mainImage',
    },
  },
};
