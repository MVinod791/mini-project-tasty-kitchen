import {Component} from 'react'
import Cookies from 'js-cookie'
import RestaurantHeader from '../RestaurantHeader'
import RestaurantItems from '../RestaurantItems'

import './index.css'

class AllRestaurantsSection extends Component {
  state = {restaurantsList: []}

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedRestaurantData = data.restaurants.map(eachRestaurant => ({
        name: eachRestaurant.name,
        cuisine: eachRestaurant.cuisine,
        id: eachRestaurant.id,
        imageUrl: eachRestaurant.image_url,
        rating: eachRestaurant.user_rating.rating,
        ratingColor: eachRestaurant.user_rating.rating_color,
        totalReviews: eachRestaurant.user_rating.total_reviews,
      }))
      console.log(updatedRestaurantData)
      this.setState({restaurantsList: updatedRestaurantData})
    }
  }

  render() {
    const {restaurantsList} = this.state
    return (
      <div>
        <RestaurantHeader />
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
}

export default AllRestaurantsSection
