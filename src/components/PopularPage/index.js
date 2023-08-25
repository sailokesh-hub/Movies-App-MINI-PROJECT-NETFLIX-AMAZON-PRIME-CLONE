import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularPage extends Component {
  state = {popularMovies: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  updatePopularMovie = popularMovies => {
    const updateDetails = popularMovies.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      posterPath: eachItem.poster_path,
      backdropPath: eachItem.backdrop_path,
    }))
    this.setState({
      popularMovies: updateDetails,
      apiStatus: apiStatusConstants.success,
    })
    console.log(updateDetails)
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const popularMovies = await response.json()
      this.updatePopularMovie(popularMovies.results)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {popularMovies} = this.state
    return (
      <>
        <ul className="movie-cards-bg">
          {popularMovies.map(eachItem => (
            <Link to={eachItem.id}>
              <li>
                <img
                  className="poster"
                  alt={eachItem.title}
                  src={eachItem.backdropPath}
                />
              </li>
            </Link>
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderLoading = () => (
    <div className="loader-container load" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dlsoah4xc/image/upload/v1692884466/Background-Completepoplar_failure_oe2tmg.png"
        alt="failure"
        className="failure-img"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button
        className="try-again-btn"
        type="button"
        onClick={() => this.getPopularMovies()}
      >
        Try Button
      </button>
    </div>
  )

  renderMovieCards = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-bg-container">
        <div className="popular-page-container">
          <Header bgColor="header-container" />
        </div>
        <div className="popular-movie-cards-container">
          {this.renderMovieCards()}
        </div>
      </div>
    )
  }
}

export default PopularPage
