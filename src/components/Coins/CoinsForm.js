import React from 'react'
import Button from 'react-bootstrap/Button'
import './CoinAll.scss'

const CoinsForm = ({ coin, handleSubmit, handleChange }) => (
  <form className="createForm" onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      required
      placeholder='Enter name of coin'
      // this name should line up with the state we want to change
      name='name'
      defaultValue={coin.name}
      onChange={handleChange}
    />
    <label>Ticker</label>
    <input
      required
      placeholder='Enter coin ticker'
      // this name should line up with the state we want to change
      name='ticker'
      defaultValue={coin.ticker}
      onChange={handleChange}
    />
    <label>Blockchain</label>
    <input
      required
      placeholder='Enter blockchain for the coin'
      // this name should line up with the state we want to change
      name='blockchain'
      defaultValue={coin.blockchain}
      onChange={handleChange}
    />
    <div className='submitOpen'>
      <Button
        variant="primary"
        type='submit'
      >
        Submit
      </Button>
    </div>
  </form>
)

export default CoinsForm
