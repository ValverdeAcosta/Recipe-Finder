import type { Recipe } from "../types/recipe.types";

export const mockRecipes: Recipe[] = [
  {
    idMeal: "1",
    strMeal: "Spaghetti Carbonara",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    strInstructions:
      "Boil the spaghetti. Fry pancetta with garlic. Mix eggs with Parmesan. Combine all together off heat with a splash of pasta water.",
  },
  {
    idMeal: "2",
    strMeal: "Chicken Alfredo",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
    strInstructions:
      "Cook fettuccine. Sauté chicken. Prepare Alfredo sauce with cream, butter, and Parmesan. Combine everything and serve hot.",
  },
  {
    idMeal: "3",
    strMeal: "Beef Stroganoff",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/svprys1511176755.jpg",
    strInstructions:
      "Sear beef strips. Cook onions and mushrooms. Add sour cream and mustard. Simmer. Serve over egg noodles or rice.",
  },
];
