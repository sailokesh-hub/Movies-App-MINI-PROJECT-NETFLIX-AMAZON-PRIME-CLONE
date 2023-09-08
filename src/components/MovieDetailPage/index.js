import {Component} from 'react'
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

class Appointments extends Component {
  state = {movieDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getMovieDetails(id)
  }

  updateMovieDetails = movieDetails => {
    this.setState({movieDetails, apiStatus: apiStatusConstants.success})
  }

  getMovieDetails = async id => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const movieDetails = await response.json()
      this.updateMovieDetails(movieDetails)
    } else {
      this.setState({apiStatusTrending: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {movieDetails} = this.state
    console.log(movieDetails)
    return (
      <div
        style={{
          backgroundImage: movieDetails?.movie_details?.backdrop_path
            ? `url(${movieDetails.movie_details.backdrop_path})`
            : 'none',
          height: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="movie-details">
          <div className="movie-description">
            <div className="details">
              <h1 className="title-heading">
                {movieDetails.movie_details.title}
              </h1>
              <div className="movie-time-ua-year">
                <p className="runtime">
                  {Math.floor(movieDetails.movie_details.runtime / 60)}h{' '}
                  {Math.floor(movieDetails.movie_details.runtime % 60)}m
                </p>
                <div className="u-a-container">
                  <p className="u-a">U/A</p>
                </div>
                <p className="runtime">
                  {movieDetails.movie_details.release_date.slice(0, 4)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderMovieDetails = () => {
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
      <>
        <div className="movie-detail-container">
          <Header bgColor="header-container-movie-detail head" />
          {this.renderMovieDetails()}
        </div>
      </>
    )
  }
}

export default Appointments
