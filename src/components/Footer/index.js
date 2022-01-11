import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <div className="company-logo-name-container">
      <img
        src="https://res.cloudinary.com/dwiulfw8t/image/upload/v1640061274/Group_7420_2x_fmj65y.png"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="contact-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="contact-icons-container">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="contact-icons pinterest"
      />

      <FaInstagram
        size={40}
        testid="instagram-social-icon"
        className="contact-icons instagram"
      />
      <FaTwitter
        size={40}
        testid="twitter-social-icon"
        className="contact-icons twitter"
      />
      <FaFacebookSquare
        size={40}
        testid="facebook-social-icon"
        className="contact-icons facebook"
      />
    </div>
  </div>
)

export default Footer
