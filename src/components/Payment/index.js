import {Link} from 'react-router-dom'
import {BsCheckCircleFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const Payment = () => (
  <>
    <Header />
    <div className="payment-container">
      <div className="payment-response-container">
        <BsCheckCircleFill size={36} className="successful-icon" />
        <h1 className="payment-success-heading">Payment Successful</h1>
        <p className="payment-success-text">
          Thank you for ordering
          <br />
          Your payment is successfully completed.
        </p>
        <Link to="/" className="nav-link">
          <button type="button" className="payment-home-button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Payment
