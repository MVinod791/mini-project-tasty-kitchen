import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = props => {
  const {orderPlaced} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.cost * eachCartItem.quantity
        })

        const onClickPlaceOrder = () => {
          orderPlaced()
        }

        return (
          <>
            <div className="cart-total-responsive-container">
              <h1 className="order-total">Order Total:</h1>
              <div className="cart-summary-container" testid="total-price">
                <p testid="total-price" className="order-total-heading">
                  <BiRupee size={24} />
                  {total}.00
                </p>

                <button
                  type="button"
                  className="place-order-btn mobile-btn"
                  onClick={onClickPlaceOrder}
                >
                  Place Order
                </button>

                <button
                  type="button"
                  className="place-order-btn desktop-btn"
                  onClick={onClickPlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary
