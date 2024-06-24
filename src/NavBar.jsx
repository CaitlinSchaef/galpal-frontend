import './NavBarStyle.css';
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom';
import Logo from './assets/CircleGalPal.png';
import { Link } from "react-router-dom";
import { FaEnvelope, FaGear, FaPuzzlePiece } from "react-icons/fa6";
import { IconContext } from "react-icons";


function MyNavBar() {
  const location = useLocation()
  // Remove the nav bar from showing up on these pages
  if(location.pathname === '/' ||
    location.pathname === '/CreateUser' ||
    location.pathname === '/Demo' ||
    location.pathname === '/LogIn'
  ) {
    return null; // Doesn't show the header on these pages
  } else {
    return (
      <div className="vw-100">
        <Navbar className="custom-navbar">
          <Container>
            <Navbar.Brand>
              <Link className="nav-link" to='/ProfilePortal'>
                <div className="">
                  <img
                    alt=""
                    src={Logo}
                    width="50"
                    height="50"
                    className="d-inline-block m-auto"
                  />
                </div>
              </Link>
            </Navbar.Brand>
            <div className='ml-auto d-flex align-items-center'>
              <Navbar.Text className="nav-link">
                <Link className="nav-link" to='/Matching'>
                  <IconContext.Provider value={{ className: 'react-icons' }}>
                    <FaPuzzlePiece />
                  </IconContext.Provider>
                </Link>
              </Navbar.Text>
              <Navbar.Text className="nav-link">
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
      </ div>
    )
  }
}

export default MyNavBar
