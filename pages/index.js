import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Header.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [categories, setCategories] = useState([])
 
  const API = "https://www.themealdb.com/api/json/v1/1/categories.php"


  useEffect(()=> {
    fetch(API)
      .then(res => res.json())
      .then(data => setCategories(data.categories))
  },[])

  return (
      <div className={styles.container}>
        <Head>
          <title>Recipe App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="fav-container">
          <h2 className={styles.favorites__title}>Favorite Meals</h2>

          <ul className={styles.favorites}>
            <li className={styles.favorites__item}>
              <Link href="/recipe/53040">
                <img
                  src="https://www.themealdb.com/images/media/meals/1c5oso1614347493.jpg"
                  alt="Empanadas"
                />
                <p>Empanadas</p>
              </Link>
            </li>

            <li className={styles.favorites__item}>
              <Link href="/recipe/52775">
                <img
                  src="https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg"
                  alt="lasagna"
                />
                <p>Lasagna</p>
              </Link>
            </li>

            <li className={styles.favorites__item}>
              <Link href="/recipe/53063">
                <img
                  src="https://www.themealdb.com/images/media/meals/n7qnkb1630444129.jpg"
                  alt="Chivito Uruguayo"
                />
                <p>Chivito uruguayo</p>
              </Link>
            </li>

            <li className={styles.favorites__item}>
              <Link href="/recipe/53014">
                <img
                  src="https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg"
                  alt="Pizza Express Margherita"
                />
                <p>Pizza Express Margherita</p>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={styles.categories__title}>Categories</h2>
          <ul className={styles.categories}>
            {categories.map((cat) => (
              <li key={cat.idCategory} className={styles.categories__item}>
                <Link href={`/categories/${cat.strCategory}`}>
                  <img
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    className={styles.categories__img}
                  />
                  <p>{cat.strCategory}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}
