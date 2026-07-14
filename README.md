# Meshartim Ba'am (משרתים בע"מ)

![דף הבית - משרתים בע"מ](/public/images/app/og/mb-dark.png)


[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![Nuxt Content](https://img.shields.io/badge/Powered%20by-Nuxt%20Content-00DC82?logo=nuxt&labelColor=020420)](https://content.nuxt.com)

**Meshartim Ba'am** is a documentation platform for tracking public servant conduct, managing citizen inquiries, and promoting government transparency. Built with Nuxt 4, Nuxt UI, and Nuxt Content.

## Features

- **Inquiry Management** - Track and document citizen complaints with rich metadata
- **Servant Directory** - Maintain a searchable database of public servants
- **Bidirectional Relationships** - Link servants to inquiries and inquiries to related cases
- **Full-Text Search** - Search across all content with section-level results
- **Responsive Design** - Mobile-friendly interface with dark mode support
- **Static Site Generation** - Deploy anywhere as a fully static site
- **GitHub Pages Ready** - Automated deployment with GitHub Actions

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com)
- **UI Components**: [Nuxt UI](https://ui.nuxt.com)
- **Content Management**: [Nuxt Content](https://content.nuxt.com)
- **Deployment**: GitHub Pages (static export)

## Project Structure

```
content/
├── 1.inquiries/          # Inquiry pages (.md)
│   └── [office]/
│       └── [iid].md
├── 2.servants/           # Servant profiles (.yml)
│   └── [office]/
│       └── [name].yml
└── index.md              # Homepage

pages/
├── inquiries/            # Inquiry listing and detail pages
│   ├── index.vue         # All inquiries
│   └── [...slug].vue     # Single inquiry
├── servants/             # Servant listing and detail pages
│   ├── index.vue         # All servants
│   └── [...slug].vue     # Single servant
└── index.vue             # Homepage with marquees

components/               # Reusable Vue components
```

## Content Collections

### Inquiries (`content/1.inquiries/`)

Each inquiry is a Markdown file with YAML frontmatter:

```yaml
---
title: "תלונה וערר - דירה מפוצלת להשכרה כעסק"
description: "פנייה בנושא דירה מפוצלת המשמשת להשכרת חדרים באופן בלתי חוקי."
office: "עיריית נתניה"
status: "פתוח"
author: "אנונימי"
iid: "20260612-01"
idate: "15-03-2025"
involved: ["TALIM01", "AVIS01"]  # Servant SIDs
related: ["20260604-01"]         # Related inquiry IIDs
---
```

### Servants (`content/2.servants/`)

Each servant is a YAML file:

```yaml
---
title: "טלי מולנר"
office: "עיריית נתניה"
sid: "TALIM01"
email: "tali.mul@netanya.muni.il"
phone: "524440887"
photo: "/images/servants/tali-mulnar.webp"
---
```

## Quick Start

### Prerequisites

- Node.js 20+ (22 recommended)
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/tlvd/mb.git
cd mb

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open `http://localhost:3000` to view the site.

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm generate` | Generate static site |
| `pnpm preview` | Preview production build locally |

## Deployment

### GitHub Pages (Automatic)

Push to the `main` branch and GitHub Actions will automatically:

1. Install dependencies
2. Generate static site with `pnpm generate`
3. Deploy to `gh-pages` branch

### Manual Deployment

```bash
# Build the static site
pnpm generate

# Deploy to gh-pages branch
./deploy-gh-pages.sh
```

### Configuration

Update `nuxt.config.ts` with your repository name for GitHub Pages:

```ts
export default defineNuxtConfig({
  app: {
    baseURL: process.env.GITHUB_ACTIONS === 'true'
      ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || ''}/`
      : '/',
  }
})
```

## Content Management

### Creating a New Inquiry

1. Navigate to `content/1.inquiries/[office-name]/`
2. Create a new Markdown file named `[iid].md` (e.g., `20260615-01.md`)
3. Add required frontmatter (see example above)
4. Write the inquiry body in Markdown

### Creating a New Servant

1. Navigate to `content/2.servants/[office-name]/`
2. Create a new YAML file named `[name-slug].yml`
3. Add servant information using the schema above

### Adding Related Content

- **Involved Servants**: Add servant SIDs to the `involved` array in inquiry frontmatter
- **Related Inquiries**: Add inquiry IIDs to the `related` array

## Search Functionality

Full-text search is implemented using Nuxt Content's `queryCollectionSearchSections` API. Search results include:
- Page titles and content sections
- Custom fields (`iid`, `sid`) with manual enrichment
- Hierarchical navigation with headings

## Deployment Script

The `deploy-gh-pages.sh` script creates a clean `gh-pages` branch containing only the built static files:

```bash
# Make script executable
chmod +x deploy-gh-pages.sh

# Run deployment
./deploy-gh-pages.sh
```

## Troubleshooting

### Clean Installation

```bash
rm -rf node_modules pnpm-lock.yaml .nuxt .output
pnpm install
pnpm dev
```

## License

[MIT](LICENSE)

## Acknowledgments

- Built on the [Nuxt Docs Template](https://github.com/nuxt-ui-templates/docs)
- Icons by [Lucide](https://lucide.dev)
- Deployments by [GitHub Actions](https://github.com/features/actions)

---

**Meshartim Ba'am** - Documenting public service, promoting transparency. 🇮🇱
