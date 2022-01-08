import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantFoodItem from '../RestaurantFoodItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        id: fetchedData.id,
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        imageUrl: fetchedData.image_url,
        itemsCount: fetchedData.items_count,
        location: fetchedData.location,
        name: fetchedData.name,
        opensAt: fetchedData.opens_at,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
        foodItems: fetchedData.food_items.map(eachFood => ({
          cost: eachFood.cost,
          foodType: eachFood.food_type,
          id: eachFood.id,
          imageUrl: eachFood.image_url,
          name: eachFood.name,
          rating: eachFood.rating,
        })),
      }
      console.log(updatedData)
      this.setState({
        restaurantDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRestaurantDetailsView = () => {
    const {restaurantDetails} = this.state
    const {
      costForTwo,
      cuisine,
      imageUrl,

      location,
      name,

      rating,
      reviewsCount,
      foodItems,
    } = restaurantDetails
    return (
      <div className="specific-restaurant-details-container">
        <div className="restaurant-banner-container">
          <div className="banner-responsive-container">
            <img src={imageUrl} alt="restaurant" className="specific-image" />
            <div className="banner-details-container">
              <h1 className="restaurant-name">{name}</h1>
              <p className="cuisine-para">{cuisine}</p>
              <p className="location">{location}</p>
              <div className="rating-and-cost-container">
                <div className="reviews-rating-container">
                  <div className="rating-container">
                    <AiFillStar className="rating-star" />
                    <p className="specific-rating">{rating}</p>
                  </div>
                  <p className="specific-review-count">
                    {reviewsCount}+ rating
                  </p>
                </div>
                <hr className="vertical-line" />
                <div className="cost-container">
                  <p className="specific-restaurant-cost">
                    <BiRupee size={15} />
                    {costForTwo}
                  </p>
                  <p className="cost-for-two-text">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="food-item-list">
          {foodItems.map(eachFood => (
            <RestaurantFoodItem foodDetails={eachFood} key={eachFood.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="restaurant-failure-view">
      <img
        src="https://res.cloudinary.com/nsp/image/upload/v1635664104/tastyKitchens/error_1x_csgpog.png"
        alt="restaurants failure"
        className="restaurant-failure-img"
      />
      <h1 className="failure-not-found-heading">Page Not Found</h1>
      <p className="failure-error-description">
        We are sorry, the page you requested could not be found.Please go back
        to the homepage
      </p>
      <button type="button" className="failure-home-button">
        Home
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div
      className="restaurant-loader-container"
      testid="restaurant-details-loader"
    >
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="restaurant-details-container">
          {this.renderRestaurantDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
