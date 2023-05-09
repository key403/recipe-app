import React from 'react'
import styles from "../../styles/Search.module.scss"
import Link from 'next/link'

const searchAPI = "https://www.themealdb.com/api/json/v1/1/search.php?s="

const Search = ({meals}) => {

  return (
    <div className={styles.container}>

      <div>
        <ul className={styles.meals}>
          {meals?.map((meal)=>(
            <li key={meal.idMeal} className={styles.meals__img}>
              <Link href={`/recipe/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <p className={styles.meal__title}>{meal.strMeal}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Search

export async function getServerSideProps({params: {name}}) {
  const res = await fetch(`${searchAPI}${name}`)
  const data = await res.json()
  const meals = data.meals

  return {
    props: {
      meals
    }
  }
}