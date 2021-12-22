import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Counter from '../Counter'
import './index.css'

class RestaurantFoodItem extends Component {
  state = {isClicked: false}

  onClickAdd = () => {
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
  }

  render() {
    const {isClicked} = this.state
    const {foodDetails} = this.props
    const {imageUrl, cost, name, rating} = foodDetails
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
            <Counter />
          ) : (
            <button
              className="add-button"
              type="button"
              onClick={this.onClickAdd}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default RestaurantFoodItem
