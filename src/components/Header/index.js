import {Link, withRouter} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
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

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  const getColor = current => {
    const {history} = props
    if (history.location.pathname === current) {
      // console.log(history.location.pathname)
      return '#f7931e'
    }
    return '#334155'
  }

  const renderProfile = () => {
    const details = localStorage.getItem('username')
    const name = JSON.parse(details)
    const initial = name[0].toUpperCase()
    const initialColorName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    return (
      <div className="profile-card">
        <div className={initialColorName}>
          <p className="initials">{initial}</p>
        </div>
        <h1 className="name2">{name}</h1>
      </div>
    )
  }

  return (
    <nav className="nav-header">
      <div className="nav-desktop-container">
        <Link to="/" className="nav-link">
          <div className="logo-name-container">
            <img
              src="https://res.cloudinary.com/dwiulfw8t/image/upload/v1636967825/Frame_274_2x_lghjt2.png"
              alt="website logo"
              className="kitchen-icon"
            />

            <h1 className="kitchen-heading">Tasty Kitchens</h1>
          </div>
        </Link>

        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link
              to="/"
              className="nav-link home"
              style={{color: getColor('/')}}
            >
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link
              to="/cart"
              className="nav-link cart"
              style={{color: getColor('/cart')}}
            >
              Cart
            </Link>
          </li>
          <li className="nav-menu-item">
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
          <li className="nav-menu-item">
            <Link to="/profile" className="nav-link cart">
              {renderProfile()}
            </Link>
          </li>
        </ul>
        <Popup
          trigger={
            <button type="button" className="hamburger-btn">
              <GiHamburgerMenu size={25} />
            </button>
          }
        >
          {close => (
            <div className="modal-container">
              <div className="nav-link-container">
                <Link to="/" className="nav-link">
                  <p className="nav-menu-item" style={{color: getColor('/')}}>
                    Home
                  </p>
                </Link>
                <Link to="/cart" className="nav-link">
                  <p
                    className="nav-menu-item"
                    style={{color: getColor('/cart')}}
                  >
                    Cart
                  </p>
                </Link>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
                <li className="nav-menu-item">
                  <Link to="/profile" className="nav-link cart">
                    {renderProfile()}
                  </Link>
                </li>
              </div>
              <button type="button" className="close-btn">
                <AiOutlineCloseCircle size={18} onClick={() => close()} />
              </button>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
