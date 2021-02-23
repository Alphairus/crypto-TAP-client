import React from 'react'
import './Sidebar.scss'

const Sidebar = () => (
  <div className="sidebar">
    <h1>Bitcoin</h1>
    <p> Bitcoin is an open source solution run on a peer-to-peer network, so no one owns it. Transactions are recorded on a public ledger distributed over the network. ... Peers contribute computer processor power in exchange for bitcoins. This protection of the ledger process is called mining. </p>
    <script src="https://widgets.coingecko.com/coingecko-coin-ticker-widget.js"></script>
    <coingecko-coin-ticker-widget coin-id="bitcoin" currency="usd" locale="en" width="0" background-color="#7edb5c"></coingecko-coin-ticker-widget>
  </div>
)

export default Sidebar
