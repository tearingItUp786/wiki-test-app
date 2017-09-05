import React from 'react'
import ReactQuill from 'react-quill' // ES6
import theme from 'react-quill/dist/quill.snow.css'

class MyEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  render() {
    return <ReactQuill test={theme} theme="snow" value={this.state.text} onChange={this.handleChange} />
  }
}

export default MyEditor
