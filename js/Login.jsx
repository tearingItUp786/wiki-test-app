import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { auth, googleAuthProvider, isAuthenticated } from './firebase'

class Login extends Component {
  state = {
    redirectToReferrer: false,
  }

  login = () => {
    if (isAuthenticated()) {
      this.setState({ redirectToReferrer: true })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div className="SignIn">
        <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>Sign In</button>
      </div>
    )
  }
}

Login.defaultProps = {
  location: {
    pathname: '',
    state: {
      from: '',
    },
  },
}

Login.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }),
}
export default Login
