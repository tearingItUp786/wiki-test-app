import React from 'react'
import ReactQuill, {
  Quill
} from 'react-quill' // ES6
import PropTypes from 'prop-types'
import theme from 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module'

import {
  db,
  storage
} from './firebase'

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
        [{
          header: [1, 2, false]
        }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{
          list: 'ordered'
        }, {
          list: 'bullet'
        }, {
          indent: '-1'
        }, {
          indent: '+1'
        }],
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
    this.storageRef = storage.ref('/wiki-images')

    this.handleChange = this.handleChange.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.handleEntry = this.handleEntry.bind(this)
  }

  componentDidMount() {
    const {
      wikiId
    } = this.props
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
    let wikiId = this.props.wikiId

    // if there was a wiki id provided, that means we have an entry in the db and we are updating it.
    // if we don't have a wiki id, then it's a new entry.
    if (this.props.wikiId === null) {
      wikiId = this.wikiRef.push({
        author: this.props.authorId,
        title: this.state.title,
        text: this.state.text,
      }).key
    } else {
      this.wikiRef.child(this.props.wikiId).set({
        author: this.props.authorId,
        title: this.state.title,
        text: this.state.text,
      })
    }

    // this regex will return the src attribute of image tags and because the editor stores the src as data we need to extract it

    // TODO: Figure out how to handle multiple images on file upload
    // TODO: Figure out how to display images from storage

    const regex = /<img[^>]+src="data:image([^">]+)"/g
    let userLocalImage = regex.exec(this.state.text)
    let photoCount = 0

    while (userLocalImage) {
      console.log(`match was found ${photoCount}`)
      const imageSrcRegex = /<img.*?src="(.*?)"/g;
      const src = imageSrcRegex.exec(userLocalImage);
      src[1] = src[1].replace(/^data:image\/(png|jpeg);base64,/, '')
      this.storageRef
        .child(`${wikiId}/${photoCount}.jpg`)
        .putString(src[1], 'base64', {
          contentType: 'image/jpg'
        })
        .then(() => {
          console.log('image uploaded')
        })
      userLocalImage = regex.exec(this.state.text);
      photoCount += 1;
    }
  }

  render() {
    return ( <
      div >
      <
      input type = "text"
      placeholder = "enter your title"
      value = {
        this.state.title
      }
      onChange = {
        this.setTitle
      }
      />{' '} <
      ReactQuill test = {
        theme
      }
      modules = {
        this.quillModules
      }
      formats = {
        this.quillFormats
      }
      theme = "snow"
      value = {
        this.state.text
      }
      onChange = {
        this.handleChange
      }
      /> <
      button onClick = {
        this.handleEntry
      } > Submit < /button>{' '} < /
      div >
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