export const member = {
  name: 'member',
  title: 'Membre',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom complet',
    },
    {
      name: 'role',
      type: 'localeString',
      title: 'Rôle',
    },
    {
      name: 'status',
      type: 'string',
      title: 'Statut',
      options: {
        list: [
          { title: 'Membre du bureau', value: 'bureau' },
          { title: 'Sympathisant', value: 'sympathisant' },
          { title: 'Bénévole', value: 'benevole' },
        ],
      },
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    },
    {
      name: 'order',
      type: 'number',
      title: "Ordre d'affichage",
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.fr',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
