export const report = {
  name: 'report',
  title: "Rapport d'activités",
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Titre',
    },
    {
      name: 'year',
      type: 'number',
      title: 'Année',
    },
    {
      name: 'file',
      type: 'file',
      title: 'Fichier PDF',
      options: {
        accept: '.pdf',
      },
    },
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'year',
    },
  },
  orderings: [
    {
      title: 'Année (récent en premier)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
};
