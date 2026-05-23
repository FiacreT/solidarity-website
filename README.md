# Association Solidarity — Site Web

Site vitrine bilingue (FR/EN) de l'association **Solidarity**, basée à Douala, Cameroun.

## Stack technique

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Sanity.io** (CMS)
- **next-intl** (i18n FR/EN)
- **Formspree** (formulaire de contact)
- **CinetPay** (dons Mobile Money + Visa)
- **Vercel** (déploiement)

## Démarrage rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Remplir les valeurs dans `.env.local` :

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID du projet Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset Sanity (ex: `production`) |
| `SANITY_API_TOKEN` | Token API Sanity (lecture/écriture) |
| `NEXT_PUBLIC_CINETPAY_API_KEY` | Clé API CinetPay |
| `NEXT_PUBLIC_CINETPAY_SITE_ID` | Site ID CinetPay |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | ID du formulaire Formspree |
| `NEXT_PUBLIC_SITE_URL` | URL du site en production |

### 3. Lancer en développement

```bash
npm run dev
```

Le site sera disponible sur [http://localhost:3000](http://localhost:3000).

Le Studio Sanity sera accessible sur [http://localhost:3000/studio](http://localhost:3000/studio).

## Configuration des services

### Sanity.io (CMS)

1. Créer un compte sur [sanity.io](https://sanity.io)
2. Créer un nouveau projet
3. Récupérer le `Project ID` depuis le tableau de bord
4. Générer un token API (Settings → API → Tokens)
5. Ajouter `localhost:3000` aux CORS origins autorisées

### CinetPay (Dons)

1. Créer un compte sur [cinetpay.com](https://cinetpay.com)
2. Récupérer la clé API et le Site ID dans le tableau de bord

### Formspree (Formulaire)

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Copier l'ID du formulaire (ex: `xpwzabcd`)

## Structure du projet

```
solidarity-website/
├── app/
│   ├── [locale]/          # Pages avec i18n (fr/en)
│   │   ├── page.tsx       # Accueil
│   │   ├── about/         # À propos
│   │   ├── actions/       # Nos actions
│   │   ├── partnerships/  # Partenariats
│   │   ├── mission/       # Notre mission
│   │   ├── members/       # Nos membres
│   │   └── support/       # Soutenir (dons + formulaire)
│   └── studio/            # Sanity Studio (admin CMS)
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Sections de la page d'accueil
│   ├── actions/           # Cards et galerie
│   ├── members/           # Cards membres
│   ├── support/           # Formulaire et bouton de don
│   └── ui/                # Composants réutilisables
├── lib/
│   ├── sanity/            # Client et requêtes Sanity
│   └── cinetpay.ts        # Intégration CinetPay
├── messages/
│   ├── fr.json            # Traductions françaises
│   └── en.json            # Traductions anglaises
└── sanity/
    └── schemas/           # Schémas de contenu Sanity
```

## Déploiement sur Vercel

1. Pousser le code sur GitHub
2. Connecter le repo sur [vercel.com](https://vercel.com)
3. Ajouter les variables d'environnement dans les settings Vercel
4. Configurer un webhook Sanity → Vercel pour les mises à jour automatiques de contenu :
   - Dans Sanity : Settings → API → Webhooks
   - URL : `https://api.vercel.com/v1/integrations/deploy/[VOTRE_HOOK_ID]`

## Gestion du contenu (Sanity)

Accéder au Studio : `https://www.solidarity.cm/studio`

Contenu gérable :
- **Actions** : ajouter des événements avec photos, descriptions, catégories
- **Membres** : bureau, sympathisants, bénévoles avec photos
- **Partenaires** : logos, descriptions, liens
- **Rapports d'activités** : upload de PDF annuels

## Langues

Le site supporte le français (défaut) et l'anglais. Les URLs sont préfixées :
- `/fr/...` — Version française
- `/en/...` — Version anglaise
