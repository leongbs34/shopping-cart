import React, { useEffect, useState } from 'react'
import styles from '../css/Cart.module.css'

function Cart({toggleCart, hideCart, cart, cartIsEmpty, deleteGameFromCart}) {
  const [totalPrice, setTotalPrice] = useState(0)

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = cart.reduce((total, game) => total + (game.amount*game.price), 0)
      total = total.toFixed(2)

      setTotalPrice(total)
    }

    calculateTotalPrice()
  }, [cart])

  return (
    <>
      {toggleCart &&
        <div className={styles.bg} onClick={hideCart} >
          <div className={styles.main} onClick={(e) => {stopPropagation(e)}}>
            {cartIsEmpty && <i className={`fa fa-shopping-bag ${styles.bag}`} aria-hidden="true"></i>}
            <div className={styles.header}>
              <p>My Cart</p>
              <i className={`fa fa-times ${styles.close}`} aria-hidden="true" onClick={hideCart}></i>
            </div>
            <div className={styles.cart}>
              {cart.map(game => (
                <div className={styles.cartItems} key={game.id}>
                  <img src={game.img} alt={game.placeholder} />
                  <div className={styles.details} >
                    <li className={styles.gameTitle}>{game.name}</li>
                    <li>Amount: {game.amount}</li>
                    <li>Price: ${game.price*game.amount} </li>
                  </div>
                  <i class={`fa fa-trash ${styles.upperRight}`} aria-hidden="true" onClick={() => {deleteGameFromCart(game)}}></i>
                </div>
              ))}
            </div>
            {!cartIsEmpty && 
              <div className={styles.footer}>
                <div className={styles.price}>
                  <p>Total</p>
                  <p>${totalPrice}</p>
                </div>
                <button>Purchase Games</button>
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default Cart
