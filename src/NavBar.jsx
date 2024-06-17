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


{/* <FaEnvelope />  <FaGear /> <FaPuzzlePiece /> */}

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
              width="60"
              height="60"
              className="d-inline-block m-auto"
            />
            </div>
          </Link>
        </Navbar.Brand>

        <Navbar.Text className="nav-link me-2 justify-content-end">
        <Link className="nav-link" to='/Matching'>
          <a
          className="iconReact"
          >
          <FaPuzzlePiece /> 
          </a>
        </Link> 
        </Navbar.Text>

        <Navbar.Text className="nav-out me-2">
        <Link className="nav-link" to='/MessageChannel'>
          <a
          className="iconReact"
          >
          <FaEnvelope />
          </a>
        </Link> 
        </Navbar.Text>

        <Navbar.Text className="nav-link me-2 justify-content-end">
        <Link className="nav-link" to='/UserSettings'>
          <a
          className="iconReact"
          >
          <FaGear />
          </a>
        </Link> 
        </Navbar.Text>
      </Container>
    </Navbar>
  </>
  )
}
}

export default MyNavBar