import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'

const DashBoard = ({ user }) => (
  <div>
    <Header photoURL={user.photoURL} displayName={user.displayName} />
    <h1>DashBoard</h1>
  </div>
)

DashBoard.propTypes = {
  user: PropTypes.shape().isRequired,
}

export default DashBoard
