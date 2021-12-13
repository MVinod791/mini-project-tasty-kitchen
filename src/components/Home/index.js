import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import ReactSlider from '../ReactSlider'
import AllRestaurantSection from '../AllRestaurantSection'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />

        <div className="app-container">
          <div className="home-container">
            <ReactSlider />
            <AllRestaurantSection />
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Home)
