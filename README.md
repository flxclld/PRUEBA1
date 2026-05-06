# GranFormato

Premium large-format art website built with Next.js and prepared for Sanity CMS.

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Sanity setup

1. Create a Sanity project at `https://www.sanity.io/manage`.
2. Copy `.env.example` to `.env.local`.
3. Fill:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-06
```

4. Start the website:

```bash
npm run dev
```

5. Open the Studio:

```text
http://localhost:3000/studio
```

Until those variables are configured, the site uses local fallback artwork data so the frontend still works.

## Content models

- Artist
- Artwork
- Quote request
- Site settings
