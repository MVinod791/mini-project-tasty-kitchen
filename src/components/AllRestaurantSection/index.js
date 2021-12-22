import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'
import ReactSlider from '../ReactSlider'
import RestaurantHeader from '../RestaurantHeader'
import RestaurantItems from '../RestaurantItems'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllRestaurantsSection extends Component {
  state = {
    restaurantsList: [],
    activeOptionId: sortByOptions[1].displayText,
    apiStatus: apiStatusConstants.initial,
    currentPage: 0,
    maxPage: 0,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {currentPage, activeOptionId} = this.state
    const offsetValue = currentPage * 9
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offsetValue}&limit=9&sort_by_rating=${activeOptionId}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const maxItems = data.total
      const maxPages = (maxItems % 9) + 1
      const updatedRestaurantData = data.restaurants.map(eachRestaurant => ({
        name: eachRestaurant.name,
        menuType: eachRestaurant.menu_type,
        cuisine: eachRestaurant.cuisine,
        id: eachRestaurant.id,
        imageUrl: eachRestaurant.image_url,
        rating: eachRestaurant.user_rating.rating,
        ratingColor: eachRestaurant.user_rating.rating_color,
        totalReviews: eachRestaurant.user_rating.total_reviews,
      }))

      this.setState({
        maxPage: maxPages,
        restaurantsList: updatedRestaurantData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurantData)
  }

  renderRestaurantsView = () => {
    const {restaurantsList, activeOptionId} = this.state
    return (
      <div>
        <RestaurantHeader
          sortByOptions={sortByOptions}
          activeOptionId={activeOptionId}
          changeSortby={this.changeSortby}
        />
        <hr className="horizontal-line" />
        <ul className="restaurants-list">
          {restaurantsList.map(restaurant => (
            <RestaurantItems
              restaurantItemData={restaurant}
              key={restaurant.id}
            />
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
    <div className="restaurant-loader-container">
      <Loader type="Oval" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onClickLeftArrow = () => {
    const {currentPage} = this.state
    if (currentPage > 0) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage - 1}),
        this.getRestaurantData,
      )
    }
  }

  onClickRightArrow = () => {
    const {currentPage} = this.state
    if (currentPage < 3) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage + 1}),
        this.getRestaurantData,
      )
    }
  }

  render() {
    const {maxPage, currentPage} = this.state
    return (
      <div className="app-container">
        <div className="home-container">
          <ReactSlider />
          <div className="all-restaurant-responsive-container">
            {this.renderRestaurantsList()}
            <div className="navigation-container">
              <button
                type="button"
                className="navigate-buttons"
                onClick={this.onClickLeftArrow}
              >
                <AiOutlineLeftSquare size={32} />
              </button>
              <span>
                {currentPage + 1} of {maxPage}
              </span>
              <button
                type="button"
                className="navigate-buttons"
                onClick={this.onClickRightArrow}
              >
                <AiOutlineRightSquare size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AllRestaurantsSection
