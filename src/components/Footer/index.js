import {Component} from 'react'
import {BsGoogle, BsTwitter, BsInstagram, BsYoutube} from 'react-icons/bs'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="icons-container">
          <BsGoogle color="#ffffff" cursor="pointer" />
          <BsTwitter color="#ffffff" cursor="pointer" />
          <BsInstagram color="#ffffff" cursor="pointer" />
          <BsYoutube color="#ffffff" cursor="pointer" />
        </div>
        <p>Contact Us</p>
      </div>
    )
  }
}

export default Footer
