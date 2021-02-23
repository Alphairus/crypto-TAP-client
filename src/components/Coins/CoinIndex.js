import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { coinIndex } from '../../api/coins'
// import './CoinAll.scss'

class CoinIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the coins in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      coins: null
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
    console.log(coins)
    // if we haven't fetched any coins yet from the API
    if (!coins) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const coinJsx = coins.map(coin => (
      <Link to={`/coins/${coin._id}`} key={coin._id}>
        <li>
          {coin.name}
        </li>
      </Link>
    ))

    return (
      <div>
        <h3>Coins</h3>
        <ul>
          {coinJsx}
        </ul>
      </div>
    )
  }
}

export default CoinIndex
