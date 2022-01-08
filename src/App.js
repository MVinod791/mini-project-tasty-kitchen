import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import CartContext from './context/CartContext'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'

import NotFound from './components/NotFound'

import './App.css'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class App extends Component {
  state = {cartList: getCartListFromLocalStorage()}

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = food => {
    const {cartList} = this.state
    const productObj = cartList.find(
      eachCartItem => eachCartItem.id === food.id,
    )
    if (productObj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === productObj.id) {
            const updateQuantity = eachCartItem.quantity + food.quantity

            return {...eachCartItem, quantity: updateQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, food]
      this.setState({cartList: updatedCartList})
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updateQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updateQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObj = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updateQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updateQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/bad-path" component={NotFound} />
            <Redirect to="/bad-path" />
          </Switch>
        </CartContext.Provider>
      </>
    )
  }
}

export default App
