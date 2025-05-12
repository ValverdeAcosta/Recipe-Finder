import React, { useEffect, useState, useMemo } from "react";
import Title from "../../components/atoms/Title";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import styles from "./Home.module.scss";
import RecipeList from "../../components/organisms/RecipeList";
import { useRecipeContext } from "../../context/RecipeContext";
import RecipeFullDetailedModal from "../../components/molecules/RecipeFullDetailedModal/RecipeFullDetailedModal";
import { LuRefreshCcw } from "react-icons/lu";
import { LOCALES } from "../../locales/en";

const Home: React.FC = () => {
  const [term, setTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState("a");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const {
    recipes,
    selectedRecipe,
    favorites,
    setSelectedRecipe,
    searchRecipes,
    getAllRecipes,
    loadRecipesByPage,
  } = useRecipeContext();

  const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

  const displayedRecipes = useMemo(() => {
    return showFavorites
      ? recipes.filter((recipe) => favorites.includes(recipe.idMeal))
      : recipes;
  }, [recipes, showFavorites, favorites]);

  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev);
    setIsSearchActive(true);
  };

  const handleSearch = () => {
    const trimmed = term.trim();
    if (trimmed) {
      searchRecipes(trimmed);
    }
    setIsSearchActive(true);
  };

  const handleAlphabetClick = (letter: string) => {
    setPage(letter);
    setShowFavorites(false);
    setIsSearchActive(false);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (isSearchActive && !showFavorites) return;

    if (showFavorites) {
      getAllRecipes();
      return;
    }

    loadRecipesByPage(page);
  }, [showFavorites, page, favorites]);

  return (
    <div className={styles.container}>
      <Title text={LOCALES.titles.main} variant="primary" />

      <Button onClick={toggleFavorites} className={styles.favoritesButton}>
        {showFavorites ? LOCALES.buttons.showAll : LOCALES.buttons.favorites}
      </Button>

      {!showFavorites && (
        <div className={styles.searchBox}>
          <div className={styles.searchBar}>
            <Input
              placeholder={LOCALES.placeholders.search}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <Button
              variant="search"
              onClick={handleSearch}
              disabled={!term.trim() || showFavorites}
            >
              {LOCALES.buttons.search}
            </Button>
          </div>

          <div className={styles.alphabetButtons}>
            {ALPHABET.map((letter) => (
              <Button
                key={letter}
                variant="keycaps"
                className={
                  page === letter && !isSearchActive
                    ? styles.selectedLetter
                    : ""
                }
                onClick={() => handleAlphabetClick(letter)}
              >
                {letter.toUpperCase()}
              </Button>
            ))}
            <Button
              key={"reload"}
              variant="keycaps"
              onClick={() => reloadPage()}
            >
              <LuRefreshCcw />
            </Button>
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
