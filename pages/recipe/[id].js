import React, { useState } from "react";
import styles from "../../styles/RecipePage.module.scss";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

const Recipe = ({ meal }) => {
  const [search, setSearch] = useState("");
  const ingredients = [];

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // INGREDIENTS FOR THE RECIPE
  for (let i = 1; i <= 20; i++) {
    let ingredient = meal["strIngredient" + i];

    if (ingredient) {
      ingredients.push(`${ingredient}`);
    } else {
      break;
    }
  }
  // INSTRUCTIONS FOR THE RECIPE
  let instructions = "";
  // string case 1
  if (meal.strInstructions.includes("\r\n\r\n")) {
    instructions = meal.strInstructions
      .split("\r\n\r\n")
      .filter((str) => str.length > 6);
  }
  // string case 2
  instructions = meal.strInstructions
    .split("\r\n")
    .filter((str) => str.length > 6);

  return (
    <div className={styles.container}>
      <div className={styles.header__flexContainer}>
        <Link href="/">
          <h1>Recipe App</h1>
        </Link>

        <div className={styles.searchBoxContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchBox}
            onChange={handleChange}
          />
          <Link
            id="search"
            className={styles.searchButton}
            href={search ? `/search/${search}` : "/"}
          >
            <AiOutlineSearch />
          </Link>
        </div>
      </div>

      <div className={styles.flex}>
        <div className={styles.meal__img}>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>

        <div className={styles.ingredientsContainer}>
          <h2>Ingredients:</h2>
          <div className={styles.ingredients}>
            {ingredients.map((ingredient, i) => (
              <div key={i}>
                <img
                  src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                  alt={ingredient}
                  className={styles.ingredientImg}
                />
                <li>{ingredient}</li>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.instructions}>
        {instructions.length ? (
          instructions.map((step, i) => (
            <div key={i}>
              <h4>STEP {i + 1}</h4>
              <p>{step}</p>
            </div>
          ))
        ) : (
          <p>{meal.strInstructions}</p>
        )}
      </div>
    </div>
  );
};

export default Recipe;

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  const meal = data.meals[0];

  return {
    props: {
      meal,
    },
  };
}
