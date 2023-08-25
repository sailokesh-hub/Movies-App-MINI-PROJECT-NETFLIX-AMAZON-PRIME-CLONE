import {Component} from 'react'
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
  state = {trendingMovies: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingMovies()
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
      apiStatus: apiStatusConstants.success,
    })
    console.log(updateDetails)
  }

  getTrendingMovies = async () => {
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
      console.log(trendingMovies)
      this.updateTrendingMovies(trendingMovies)
    }
  }

  renderSlider = () => {
    const {trendingMovies} = this.state
    return (
      <Slider {...settings}>
        {trendingMovies.map(eachLogo => {
          const {id, backdropPath} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <img
                className="logo-image"
                src={backdropPath}
                alt="company logo"
              />
            </div>
          )
        })}
      </Slider>
    )
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
            <div className="slick-container-bg">
              <div className="slick-container">{this.renderSlider()}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomePage
