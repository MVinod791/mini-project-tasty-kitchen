import './index.css'

const RestaurantItems = props => {
  const {restaurantItemData} = props
  const {
    name,
    cuisine,
    imageUrl,
    rating,
    ratingColor,
    totalReviews,
  } = restaurantItemData
  return (
    <li className="restaurant-item-list">
      <img src={imageUrl} alt="restaurant" className="item-image" />
      <div className="item-details-container">
        <h1 className="item-name">{name}</h1>
        <p className="item-type">{cuisine}</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <p className="total-reviews">({totalReviews} reviews)</p>
        </div>
      </div>
    </li>
  )
}
export default RestaurantItems
