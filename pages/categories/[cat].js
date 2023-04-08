import React, { useState } from 'react'
import styles from "../../styles/Categories.module.scss"
import Link from 'next/link'
import {AiOutlineSearch} from "react-icons/ai"

const Categories = ({meals}) => {

  
  const [search, setSearch] = useState("")

  const handleChange = (e)=> {
    setSearch(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header__flexContainer}>
        <Link href="/">
          <h1>Recipe App</h1>
        </Link>

        <div className={styles.searchBoxContainer}>
          <input type="text" placeholder='Search...' className={styles.searchBox} onChange={handleChange}/>
          <Link id='search' className={styles.searchButton} href={search?`/search/${search}`: "/"}>
            <AiOutlineSearch />
          </Link>
        </div>
      </div>

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