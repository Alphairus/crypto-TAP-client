//  Import React (since our JSX is converted to React.createElement calls)
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// from the uuid package and import the fourth version of uuid, call it `uuid`
import { v4 as uuid } from 'uuid'

// Import components
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import CoinsCreate from './components/Coins/CoinsCreate'
// import CoinIndex from './components/Coins/CoinIndex'
// import CoinShow from './components/Coins/CoinShow'
// import UpdateCoin from './components/Coins/CoinEdit'
// import Landing from './components/Landing/Landing'

class App extends Component {
  // Add a constructor to initialize state for our App
  // Best practice: Accepts props and calls super with props, so that
  // this.props is set in the constructor
  constructor (props) {
    super(props)
    // Initially we won't have a user until they have been signed in, so the user
    // starts as null.
    // Message alert to user will also be empty
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // set user state to the passed in user
  setUser = user => this.setState({ user })

  // reset the user state back to null
  clearUser = () => this.setState({ user: null })

  // removes the msgAlert with the given id
  deleteAlert = (id) => {
    // update the msgAlert state
    this.setState((state) => {
      // set the msgAlerts state, to be all of the msgAlerts currently in state
      // but w/o any msgAlert whose id matches the id passed in a parameter
      // We filter for any message whose id is not the id we are trying to delete
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // msgAlert will show a new alert message
  // it accepts a heading for the alert, the alert's body(message), and the
  // bootstrap variant to style the alert (primary, secondary, danger)
  msgAlert = ({ heading, message, variant }) => {
    // Creates a unique id for message
    const id = uuid()

    // Update msgAlerts state
    this.setState((state) => {
      // set the msgAlerts state be a new array([])
      // with all of the msgAlerts from the current state (...state.msgAlerts)
      // and a new message alert object using the heading, message, variant, and id
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* An AuthenticatedRoute is used the same way as a normal route
            except it has a `user` prop we must pass it. The AuthenticatedRoute
            will show if the user is not null. If the user is null, it will redirect
            to the home page */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-coin' render={() => (
            <CoinsCreate msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
