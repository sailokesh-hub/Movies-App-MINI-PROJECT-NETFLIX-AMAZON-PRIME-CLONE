import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-bg">
        <h1 className="not-found-heading">Lost Your Way ?</h1>
        <p className="not-found-para">
          we are sorry the page you requested could not be found Please go back
          to the homepage.
        </p>
        <div className="logout-btn-card">
          <Link to="/">
            <button type="button" className="logout-btn-card">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default NotFound
