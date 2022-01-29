import {BiEdit} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const Profile = () => {
  const details = localStorage.getItem('username')
  const name = JSON.parse(details)
  const initial = name[0].toUpperCase()

  const initialColorName = `initial-container ${
    initialContainerBackgroundClassNames[
      Math.ceil(Math.random() * initialContainerBackgroundClassNames.length - 1)
    ]
  }`
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-response-container">
          <div className="profile-card">
            <div className={`initial-name ${initialColorName}`}>
              <p className="initial">{initial}</p>
            </div>
            <div className="name-locations-card">
              <h1 className="name">
                <span className="greeting">Hi,</span>
                {name}
              </h1>
              <p className="city-name">
                <MdLocationOn className="gps-location" />
                Hyderabad
              </p>
            </div>
          </div>
          <div className="edit-profile-container">
            <button type="button" className="edit-profile-btn">
              <BiEdit className="edit-icon" />
              Edit profile
            </button>
            <div className="follows">
              <div className="review-card">
                <p className="count">0 </p>
                <p className="reviews">Reviews</p>
              </div>
              <hr className="vertical-line" />
              <div className="review-card">
                <p className="count">0 </p>
                <p className="reviews">Photos</p>
              </div>
              <hr className="vertical-line" />
              <div className="review-card">
                <p className="count">0 </p>
                <p className="reviews">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-summary-container">
        <div className="profile-card-container">
          <div className="side-container">
            <div className="activity-container">
              <h1 className="main-heading">ACTIVITY</h1>
              <p className="activity">Reviews</p>
              <p className="activity">Photos</p>
              <p className="activity">Recently Viewed</p>
              <p className="activity">Bookmarks</p>
            </div>
            <div className="activity-container">
              <h1 className="main-heading">ONLINE ORDERS</h1>
              <p className="activity">My Address </p>
              <p className="activity">Favorite Orders</p>
              <p className="activity">Order history</p>
            </div>
          </div>
          <div className="cart-empty-card-container">
            <img
              src="https://res.cloudinary.com/dwiulfw8t/image/upload/v1640345787/cooking_1_ddw5n7.png"
              className="cart-empty-image2"
              alt="empty cart"
            />
            <h1 className="cart-empty-heading2">Nothing Here Yet!</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
