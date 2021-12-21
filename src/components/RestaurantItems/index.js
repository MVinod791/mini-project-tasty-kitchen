import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItems = props => {
  const {restaurantItemData} = props
  const {
    id,
    name,
    cuisine,
    imageUrl,
    rating,
    ratingColor,
    totalReviews,
  } = restaurantItemData
  return (
    <li className="restaurant-item">
      <Link to={`/restaurant/${id}`} className="link">
        <img src={imageUrl} alt="restaurant" className="item-image" />
        <div className="item-details-container">
          <p className="item-name">{name}</p>
          <p className="item-type">{cuisine}</p>
          <div className="rating-container">
            <AiFillStar className="star" style={{color: `${ratingColor}`}} />
            <p className="rating">{rating}</p>
            <p className="total-reviews">({totalReviews} reviews)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default RestaurantItems
