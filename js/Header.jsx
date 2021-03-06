import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { auth } from './firebase'

const MyHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: solid 1px red;
`

const Image = styled.img`
  max-width: 100%;
  width: 200px;
`

const Header = ({ photoURL, displayName }) => (
  <MyHeader>
    <Image src={photoURL} alt={`${displayName}`} />
    <h1>{displayName}</h1>
    <button onClick={() => auth.signOut()}>Sign Out </button>
    <button>
      <Link to="/add">Add</Link>
    </button>
    <button>
      <Link to="/delete">Delete</Link>
    </button>
    <button>
      <Link to="/">Search</Link>
    </button>
  </MyHeader>
)

Header.defaultProps = {
  photoURL: '',
  displayName: '',
}

Header.propTypes = {
  photoURL: PropTypes.string,
  displayName: PropTypes.string,
}

export default Header
