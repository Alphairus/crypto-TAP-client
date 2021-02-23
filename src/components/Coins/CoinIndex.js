import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { coinIndex } from '../../api/coins'

class CoinIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the coins in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      coins: []
    }
  }

  // after we render the CoinIndex component for the first time
  componentDidMount () {
    const { msgAlert, user } = this.props
    // make a request to get all of our coins
    coinIndex(user)
      // set the coins state, to the coins we got back in the response's data
      .then(res => {
        this.setState({ coins: res.data.coins })
      })
      // dummy data until we create actual coinss
      // .then(res => this.setState({ coins: [{ _id: 1, name: 'jaws' }, { _id: 2, name: 'The Phantom Menace' }] }))
      .then(() => msgAlert({
        heading: 'Loaded Coins Successfully',
        message: 'All coins retrieved. Click on one to go to its page.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Coins!',
          message: 'Could not load coins with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our coins state
    const { coins } = this.state
    // if we haven't fetched any coins yet from the API
    if (coins.length === 0) {
      return (
        <div>
          <h2>My Coin Page</h2>
        </div>
      )
    }

    const coinJsx = coins.map(coin => (
      <li key={coin.id}>
        <Link to={`/coins/${coin.id}`} name={coin.name}>
          {coin.name}
        </Link>
      </li>
    ))

    return (
      <div className='coinDiv1'>
        <h3 className='createh3'>MY FIT$</h3>
        <ul>
          {coinJsx}
        </ul>
      </div>
    )
  }
}

export default CoinIndex
