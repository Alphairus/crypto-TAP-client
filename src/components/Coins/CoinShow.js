import React, { Component } from 'react'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { coinShow } from '../../api/coins'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

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
    // let coinJsx
    const { coin, deleted } = this.state

    if (deleted) {
      return <Redirect to="/coins"/>
    }
    // if we don't have a coin list yet
    if (!coin) {
      return (
        <div>
          <h2>Make a Coin!</h2>
        </div>
      )
    }

    return (
      <div className='showCoinDiv mx-auto'>
        <h3 className='coinEdit'>{coin.name}</h3>
        <h3 className='coinType'>{coin.ticker}</h3>
        <h3 className='coinType'>{coin.blockchain}</h3>
        <div className='centerBtn'>
          <Button
            onClick={this.deleteCoin}
            type="submit"
            variant="primary"
          >
          DELETE
          </Button>
          <Button
            className='updateBtn'
            type='submit'
            variant='primary'
          >
            <Link className='updateTxt' to={`/coins/${coin.id}/edit`}>UPDATE</Link>
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(CoinShow)
