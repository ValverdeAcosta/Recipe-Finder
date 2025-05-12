export const LOCALES = {
  buttons: {
    search: "Search !",
    showAll: "Show All 🗒️",
    favorites: "Favorites 🩷",
    refresh: "Refresh 🔄",
  },
  placeholders: {
    search: "Enter a main ingredient or keyword...",
  },
  titles: {
    main: "🍽️ Recipe Finder",
  },
} as const;

export default LOCALES;

export const LOCALES_MODAL = {
  labels: {
    category: "Category:",
    country: "Country:",
    ingredients: "🧾 Ingredients",
    instructions: "Instructions:",
  },
  buttons: {
    close: "❌",
    addFavorite: "❤️ Add to Favorites",
    removeFavorite: "💔 Remove Favorite",
  },
} as const;
