import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = props => {
  const {orderPlaced} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let totalOrderCost = 0
        cartList.forEach(eachCartItem => {
          totalOrderCost += eachCartItem.cost * eachCartItem.quantity
        })

        const onClickPlaceOrder = () => {
          orderPlaced()
        }

        return (
          <>
            <div className="cart-total-responsive-container">
              <h1 className="order-total">Order Total:</h1>
              <div className="cart-summary-container">
                <p className="order-total-heading" testid="total-price">
                  <BiRupee size={24} />
                  {totalOrderCost}.00
                </p>

                <button
                  type="button"
                  className="place-order-btn"
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
