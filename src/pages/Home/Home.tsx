import React, { useEffect, useState } from "react";
import Title from "../../components/atoms/Title";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import styles from "./Home.module.scss";
import RecipeList from "../../components/organisms/RecipeList";
import { useRecipeContext } from "../../context/RecipeContext";
import { useFavorites } from "../../hooks/useFavorites";
import RecipeFullDetailedModal from "../../components/molecules/RecipeFullDetailedModal/RecipeFullDetailedModal";

const Home: React.FC = () => {
  const [term, setTerm] = useState("");
  const {
    recipes,
    selectedRecipe,
    setSelectedRecipe,
    searchRecipes,
    getAllRecipes,
    loadRecipesByPage,
    favoriteStatus,
  } = useRecipeContext();
  const { stored } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState("a");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  const displayedRecipes = showFavorites
    ? recipes.filter((recipe) => stored?.includes(recipe.idMeal))
    : recipes;

  const handleSearch = () => {
    if (term.trim()) {
      searchRecipes(term);
    }
  };

  const handleFavorites = () => {
    showFavorites ? getAllRecipes() : loadRecipesByPage(page);
  };

  const changePage = (page: string) => {
    setPage(page);
    setShowFavorites(false);
  };

  useEffect(() => {
    handleFavorites();
  }, [showFavorites, page, favoriteStatus]);

  return (
    <div className={styles.container}>
      <Title text="🍽️ Recipe Finder" />
      <Button onClick={toggleFavorites} className={styles.favoritesButton}>
        {showFavorites ? "Show All 🗒️" : "Favorites 🩷"}
      </Button>
      <div className={styles.searchBox}>
        <div className={styles.searchBar}>
          <Input
            placeholder="Enter ingredients or keyword..."
            value={term}
            onChange={(letter) => setTerm(letter.target.value)}
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <div className={styles.alphabetButtons}>
          {alphabet.split("").map((letter) => (
            <Button
              key={letter}
              variant="secondary"
              onClick={() => changePage(letter)}
            >
              {letter.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
      {/*loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}

      {!selectedRecipe &&
        (showFavorites ? (
          <RecipeList recipes={displayedRecipes} />
        ) : (
          <RecipeList recipes={recipes} />
        ))}

      {selectedRecipe && (
        <RecipeFullDetailedModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Home;
