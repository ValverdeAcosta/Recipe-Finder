import React, { useState } from "react";
import Title from "../../components/atoms/Title";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import styles from "./Home.module.scss";
import RecipeList from "../../components/organisms/RecipeList";
import { useRecipeContext } from "../../context/RecipeContext";

const Home: React.FC = () => {
  const [term, setTerm] = useState("");
  const { recipes, searchRecipes } = useRecipeContext();

  const handleSearch = () => {
    if (term.trim()) {
      searchRecipes(term);
    }
  };

  return (
    <div className={styles.container}>
      <Title text="🍽️ Recipe Finder" />
      <div className={styles.searchBox}>
        <Input
          placeholder="Enter ingredients or keyword..."
          value={term}
          onChange={(letter) => setTerm(letter.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {/*loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Home;
