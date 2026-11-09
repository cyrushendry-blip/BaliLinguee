# BaliLinguee 🌺

A mobile-friendly app for learning Balinese.

## Features

- **Flashcards** with spaced repetition (Leitner boxes). Progress is saved in the browser.
- **Phrases** grouped by situation: meeting people, being polite, the market, food.
- **Speech levels**: everyday (Andap/Kasar) vs refined (Alus) Balinese, side by side.
- **Quiz**: 10 mixed multiple-choice questions.
- 🔊 **Listen** buttons use an Indonesian voice as an approximation, since browsers have no Balinese voice.

All the learning content lives in [`src/data/vocab.ts`](src/data/vocab.ts). Edit it to fix or add words.
Balinese varies by region, so check entries with a native speaker.

## Run locally

```bash
npm install
npm run dev
```

## Stack

React 18, Vite, TypeScript, Tailwind CSS. Deployed to GitHub Pages by `.github/workflows/deploy.yml`.
