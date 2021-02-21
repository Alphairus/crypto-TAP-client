import React, { Component } from 'react'
// import Spinner from 'react-bootstrap/Spinner'
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
    const { msgAlert, user } = this.props
    const { coin, deleted } = this.state

    if (deleted) {
      return <Redirect to="/coins"/>
    }
    // if we don't have a coin list yet
    if (!coin) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <div>
          <h2>There are no coins! Go make one.</h2>
        </div>
      )
    }

    return (
      <div className="showCoinDiv">
        <h3 className='coinEdit'>{coin.name}</h3>
        <h3 className='coinType'>{coin.ticker}</h3>
        <h3 className='coinType'>{coin.blockchain}</h3>
        <button onClick={this.deleteCoin} className='submitBtn'>Delete Coin</button>  <button className='submitBtn'><Link to={`/update-coin/${coin._id}`}>Update Coin</Link></button>
          {deleted ? <Redirect to="/coins"/> : coinJsx}
      </div>
    )
  }
}

export default withRouter(CoinShow)
