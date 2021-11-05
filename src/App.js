
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import './css/App.css';

function App() {
  const [toggleCart, setToggleCart] = useState(false);
  const [cart, setCart] = useState([])
  const [cartIsEmpty, setCartIsEmpty] = useState(true)
  const [cartAmount, setCartAmount] = useState(0)

  const hideCart = () => {
    setToggleCart(false);
  }

  const showCart = () => {
    setToggleCart(true);
  }

  const addGameToCart = (gameObj) => {
    const prevGames = (cart.length ? (cart.map((game) => game.id === gameObj.id ? {...game, amount: game.amount+1} : game)) : []);
    if (cart.every((game) => game.id !== gameObj.id)) {
      const newGame = {...gameObj, amount: 1}
      setCart([...prevGames, newGame])
    } else {
      setCart(prevGames)
    }
  }

  const deleteGameFromCart = (gameObj) => {
    const newCart = cart.filter((game) => game.id !== gameObj.id)
    setCart(newCart)
  }

  useEffect(() => {
    const checkCartIsEmpty = () => {
      if (cart.length === 0) {
        setCartIsEmpty(true)
      } else setCartIsEmpty(false)
    } 

    const countCart = () => {
      setCartAmount(cart.reduce((total, game) => total + (game.amount), 0));
    }

    countCart()
    checkCartIsEmpty()

  }, [cart])

  return (
    <div className="App">
      <Header showCart={showCart} cartAmount={cartAmount} />
      <Switch>
        <Route exact path='/shopping-cart/'>
          <Home />
        </Route>
        <Route exact path='/shopping-cart/shop'>
          <Shop addGameToCart={addGameToCart} />
        </Route>
        <Route exact path='/shopping-cart/shop/:categoryId'>
          <Shop addGameToCart={addGameToCart} />
        </Route>
      </Switch>
      <Cart 
        toggleCart={toggleCart} 
        hideCart={hideCart} cart={cart} 
        cartIsEmpty={cartIsEmpty} 
        deleteGameFromCart={deleteGameFromCart}
      />
    </div>
  );
}

export default App;
