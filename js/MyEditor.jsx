import React from 'react'
import ReactQuill, { Quill } from 'react-quill' // ES6
import PropTypes from 'prop-types'
import theme from 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module'

import { db } from './firebase'

Quill.register('modules/ImageResize', ImageResize)
class MyEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      text: '',
    }

    this.quillModules = {
      ImageResize: {},
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
    }

    this.quillFormats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
    ]

    this.wikiRef = db.ref('wikiEntries')
    this.handleChange = this.handleChange.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.handleEntry = this.handleEntry.bind(this)
  }

  componentDidMount() {
    const { wikiId } = this.props
    if (wikiId !== null) {
      db
        .ref(`wikiEntries/${wikiId}`)
        .once('value')
        .then(snapshot => {
          this.setState({
            title: snapshot.val().title,
            text: snapshot.val().text,
          })
        })
    }
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
    if (this.props.wikiId === null) {
      return this.wikiRef.push({
        author: this.props.authorId,
        title: this.state.title,
        text: this.state.text,
      })
    }

    return this.wikiRef.child(this.props.wikiId).set({
      author: this.props.authorId,
      title: this.state.title,
      text: this.state.text,
    })
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="enter your title" value={this.state.title} onChange={this.setTitle} />{' '}
        <ReactQuill
          test={theme}
          modules={this.quillModules}
          formats={this.quillFormats}
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange}
        />
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
