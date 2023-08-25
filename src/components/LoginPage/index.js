import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    fetchTrue: false,
    errorMsg: 'please enter correct details',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 365,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, fetchTrue: true})
    console.log(errorMsg)
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  userNameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label htmlFor="username" className="username-label">
          USERNAME
        </label>
        <br />
        <input
          placeholder="username"
          type="text"
          id="username"
          className="user-name"
          onChange={this.userNameInput}
          value={username}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="username-container">
        <label htmlFor="password" className="username-label">
          PASSWORD
        </label>
        <br />
        <input
          placeholder="password"
          type="password"
          id="password"
          className="user-name"
          onChange={this.passwordInput}
          value={password}
        />
      </div>
    )
  }

  render() {
    const {fetchTrue, errorMsg} = this.state

    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dtkhaudj1/image/upload/v1691314767/Group_7399app_logo_crc0fm.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="form-container">
          <form className="login-form" onSubmit={this.onSubmit}>
            <h1 className="login-heading">Login</h1>
            {this.renderUsername()}
            {this.renderPassword()}
            {fetchTrue && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
