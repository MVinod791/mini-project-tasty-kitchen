import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import './index.css'

class ReactSlider extends Component {
  state = {
    sliderImages: [],
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

      this.setState({sliderImages: updateImagesData})
    }
  }

  render() {
    const {sliderImages} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      arrows: false,
    }
    return (
      <div className="container">
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
}

export default ReactSlider
