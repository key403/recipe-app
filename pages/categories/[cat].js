import React from 'react'
import styles from "../../styles/Categories.module.scss"
import Link from 'next/link'

const Categories = ({meals}) => {

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

export default Categories

export async function getServerSideProps({ params: { cat } }) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  const data = await res.json()
  const meals = data?.meals

  return {
    props: {
      meals
    }
  }
}