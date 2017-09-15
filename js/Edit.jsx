import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import MyEditor from './MyEditor'
import Header from './Header'
import { db } from './firebase'

// I need to query firebase and find out if this is a relevant entry.
class Edit extends Component {
  state = {
    validEntry: true,
  }

  componentDidMount() {
    db
      .ref(`wikiEntries/${this.props.match.params.id}`)
      .once('value')
      .then(snapshot => {
        const entryData = snapshot.val()

        if (!entryData || snapshot.val().author !== this.props.user.uid) {
          console.log('There was no entry data or this was not the same user')
          return this.setState({
            validEntry: false,
          })
        }

        return true
      })
  }

  render() {
    const { validEntry } = this.state
    const { user, match } = this.props

    if (!validEntry) {
      const { from } = { from: { pathname: '/' } }
      return <Redirect to={from} />
    }

    return (
      <div>
        <Header photoURL={user.photoURL} displayName={user.displayName} />
        <h1>Edit {match.params.id}</h1>
        <MyEditor authorId={user.uid} wikiId={match.params.id} />
      </div>
    )
  }
}
Edit.propTypes = {
  user: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
}

export default Edit
