import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CoinsForm from './CoinsForm'
import { coinCreate } from '../../api/coins'
// import './CoinAll.scss'

class CoinsCreate extends Component {
  constructor (props) {
    super(props)

    // initially our coin states will be empty until they are filled in
    this.state = {
      coin: {
        name: '',
        ticker: '',
        blockchain: ''
      },
      // createdId will be null, until we successfully create an coin
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { coin } = this.state

    // create an coin, pass it the coin data and the user for its token
    coinCreate(coin, user)
      // set the createdId to the id of the coin we just created
      .then(res => this.setState({ createdId:
        res.data.coin._id }))
      .then(() => msgAlert({
        heading: 'Created coin Succesfully',
        message: 'coin has been created successfully. Now viewing the coin.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Coin',
          message: 'Could not create coin with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()
    this.setState(state => {
      // return our state changge
      return {
        // set the coin state, to what it used to be (...state.coin)
        // but replace the property with `name` to its current `value`
        // ex. name could be `name` or `director`
        coin: { ...state.coin, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
  // destructure our coins and createdId state
    const { coin, createdId } = this.state

    // if the coin has been created and we sits id
    if (createdId) {
      // redirect to the coins show page
      return <Redirect to='/coins/' />
    }

    return (
      <div>
        <CoinsForm
          coin={coin}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default CoinsCreate
