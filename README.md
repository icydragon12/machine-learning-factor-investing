# Machine Learning for Factor Investing

This project is a static, finance-native primer on how common supervised machine learning methods fit into factor investing, asset pricing, and regime-aware portfolio work.

## What it is

- A single-page React app built with Vite and TypeScript
- A visual guide for finance professionals, CFAs, equity analysts, portfolio managers, and discretionary investors
- A practical explanation of where ML helps, where it does not, and why point estimates often fail in markets

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

This repository is configured for GitHub Pages with the base path:

`/machine-learning-factor-investing/`

The included GitHub Actions workflow builds the site and deploys it to Pages.

If you are setting this up manually:

1. Create the GitHub repository `icydragon12/machine-learning-factor-investing`
2. Push this project to that repository
3. In GitHub repository settings, enable GitHub Pages from GitHub Actions

## Content editing guide

- Edit algorithm cards in `src/data/algorithms.ts`
- Edit practical use cases in `src/data/useCases.ts`
- Edit glossary terms in `src/data/glossary.ts`
- Edit workflow and roadmap content in `src/data/framework.ts`
- Edit layout and rendering logic in `src/App.tsx`
- Edit styling in `src/styles.css`

The site is intentionally structured so most copy changes happen in TypeScript data objects rather than inside JSX markup.

## Future roadmap

Planned placeholders are included for:

1. Real-data factor exercises
2. Penalized regression demo with public data
3. Tree model demo using factor characteristics
4. Regime similarity dashboard
5. Ensemble model demo
6. Public-data source guide
