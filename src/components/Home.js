import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Home.module.css'

function Home() {
  return (
    <div className={styles.bg}>
      <div className={styles.main}>
        <h2>Digital Games Shop</h2>
        <p>Shop for any games at a cheap price</p>
        <Link to='/shopping-cart/shop'>
          <div className={styles.btnShop}>SHOP NOW</div>
        </Link>
      </div>
    </div>
  )
}

export default Home
