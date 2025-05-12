export type RecipeFullDetailedProps = {
  recipe: Recipe;
  onClose: () => void;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "search" | "favorite" | "keycaps";
  children: React.ReactNode;
}

export interface TitleProps {
  text: string;
  variant?: "primary" | "secondary";
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

export interface RecipeListProps {
  recipes: Recipe[];
}

export interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;

  [key: `strIngredient${number}`]: string;
  [key: `strMeasure${number}`]: string;
}

export interface RecipeContextProps {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  searchRecipes: (query: string) => Promise<void>;
  getRecipeDetails: (id: string) => Promise<void>;
  getAllRecipes: () => Promise<void>;
  loadRecipesByPage: (page: string) => Promise<void>;
}
