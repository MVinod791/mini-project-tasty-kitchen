import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  return (
    <nav className="nav-header">
      <div className="nav-desktop-container">
        <div className="logo-name-container">
          <img
            src="https://res.cloudinary.com/dwiulfw8t/image/upload/v1636967825/Frame_274_2x_lghjt2.png"
            alt="icon"
            className="kitchen-icon"
          />
          <h1 className="taste-kitchen-heading">Tasty Kitchens</h1>
        </div>
        <div className="list-container">
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link home">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link cart">
                Cart
              </Link>
            </li>
          </ul>
          <button type="button" className="logout-desktop-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
