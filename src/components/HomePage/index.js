import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomePage extends Component {
  state = {
    trendingMovies: [],
    originals: [],
    apiStatusTrending: apiStatusConstants.initial,
    apiStatusOriginals: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getOriginalMovies()
  }

  updateTrendingMovies = trendingMovies => {
    const updateDetails = trendingMovies.results.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      posterPath: eachItem.poster_path,
      backdropPath: eachItem.backdrop_path,
    }))
    this.setState({
      trendingMovies: updateDetails,
      apiStatusTrending: apiStatusConstants.success,
    })
  }

  getTrendingMovies = async () => {
    this.setState({apiStatusTrending: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const trendingMovies = await response.json()
      this.updateTrendingMovies(trendingMovies)
    } else {
      this.setState({apiStatusTrending: apiStatusConstants.failure})
    }
  }

  updateOriginalMovies = originalMovies => {
    const updateDetails = originalMovies.results.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      posterPath: eachItem.poster_path,
      backdropPath: eachItem.backdrop_path,
    }))
    this.setState({
      originals: updateDetails,
      apiStatusOriginals: apiStatusConstants.success,
    })
  }

  getOriginalMovies = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const originalMovies = await response.json()
      console.log(originalMovies)
      this.updateOriginalMovies(originalMovies)
    }
  }

  renderTrendingSlider = () => {
    const {trendingMovies} = this.state
    return (
      <Slider {...settings}>
        {trendingMovies.map(eachLogo => {
          const {id, backdropPath, name, posterPath} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies-app/movies/${id}`}>
                <img className="logo-image" src={backdropPath} alt={name} />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderOriginalSlider = () => {
    const {originals} = this.state
    if (!originals) {
      return null
    }
    return (
      <Slider {...settings}>
        {originals.map(eachLogo => {
          const {id, backdropPath, posterPath, name} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies-app/movies/${id}`}>
                <img className="logo-image" src={backdropPath} alt={name} />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderLoading = () => (
    <div className="loader-container load" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={30} width={30} />
    </div>
  )

  renderTrending = () => {
    const {apiStatusTrending} = this.state
    switch (apiStatusTrending) {
      case apiStatusConstants.loading:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderTrendingSlider()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-page-container">
        <div className="home-container">
          <Header bgColor="header-container" />
          <div className="bg-detail-container">
            <h1 className="title-heading">Super Man</h1>
            <p className="bg-description">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>
            <div>
              <button type="button" className="play-btn">
                PLAY
              </button>
            </div>
          </div>
        </div>
        <div className="trending-original-bg-container">
          <div className="trending-originals-videos-container">
            <h1 className="trending-heading">Trending Now</h1>
            <div className="slick-container">{this.renderTrending()}</div>
          </div>

          <div className="trending-originals-videos-container originals">
            <h1 className="trending-heading">Originals</h1>
            <div className="slick-container">{this.renderOriginalSlider()}</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomePage
