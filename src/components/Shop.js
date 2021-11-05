import React, { useEffect } from 'react'
import { useState } from 'react'
import { Route, Switch, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styles from '../css/Shop.module.css'
import allGames from '../data/allGames'
import categories from '../data/categories'

function Shop({addGameToCart}) {
  let {categoryId} = useParams()
  const category = categories.find((category) => category.id === categoryId);
  const [gamesSortedByCategory, setGamesSortedByCategory] = useState([]);
  const [Games, setGames] = useState([]);

  const arrangeAllGames = () => {
    let gameArr = []
    let Games = []

    allGames.forEach((game) => {
      if (!gameArr.includes(game.name)) {
        gameArr = [...gameArr, game.name];
        Games.push(game)
      }
    })

    setGames(Games);
  }

  useEffect(() => {
    if (category) {
      const gamesSortedByCategory = allGames.filter(game => game.category === categoryId);

      setGamesSortedByCategory(gamesSortedByCategory);
    }
  }, [categoryId, category]);

  useEffect(() => {
    arrangeAllGames();
    
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.title}>
            <Switch>
              <Route exact path='/shopping-cart/shop'>
                All Games
              </Route>
              <Route exact path='/shopping-cart/shop/:categoryId'>
                {category && category.name}
              </Route>
            </Switch>
          </div>
          <div className={styles.category}>
            {categories.map((category) => (
              <Link 
                to={`/shopping-cart/shop/${category.id}`}
                key={category.id}
              >
                <div>{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.main}>
          <Switch>
            <Route exact path='/shopping-cart/shop'>
              {Games && Games.map(game => (
                <div key={game.id} className={styles.card}>
                  <img src={game.img} alt={game.placeholder} width='257' height='145'/>
                  <li>{game.name}</li>
                  <div className={styles.purchase}>
                    <li>${game.price}</li>
                    <i onClick={() => addGameToCart(game)} className={`fa fa-shopping-cart ${styles.btnCart}`} aria-hidden="true" title='Add game to cart'></i>
                  </div>
                </div>
              ))}
            </Route>
            <Route exact path='/shopping-cart/shop/:categoryId'>
              {gamesSortedByCategory.map(game => (
                <div key={game.id} className={styles.card}>
                  <img src={game.img} alt={game.placeholder} width='257' height='145'/>
                  <li>{game.name}</li>
                  <div className={styles.purchase}>
                    <li>${game.price}</li>
                    <i onClick={() => addGameToCart(game)} className={`fa fa-shopping-cart ${styles.btnCart}`} aria-hidden="true" title='Add game to cart'></i>
                  </div>
                </div>
              ))}
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Shop
