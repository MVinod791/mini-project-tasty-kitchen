import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Counter from '../Counter'
import CartContext from '../../context/CartContext'
import './index.css'

class RestaurantFoodItem extends Component {
  state = {isClicked: false, quantity: 1}

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
          const {addCartItem} = value

          const {isClicked, quantity} = this.state
          const {foodDetails} = this.props
          const {imageUrl, cost, name, rating} = foodDetails

          const onClickAdd = () => {
            this.setState(
              prevState => ({isClicked: !prevState.isClicked}),
              addCartItem({...foodDetails, quantity}),
            )
          }

          return (
            <li className="food-item" testid="foodItem">
              <img src={imageUrl} alt="" className="food-item-image" />
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
                {isClicked ? (
                  <div className="food-item-quantity-container">
                    <button
                      type="button"
                      className="decrement-button"
                      onClick={this.onDecrement}
                    >
                      -
                    </button>
                    <p className="item-quantity">{quantity}</p>
                    <button
                      type="button"
                      className="increment-button"
                      onClick={this.onIncrement}
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
