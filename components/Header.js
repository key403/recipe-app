import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from "../styles/Header.module.scss"
import {AiOutlineSearch} from "react-icons/ai"
import { useRouter } from "next/router";

const Header = () => {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleChange = async (value)=> {
    setSearch(value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    if (!search) return 

    const searchTerm = search
    setSearch("")
    router.push(`/search/${searchTerm}`)
  }


  return (
    <div className={styles.headerContainer}>
      <header className={styles.header__flexContainer}>
        <Link href="/">
          <h1>Recipe App</h1>
        </Link>

        <form className={`${styles.searchBoxContainer}`} onSubmit={handleSubmit} >
          <input type="text" placeholder='Search...' className={styles.searchBox} onChange={(e)=>handleChange(e.target.value)} value={search}/>
        </form>
      </header>

    </div>
  )
}

export default Header
