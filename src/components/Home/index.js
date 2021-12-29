import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Header from '../Header'

import AllRestaurantSection from '../AllRestaurantSection'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />

        <AllRestaurantSection />

        <Footer />
      </>
    )
  }
}

export default withRouter(Home)
