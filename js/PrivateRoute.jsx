import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { isAuthenticated } from './firebase'

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component user={user} {...props} /> : <Redirect to={{ pathname: '/login' }} />}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape().isRequired,
}

export default PrivateRoute
