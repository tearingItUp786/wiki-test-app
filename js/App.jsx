import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { auth, storageKey } from './firebase'
import DashBoard from './DashBoard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: '',
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
        this.setState({
          uid: user.uid,
        })
      } else {
        window.localStorage.removeItem(storageKey)

        this.setState({
          uid: '',
        })
      }
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={DashBoard} />
        </div>
      </BrowserRouter>
    )
  }
}

App.defaultProps = {
  uid: '',
}

App.propTypes = {
  uid: PropTypes.string,
}

export default App
