import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'

import CartContext from '../../context/CartContext'
import './index.css'

class RestaurantFoodItem extends Component {
  state = {isClicked: false, quantity: 0}

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value

          const {isClicked, quantity} = this.state
          const {foodDetails} = this.props
          const {imageUrl, cost, name, rating, id} = foodDetails

          const onClickAdd = () => {
            this.setState(
              prevState => ({quantity: prevState.quantity + 1}),
              addCartItem({...foodDetails, quantity: quantity + 1}),
            )
          }

          const onDecrement = () => {
            decrementCartItemQuantity(id)
            // const {quantity} = this.state
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
          }

          const onIncrement = () => {
            incrementCartItemQuantity(id)
            this.setState(prevState => ({
              quantity: prevState.quantity + 1,
            }))
          }

          return (
            <li className="food-item" testid="foodItem">
              <img src={imageUrl} alt={name} className="food-item-image" />
              <div>
                <h1 className="food-item-name">{name}</h1>
                <p className="food-item-cost">
                  <BiRupee size={15} />
                  {cost}
                </p>
                <div className="food-rating">
                  <AiFillStar className="food-star" />
                  <p className="food-rating">{rating}</p>
                </div>
                {quantity > 0 ? (
                  <div className="food-item-quantity-container">
                    <button
                      testid="decrement-count"
                      type="button"
                      className="decrement-button"
                      onClick={onDecrement}
                    >
                      -
                    </button>
                    <p className="item-quantity-number" testid="active-count">
                      {quantity}
                    </p>
                    <button
                      testid="increment-count"
                      type="button"
                      className="increment-button"
                      onClick={onIncrement}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-button"
                    type="button"
                    onClick={onClickAdd}
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default RestaurantFoodItem
