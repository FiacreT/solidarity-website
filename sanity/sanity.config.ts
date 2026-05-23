import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Solidarity - Administration',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Actions')
              .schemaType('action')
              .child(S.documentTypeList('action')),
            S.listItem()
              .title('Membres')
              .schemaType('member')
              .child(S.documentTypeList('member')),
            S.listItem()
              .title('Partenaires')
              .schemaType('partner')
              .child(S.documentTypeList('partner')),
            S.listItem()
              .title("Rapports d'activités")
              .schemaType('report')
              .child(S.documentTypeList('report')),
          ]),
    }),
    visionTool(),
  ],
});
