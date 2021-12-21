import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {restaurantDeatisl: {}}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
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
    console.log(response)
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
    }
  }

  renderRestaurantDetails = () => (
    <div>
      <h1>details</h1>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="restaurant-details-container">
          {this.renderRestaurantDetails}
        </div>
      </>
    )
  }
}

export default RestaurantDetails
