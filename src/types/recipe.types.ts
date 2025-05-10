export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export interface TitleProps {
  text: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

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
  favoriteStatus: boolean;
  searchRecipes: (query: string) => Promise<void>;
  getRecipeDetails: (id: string) => Promise<void>;
  getAllRecipes: () => Promise<void>;
  setFavoriteStatus: (isFav: boolean) => void;
  loadRecipesByPage: (pageIndex: string) => Promise<void>;
}

export interface UseFavoritesReturn {
  favorites: string[];
  addFavorite: (recipeId: string) => void;
  removeFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}
