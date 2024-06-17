import './NavBarStyle.css'
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import { useState, useContext } from 'react'
import Logo from './assets/GalPalLogo.png'
import { Context } from './Context'
import { Link, useLocation  } from "react-router-dom"




function MyNavBar() {
  const location = useLocation()
  // basically this is going to remove the nav bar from showing up on these pages 
  if(location.pathname === '/' ||
    location.pathname === '/CreateUser' ||
    location.pathname === '/Demo' ||
    location.pathname === '/LogIn' 
  ) {
    return null; // Doesn't show the header on these pages
  }
  else {
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

        <Navbar.Text className="nav-out me-2">
        <Link className="nav-link" to='/MessageChannel'>Messages</Link> 
        </Navbar.Text>

        <Navbar.Text className="nav-link me-2 justify-content-end">
        <Link className="nav-link" to='/UserSettings'>Settings</Link> 
        </Navbar.Text>
      </Container>
    </Navbar>
  </>
  )
}
}

export default MyNavBar