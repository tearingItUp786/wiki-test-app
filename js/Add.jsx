import React from 'react'
import PropTypes from 'prop-types'
import MyEditor from './MyEditor'
import Header from './Header'

const Add = ({ user }) => (
  <div>
    <Header photoURL={user.photoURL} displayName={user.displayName} />
    <h1>Add</h1>
    <MyEditor />
  </div>
)

Add.propTypes = {
  user: PropTypes.shape().isRequired,
}

export default Add
