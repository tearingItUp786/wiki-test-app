import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { auth, storageKey } from './firebase'
import DashBoard from './DashBoard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Add from './Add'

const Delete = () => <h1>Delete</h1>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid)
        this.setState({
          user,
        })
        console.log('a user rexisted')
      } else {
        window.localStorage.removeItem(storageKey)
        this.setState({
          user: '',
        })
        console.log('user was logged out')
      }
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} handleAuthChange />
          <PrivateRoute exact user={this.state.user} path="/add" component={Add} />
          <PrivateRoute exact user={this.state.user} path="/delete" component={Delete} />
          <PrivateRoute user={this.state.user} path="/" component={DashBoard} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
