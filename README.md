# Recipe Finder App

A responsive and functional web application for searching and saving recipes using the [TheMealDB API](https://www.themealdb.com/api.php).

## 🛠 Stack

- React + Typescript + Vite
- SCSS (modular)
- ESLint
- Vitest + Testing Library
- Cypress (E2E testing)

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

Run E2E tests:

```bash
npm run cy:open
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

src/components — Reusable UI components

src/pages — Page-level components

src/api — API-related logic

src/hooks — Custom hooks

src/styles — SCSS styles

## 🧠 Notes

All recipe data is fetched from the open API: https://www.themealdb.com/api.php

Favorites will be saved on localstorage.
