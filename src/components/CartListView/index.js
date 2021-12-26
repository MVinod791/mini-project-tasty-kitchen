import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const stringifiedCartList = localStorage.getItem('cartData')
      const parsedCartList = JSON.parse(stringifiedCartList)
      return (
        <ul className="cart-list">
          {parsedCartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
