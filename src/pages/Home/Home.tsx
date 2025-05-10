import React, { useEffect, useState } from "react";
import Title from "../../components/atoms/Title";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import styles from "./Home.module.scss";
import RecipeList from "../../components/organisms/RecipeList";
import { useRecipeContext } from "../../context/RecipeContext";
import { useFavorites } from "../../hooks/useFavorites";

const Home: React.FC = () => {
  const [term, setTerm] = useState("");
  const { recipes, searchRecipes, getAllRecipes, loadRecipesByPage } =
    useRecipeContext();
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
    if (showFavorites) {
      getAllRecipes();
    } else {
      loadRecipesByPage(page);
    }
  };

  const changePage = (page: string) => {
    setPage(page);
    setShowFavorites(false);
    handleFavorites();
  };

  useEffect(() => {
    handleFavorites();
  }, [showFavorites, page]);

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
      {showFavorites ? (
        <RecipeList recipes={displayedRecipes} />
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </div>
  );
};

export default Home;
