import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { coinShow } from '../../api/coins'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class CoinShow extends Component {
  constructor (props) {
    super(props)

    // initially our coin state will be null, until it is fetched from the api
    this.state = {
      coin: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    console.log(user)
    console.log(match)
    // make a request for a single coin
    coinShow(match.params.id, user)
    // set the coin state to the coin we got back in the resopnse's data
      .then(res => this.setState({ coin: res.data.coin }))
      .then(() => msgAlert({
        heading: 'Showing Coins Successfully',
        message: 'The coin is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Coin Failed',
          message: 'Failed to show coin with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  deleteCoin = () => {
    const { user, match } = this.props
    console.log(user)
    console.log(match)
    axios({
      url: `${apiUrl}/coins/${match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    let coinJsx
    const { coin, deleted } = this.state

    if (deleted) {
      return <Redirect to="/coins"/>
    }
    // if we don't have a coin list yet
    if (!coin) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    return (
      <div>
        <h3>{coin.name}</h3>
        <h4>Ticker: {coin.ticker}</h4>
        <h4>Blockchain: {coin.blockchain}</h4>
        <button onClick={this.deleteCoin}>Delete Coin</button>
        <button>
          <Link to={`/update-coin/${coin._id}`}>Update coin</Link>
        </button>
        {deleted ? <Redirect to="/coins"/> : coinJsx}
      </div>
    )
  }
}

export default withRouter(CoinShow)