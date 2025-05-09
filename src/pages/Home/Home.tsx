import React, { useState } from "react";
import Title from "../../components/atoms/Title";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import styles from "./Home.module.scss";
import { useRecipeSearch } from "../../hooks/useRecipeSearch";
import RecipeList from "../../components/organisms/RecipeList";

const Home: React.FC = () => {
  const [term, setTerm] = useState("");
  const { recipes, loading, error, search } = useRecipeSearch();

  const handleSearch = () => {
    search(term);
  };

  return (
    <div className={styles.container}>
      <Title text="🍽️ Recipe Finder" />
      <div className={styles.searchBox}>
        <Input
          placeholder="Enter ingredients or keyword..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <RecipeList recipes={recipes} onSelect={() => {}} />
    </div>
  );
};

export default Home;
