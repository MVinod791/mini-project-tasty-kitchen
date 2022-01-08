import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import ReactSlider from '../ReactSlider'
import RestaurantHeader from '../RestaurantHeader'
import RestaurantCard from '../RestaurantCard'

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
    activeOptionId: sortByOptions[1].value,
    apiStatus: apiStatusConstants.initial,
    currentPage: 0,
    maxPage: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {currentPage, activeOptionId, searchInput} = this.state
    const offsetValue = currentPage * 9
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offsetValue}&limit=9&sort_by_rating=${activeOptionId}&search=${searchInput.toLowerCase()}`

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

  changeSortBy = option => {
    this.setState({activeOptionId: option}, this.getRestaurantData)
  }

  onChangeSearchInput = event => {
    const {value} = event.target
    this.setState({searchInput: value})
  }

  onClickSearchResult = () => {
    this.getRestaurantData()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          className="search-input"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.onClickSearchResult}
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  renderRestaurantsView = () => {
    const {restaurantsList} = this.state
    return (
      <>
        <ul className="restaurants-list">
          {restaurantsList.map(restaurant => (
            <RestaurantCard
              restaurantItemData={restaurant}
              key={restaurant.id}
            />
          ))}
        </ul>
      </>
    )
  }

  onClickHome = () => {
    this.getRestaurantData()
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

      <button
        type="button"
        className="failure-home-button"
        onClick={this.onClickHome}
      >
        Home
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div
      className="restaurant-loader-container"
      testid="restaurants-list-loader"
    >
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
    const {maxPage, currentPage, activeOptionId} = this.state
    return (
      <div className="all-restaurant-section-container">
        <div className="home-container">
          <ReactSlider />
          <div className="all-restaurant-responsive-container">
            <RestaurantHeader
              sortByOptions={sortByOptions}
              activeOptionId={activeOptionId}
              changeSortBy={this.changeSortBy}
            />
            <hr className="horizontal-line" />
            {this.renderSearchInput()}
            {this.renderRestaurantsList()}
            <div className="navigation-container">
              <button
                type="button"
                className="navigate-buttons"
                testid="pagination-left-button"
                onClick={this.onClickLeftArrow}
              >
                <AiOutlineLeftSquare size={32} className="pagination" />
              </button>
              <p>
                <span testid="active-page-number">{currentPage + 1}</span>
                of
                <span>{maxPage}</span>
              </p>
              <button
                type="button"
                className="navigate-buttons"
                testid="pagination-right-button"
                onClick={this.onClickRightArrow}
              >
                <AiOutlineRightSquare size={32} className="pagination" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AllRestaurantsSection
