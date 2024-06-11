import './NavBarStyle.css'
import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import { useState, useContext } from 'react'
import Logo from './assets/GalPalLogo.svg'
import { Context } from './Context'



//I think I want to put the log out button on a page in settings?
function MyNavBar() {
  const { auth } = useContext(Context)
  
  // this will both clear the local storage and also take away the access token!
  const logOut = () => {
    localStorage.clear("token")
    auth.setAccessToken('')
    localStorage.clear("user")
    auth.setUser('')
    console.log('LOGGED OUT: SUCCESS')
  }

  return (
      <>
    <Navbar className="">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" to='/'>
          <div className="rounded-circle">
          <img
              alt=""
              src={Logo}
              width="60"
              height="60"
              className="d-inline-block m-auto"
            />
            </div>
          </Link>
        </Navbar.Brand>

        <Navbar.Text className="nav-link me-2 justify-content-end">
        <Link className="nav-link" to='/ProfilePortal'>Matches</Link> 
        </Navbar.Text>

        <Navbar.Text className="nav-link me-2 justify-content-end">
        <Link className="nav-link" to='/'>Settings</Link> 
        </Navbar.Text>

        <Navbar.Text className="nav-out me-2">
          <button className="navbutton" onClick={() => logOut()}>Log Out</button>
        </Navbar.Text>
      </Container>
    </Navbar>
  </>
  )
}

export default MyNavBar