import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class ReactSlider extends Component {
  state = {
    sliderImages: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSliderImages()
  }

  getSliderImages = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updateImagesData = data.offers.map(eachImage => ({
        imageUrl: eachImage.image_url,
        id: eachImage.id,
      }))

      this.setState({
        sliderImages: updateImagesData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSliderView = () => {
    const {sliderImages} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      arrows: false,
      autoplay: true,
    }
    return (
      <div className="image-container">
        <Slider {...settings}>
          {sliderImages.map(eachImage => (
            <div key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                alt="hi"
                className="slider-images"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderAllImages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSliderView()
      default:
        return null
    }
  }

  render() {
    return <div className="slider-container">{this.renderAllImages()}</div>
  }
}

export default ReactSlider
