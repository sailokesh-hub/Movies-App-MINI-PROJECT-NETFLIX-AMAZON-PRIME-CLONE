import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="icons-container">
          <FaGoogle color="#ffffff" cursor="pointer" />
          <FaTwitter color="#ffffff" cursor="pointer" />
          <FaInstagram color="#ffffff" cursor="pointer" />
          <FaYoutube color="#ffffff" cursor="pointer" />
        </div>
        <p>Contact us</p>
      </div>
    )
  }
}

export default Footer
