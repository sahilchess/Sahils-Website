# Sahil's Website

Personal portfolio website built with **React + Vite**.

## Pages

- Home
- About
- Projects
- Browser Projects
- Contact

Navigation is hash-based (for example: `#/home`, `#/projects`).

## Tech Stack

- React 18
- Vite 5

## Local Development

From the project root:

1. Install dependencies:
   - `npm install`
2. Start the development server:
   - `npm run dev`

## Build and Preview

- Build production files:
  - `npm run build`
- Preview the production build locally:
  - `npm run preview`

The build output is generated in `docs/`.

## Deployment

GitHub Actions deploys the site to GitHub Pages on pushes to `main` using `.github/workflows/deploy.yml`.

## Project Structure

- `src/` — React source code (pages, components, styles, content data)
- `docs/` — generated production build assets
- `python/` — legacy standalone Python projects
- `index.html` — landing redirect page that routes visitors to the built app path
- `app.html` — Vite app entry file used during development and build generation
