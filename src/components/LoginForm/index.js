import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({showErrorMsg: true, errorMsg: error})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          value={username}
          type="text"
          id="username"
          className="username-input-field"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          value={password}
          type="password"
          id="password"
          className="password-input-field"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg, username} = this.state
    localStorage.setItem('username', JSON.stringify(username))
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-app-container">
        <div className="login-form-container">
          <form className="form" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dwiulfw8t/image/upload/v1636967825/Frame_274_2x_lghjt2.png"
              alt="website logo"
              className="login-website-logo-desktop-image"
            />
            <h1 className="taste-kitchen-heading">Tasty Kitchens</h1>
            <h1 className="heading">Login</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dwiulfw8t/image/upload/v1636967615/Rectangle_1456_eke7rc.png"
          alt="website login"
          className="login-image"
        />
      </div>
    )
  }
}

export default LoginForm
