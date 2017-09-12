import React from 'react'
import renderHTML from 'react-render-html'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  padding: 45px;
  align-items: center;
  border: solid 1px red;
  margin: 20px 0;
`

const WikiCard = ({ show }) => (
  <Wrapper>
    <Link to="/">
      <h1>{show.val().title}</h1>
      {renderHTML(show.val().text)}
    </Link>
  </Wrapper>
)

WikiCard.propTypes = {
  show: PropTypes.shape().isRequired,
}

export default WikiCard
