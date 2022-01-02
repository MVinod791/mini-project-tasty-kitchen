import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value

      const {cartItemDetails} = props
      const {name, quantity, cost, imageUrl, id} = cartItemDetails

      const onDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const OnIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const renderHeadingName = () => (
        <h1 className="cart-item-mobile-name cart-item-mobile-name">{name}</h1>
      )

      return (
        <li className="cart-item" testid="cartItem">
          <div className="cart-item-info" testid="cartItem">
            <img className="cart-product-image" src={imageUrl} alt={name} />
            <h1 className="desktop-head">{renderHeadingName()}</h1>
          </div>

          <div className="cart-item-details-container" testid="cartItem">
            <h1 className="mobile-head">{renderHeadingName()}</h1>

            <div className="cart-quantity-container">
              <button
                testid="decrement-quantity"
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
              >
                <BsDashSquare color="#52606D" size={16} />
              </button>
              <p className="cart-quantity" testid="item-quantity">
                {quantity}
              </p>
              <button
                testid="increment-quantity"
                type="button"
                className="quantity-controller-button"
                onClick={OnIncrementQuantity}
              >
                <BsPlusSquare color="#52606D" size={16} />
              </button>
            </div>
            <p className="total-price-delete-container" testid="total-price">
              <BiRupee className="rupee-price" size={20} />
              {cost * quantity}
            </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
