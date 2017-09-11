import React from 'react'
import ReactQuill from 'react-quill' // ES6
import PropTypes from 'prop-types'
import theme from 'react-quill/dist/quill.snow.css'

import { db } from './firebase'

class MyEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      text: '',
    } // You can also pass a Quill Delta here

    this.wikiRef = db.ref('wikiEntries')
    this.handleChange = this.handleChange.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.handleEntry = this.handleEntry.bind(this)
  }

  setTitle(evt) {
    this.setState({
      title: evt.target.value,
    })
  }

  handleChange(value) {
    this.setState({
      text: value,
    })
  }

  handleEntry() {
    console.log(this.wikiRef)
    if (this.props.wikiId === null) {
      this.wikiRef.push({
        author: this.props.authorId,
        title: this.state.title,
        text: this.state.text,
      })
    }
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="enter your title" value={this.state.title} onChange={this.setTitle} />{' '}
        <ReactQuill test={theme} theme="snow" value={this.state.text} onChange={this.handleChange} />{' '}
        <button onClick={this.handleEntry}> Submit </button>{' '}
      </div>
    )
  }
}

MyEditor.defaultProps = {
  wikiId: null,
}

MyEditor.propTypes = {
  wikiId: PropTypes.number,
  authorId: PropTypes.string.isRequired,
}

export default MyEditor
