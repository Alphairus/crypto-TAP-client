import React from 'react'
// import Navbar from 'react-bootstrap/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Experience from '../Experience/Experience'
import './Landing.scss'

const Landing = ({ user }) => (
  <div className="contents">

    <Experience />
    <Sidebar />
  </div>
)

export default Landing
