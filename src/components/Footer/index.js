import {FaPinterestP} from 'react-icons/fa'
import {AiOutlineInstagram, AiFillFacebook} from 'react-icons/ai'
import {BsTwitter} from 'react-icons/bs'
import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <div className="company-logo-name-container">
      <img
        src="https://res.cloudinary.com/dwiulfw8t/image/upload/v1640061274/Group_7420_2x_fmj65y.png"
        alt="website logo"
        className="footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="contact-description">
      The only thing we are serious about is food.Contact us on
    </p>
    <div className="contact-icons-container">
      <button type="button" className="contact-icons pinterest">
        <FaPinterestP size={32} testid="pintrest-social-icon" />
      </button>
      <AiOutlineInstagram
        size={40}
        testid="instagram-social-icon"
        className="contact-icons instagram"
      />
      <BsTwitter
        size={40}
        testid="twitter-social-icon"
        className="contact-icons twitter"
      />
      <AiFillFacebook
        size={40}
        testid="facebook-social-icon"
        className="contact-icons facebook"
      />
    </div>
  </div>
)

export default Footer
