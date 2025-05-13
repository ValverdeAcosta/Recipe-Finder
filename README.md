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

To View the Coverage (Should be >80%):

```bash
npm run coverage
```

Run E2E tests:

_Make sure you have the project running_

- Visual (Browser/Electron)

```bash
npm run cy:open
```

- Terminal:

```bash
npm run cy:run
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

src/components — Reusable UI components built by Atomic Design standart

src/pages — Page-level components (Only Home as Landing Page)

src/services — API-related logic

src/hooks — Custom hooks for (S)OLID SRP

src/context — ContextAPI for state management

src/mocks — variable's imitations for checking their behaviour over tests

src/types — types isolated ready to import

src/locales — Locales for implementing i18n translations in the future...

cypress — e2e tests

## 🧠 Notes

All recipe data is fetched from the open API: https://www.themealdb.com/api.php

Favorites will be saved on localstorage.

You can check my decisions over the project clicking on Commits, I have tried to make each message as descriptive as possible, using Conventional Commits Standart.
