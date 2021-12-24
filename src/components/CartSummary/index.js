import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })
      return (
        <>
          <div className="cart-total-responsive-container">
            <h1 className="order-total">Order Total : </h1>
            <div className="cart-summary-container">
              <h1 className="order-total-heading">
                <BiRupee size={24} />
                <span className="total-count-value">{total}/-</span>
              </h1>
              <button type="button" className="place-order-btn mobile-btn">
                Place Order
              </button>
              <button type="button" className="place-order-btn desktop-btn">
                Place Order
              </button>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary