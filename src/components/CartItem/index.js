import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value

      const {cartItemDetails} = props
      const {title, name, quantity, cost, imageUrl, id} = cartItemDetails

      const onDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const OnIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <dv className="cart-product-title-brand-container">
              <h1 className="cart-product-title">{name}</h1>
            </dv>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
              >
                <BsDashSquare color="#52606D" size={16} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={OnIncrementQuantity}
              >
                <BsPlusSquare color="#52606D" size={16} />
              </button>
            </div>
            <div className="total-price-delete-container">
              <BiRupee className="rupee-price" size={20} />
              <p className="cart-total-price">{cost * quantity}/-</p>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
