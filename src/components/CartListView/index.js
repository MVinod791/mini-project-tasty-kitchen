import {Component} from 'react'
import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import Payment from '../Payment'

import './index.css'

class CartListView extends Component {
  state = {
    isOrderPlaced: false,
  }

  orderPlaced = () => {
    this.setState(prevState => ({isOrderPlaced: !prevState.isOrderPlaced}))
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const stringifiedCartList = localStorage.getItem('cartData')
          const parsedCartList = JSON.parse(stringifiedCartList)
          return isOrderPlaced ? (
            <Payment />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <div className="cart-headers-cont">
                  <p className="cart-header-items">Item</p>
                  <div className="qty-price-cont">
                    <p className="cart-header-qty">Quantity</p>
                    <p className="cart-header-price">Price</p>
                  </div>
                </div>
                <ul className="cart-list">
                  {parsedCartList.map(eachCartItem => (
                    <CartItem
                      key={eachCartItem.id}
                      cartItemDetails={eachCartItem}
                      value={value}
                    />
                  ))}
                </ul>
                <hr className="cart-line" />
                <CartSummary orderPlaced={this.orderPlaced} />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartListView
