// imports
import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

// import axios & apiConfig
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

// class
class UpdateCoin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coin: {
        name: '',
        ticker: '',
        blockchain: ''
      },
      updated: false
    }
  }

  async componentDidMount () {
    // we're going to "try" some things (our request)
    try {
      const res = await axios(`${apiUrl}/coins/${this.props.match.params.id}`)
      this.setState({ coin: res.data.coin })
    } catch (err) {
      // if anything goes wrong in the try block, hanlde error
      console.error(err)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match } = this.props
    axios({
      method: 'patch',
      url: `${apiUrl}/coins/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { coin: this.state.coin }
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  handleInputChange = (event) => {
    event.persist()
    // merge/combine the updatedField & the current state.book
    this.setState(currState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      // spread operator (...) will turn an object/array into coma
      // separate values or key/value pairs
      // { ...{ title: '', author: '' }, ...{ title: 'a' } }
      // { title: '', author: '', title: 'a' }
      // {author: '', title: 'a' }
      const newCoin = { ...currState.coin, ...updatedField }

      // Object.assign copies key/values pairs from one or more objects to a target object
      // Empty object is the 1st arg (modified in place)
      // state is the 2nd arg
      // updatedField is the 3rd arg (comes after the state so it overrides the state values)
      // const newBook = Object.assign({}, this.state.book, updatedField)

      return { coin: newCoin }
    })
  }

  render () {
    const { coin, updated } = this.state
    if (!coin) {
      return (
        <div>
          <h2>Coin Update!</h2>
        </div>
      )
    }
    if (updated) {
      return <Redirect to={'/coins'} />
    }
    return (
      <main className='updatePage'>
        <Fragment>
          <form onSubmit={this.handleSubmit} className='coinsDiv2'>
            <h2 className='updateForm'>Update an Coin</h2>
            <input
              name="name"
              type="text"
              placeholder="NAME"
              value={this.state.coin.name}
              onChange={this.handleInputChange}
            />
            <input
              name="ticker"
              type="text"
              placeholder="TICKER"
              value={this.state.coin.ticker}
              onChange={this.handleInputChange}
            />
            <input
              name="blockchain"
              type="text"
              placeholder="Coin blockchain here"
              value={this.state.coin.blockchain}
              onChange={this.handleInputChange}
            />
            <Button
              type="submit"
              variant="primary"
            >
              Submit
            </Button>
          </form>
        </Fragment>
      </main>
    )
  }
}

// export
export default withRouter(UpdateCoin)
