import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { db } from './firebase'
import Header from './Header'
import WikiCard from './WikiCard'

class DashBoard extends Component {
  state = {
    searchTerm: '',
    foundItems: [],
  }

  componentDidMount() {
    this.dataRef = db.ref('/wikiEntries')
  }

  dataRef = null

  handleSearch = evt => {
    evt.preventDefault()

    const foundItems = []

    this.dataRef
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          if (
            `${childSnapshot.val().title} ${childSnapshot.val().text}`
              .toUpperCase()
              .indexOf(this.state.searchTerm.toUpperCase()) >= 0
          ) {
            console.log('found an item')
            foundItems.push(childSnapshot)
          }
        })
      })
      .then(() => {
        this.setState({
          foundItems,
        })
      })
  }

  handleSearchTermChange = evt => {
    this.setState({
      searchTerm: evt.target.value,
    })
  }

  render() {
    return (
      <div>
        <Header photoURL={this.props.user.photoURL} displayName={this.props.user.displayName} />
        <h1>DashBoard</h1>
        <form onSubmit={this.handleSearch}>
          <input
            type="text"
            placeholder="Search the wiki!"
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.foundItems.map(element => <WikiCard key={element.key} show={element} />)}
      </div>
    )
  }
}

DashBoard.propTypes = {
  user: PropTypes.shape().isRequired,
}

export default DashBoard
