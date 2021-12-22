import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {quantity: 1}

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
    const {quantity} = this.state
    return (
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
    )
  }
}

export default Counter
