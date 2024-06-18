import './NavBarStyle.css'
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import { useState, useContext } from 'react'
import Logo from './assets/GalPalLogo.png'
import { Context } from './Context'
import { Link, useLocation  } from "react-router-dom"
import { FaEnvelope } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { FaPuzzlePiece } from "react-icons/fa6";
import { IconContext } from "react-icons";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



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
          <Link className="nav-link" to='/ProfilePortal'>
          <div className="rounded-circle">
          <img
              alt=""
              src={Logo}
              width="70"
              height="70"
              className="d-inline-block m-auto"
            />
            </div>
          </Link>
        </Navbar.Brand>

        <div className='justify-content-end align-items-center'>
        <Navbar.Text className="nav-link">
        <Link className="nav-link" to='/Matching'>
          <IconContext.Provider value={{ className: 'react-icons' }}>
            <FaPuzzlePiece /> 
          </IconContext.Provider>
        </Link> 
        </Navbar.Text>

        <Navbar.Text className="nav-out">
        <Link className="nav-link" to='/MessageChannel'>
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <FaEnvelope />
        </IconContext.Provider>
        </Link> 
        </Navbar.Text>
        
        <Navbar.Text className="nav-link">
        <Link className="nav-link" to='/UserSettings'>
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <FaGear />
          </IconContext.Provider>
        </Link> 
        </Navbar.Text>
        </div>
      </Container>
    </Navbar>
  </>
  )
}
}

export default MyNavBar