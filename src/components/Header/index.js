import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import './index.css'

class Header extends Component {
  render() {
    const {bgColor} = this.props
    return (
      <div className={bgColor}>
        <div className="logo-links-container">
          <img
            src="https://res.cloudinary.com/dtkhaudj1/image/upload/v1691314767/Group_7399app_logo_crc0fm.png"
            alt="app logo"
            className="app-logo"
          />
          <ul className="link-tabs">
            <Link to="/" className="link">
              <li>Home</li>
            </Link>
            <Link to="/popular" className="link">
              <li>Popular</li>
            </Link>
          </ul>
        </div>
        <div className="search-profile-container">
          <BsSearch color="#ffffff" fontWeight={500} />
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dlsoah4xc/image/upload/v1691934002/Avataravatar_rkvinp.png"
              alt="avatar"
              className="avatar"
            />
          </Link>
        </div>
      </div>
    )
  }
}

export default Header
