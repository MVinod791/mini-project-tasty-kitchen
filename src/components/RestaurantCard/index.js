import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantCard = props => {
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
    <Link to={`/restaurant/${id}`} className="link">
      <li className="restaurant-item" testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="item-image" />
        <div className="item-details-container">
          <h1 className="item-name">{name}</h1>
          <p className="item-type">{cuisine}</p>
          <div className="rating-container">
            <AiFillStar className="star" style={{color: `${ratingColor}`}} />
            <p className="rating">{rating}</p>
            <p className="total-reviews">({totalReviews} reviews)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantCard
