import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <div className='rightDiv mr-2'>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </div>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
    <Nav.Link href="#coins">Coins</Nav.Link>
    <Nav.Link href="#create-coin">Create-Coin</Nav.Link>
    <Nav.Link href="#advanced">Advanced</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <main className='testing'>
    <Navbar expand="md">
      {/* <Navbar.Brand href="#"> */}
      crypto-TAP <span>&nbsp;&nbsp;</span>
      {/* </Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
          { alwaysOptions }
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </main>
)

export default Header
