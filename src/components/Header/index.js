import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import './index.css'

class Header extends Component {
  state = {userInput: ''}

  SearchButton = () => {
    const {userInput} = this.state
    return (
      <div className="search-bar">
        <input type="search" value={userInput} className="user-search" />
        <button type="button">
          <BsSearch color="#ffffff" fontWeight={500} />
        </button>
      </div>
    )
  }

  render() {
    const {bgColor, search} = this.props
    console.log(search)
    return (
      <div className={bgColor}>
        <div className="logo-links-container">
          <Link to="/" className="link">
            <img
              src="https://res.cloudinary.com/dtkhaudj1/image/upload/v1691314767/Group_7399app_logo_crc0fm.png"
              alt="website logo"
              className="app-logo"
            />
          </Link>
          <ul className="link-tabs">
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/popular" className="link">
                Popular
              </Link>
            </li>
          </ul>
        </div>
        <div className="search-profile-container">
          <Link to="/search">
            <button type="button" testid="searchButton" className="search">
              <BsSearch color="#ffffff" fontWeight={500} />
            </button>
          </Link>
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dlsoah4xc/image/upload/v1691934002/Avataravatar_rkvinp.png"
              alt="profile"
              className="avatar"
            />
          </Link>
        </div>
      </div>
    )
  }
}

export default Header
