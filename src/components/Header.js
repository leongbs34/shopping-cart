import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Header.module.css'
import logo from '../images/logo.png'

function Header({showCart, cartAmount}) {
  return (
    <div className={`${styles.flex} ${styles.main}`}>
      <Link className={`${styles.label} ${styles.home}`} to='/shopping-cart/'>
        <img src={logo} alt="Space Invader" width='40px'/>
        <div>Pixel Games</div>
      </Link>
      <div className={styles.right} >
        <Link className={styles.label} to='/shopping-cart/shop'>
          <i className="fa fa-shopping-bag" aria-hidden="true"></i>
          <div>Shop</div> 
        </Link>
        <div className={styles.label} onClick={showCart}>
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          <div>Cart ({cartAmount})</div> 
        </div>
      </div>
    </div>
  )
}

export default Header
