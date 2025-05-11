import React, { useEffect, useState, useMemo } from "react";
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
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState("a");

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
  const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

  const displayedRecipes = useMemo(() => {
    return showFavorites
      ? recipes.filter((recipe) => stored?.includes(recipe.idMeal))
      : recipes;
  }, [recipes, stored, showFavorites]);

  const toggleFavorites = () => setShowFavorites((prev) => !prev);

  const handleSearch = () => {
    const trimmed = term.trim();
    if (trimmed) {
      searchRecipes(trimmed);
    }
  };

  const handleAlphabetClick = (letter: string) => {
    setPage(letter);
    setShowFavorites(false);
  };

  useEffect(() => {
    showFavorites ? getAllRecipes() : loadRecipesByPage(page);
  }, [showFavorites, page, favoriteStatus]);

  return (
    <div className={styles.container}>
      <Title text="🍽️ Recipe Finder" />

      <Button onClick={toggleFavorites} className={styles.favoritesButton}>
        {showFavorites ? "Show All 🗒️" : "Favorites 🩷"}
      </Button>
      {!showFavorites && (
        <div className={styles.searchBox}>
          <div className={styles.searchBar}>
            <Input
              placeholder="Enter a main ingredient or keyword..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={handleSearch}
              disabled={!term.trim() || showFavorites}
            >
              Search
            </Button>
          </div>

          <div className={styles.alphabetButtons}>
            {ALPHABET.map((letter) => (
              <Button
                key={letter}
                variant="secondary"
                className={page === letter ? styles.selectedLetter : ""}
                onClick={() => handleAlphabetClick(letter)}
              >
                {letter.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      )}

      {!selectedRecipe && <RecipeList recipes={displayedRecipes} />}

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
