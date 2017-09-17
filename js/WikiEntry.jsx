import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

import Header from './Header'
import { db } from './firebase'

class WikiEntry extends Component {
  state = {
    validEntry: true,
    entry: {
      author: '',
      title: '',
      text: '',
    },
  }

  componentDidMount() {
    db
      .ref(`wikiEntries/${this.props.match.params.id}`)
      .once('value')
      .then(snapshot => {
        const entryData = snapshot.val()

        if (!entryData) {
          return this.setState({
            validEntry: false,
          })
        }

        return this.setState({
          entry: snapshot.val(),
        })
      })
  }

  render() {
    const { user } = this.props
    const { author, title, text } = this.state.entry
    return (
      <div>
        <Header photoURL={user.photoURL} displayName={user.displayName} />
        <h1>View {title}</h1>
        <h2>Author {author}</h2>
        {renderHTML(text)}
      </div>
    )
  }
}

WikiEntry.propTypes = {
  user: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
}

export default WikiEntry
