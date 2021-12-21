import {Component} from 'react'
import {MdOutlineSort} from 'react-icons/md'
import './index.css'

class RestaurantHeader extends Component {
  render() {
    return (
      <div className="restaurant-header-container">
        <div className="header-text-container">
          <h1 className="heading">Popular Restaurants</h1>
          <p className="instruction-para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <div className="sort-by-container">
          <MdOutlineSort className="sort-icon" />
          <select className="sort-by-options">
            <option value="lowest">Sort by Lowest</option>
            <option value="highest">Sort by Highest</option>
          </select>
        </div>
      </div>
    )
  }
}
export default RestaurantHeader
