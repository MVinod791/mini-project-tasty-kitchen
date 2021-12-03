import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="swiggy-banner-container">
            <h1>banner</h1>
          </div>
          <div>
            <h1>Welcome Home</h1>
          </div>
        </div>
      </>
    )
  }
}

export default Home
