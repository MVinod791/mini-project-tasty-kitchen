import {Link, withRouter} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'

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

  return (
    <nav className="nav-header">
      <div className="nav-desktop-container">
        <div className="logo-name-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dwiulfw8t/image/upload/v1636967825/Frame_274_2x_lghjt2.png"
              alt="website logo"
              className="kitchen-icon"
            />
          </Link>
          <h1 className="taste-kitchen-heading">Tasty Kitchens</h1>
        </div>

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
          <li>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
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
