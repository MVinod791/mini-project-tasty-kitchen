import './index.css'

const RestaurantHeader = props => {
  const {headerData} = props
  return (
    <div className="menu-container">
      <h1 className="heading">Popular Restaurants</h1>
      <p className="instruction-para">
        Select Your favourite restaurant special dish and make your day happy...
      </p>
      <hr className="line" />
    </div>
  )
}
export default RestaurantHeader
