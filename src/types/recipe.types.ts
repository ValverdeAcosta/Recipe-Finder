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
  onSelect: (recipe: Recipe) => void;
}

export interface SearchBarProps {
  onSearch: (term: string) => void;
}

export interface RecipeCardProps {
  title: string;
  image: string;
  description: string;
  onClick: () => void;
}
