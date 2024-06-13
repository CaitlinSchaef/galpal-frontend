import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '../assets/GalPalLogo.png'

const Body = () => {

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
    minBreakpoint="xs"
    >
      <Container>
        <Row className="justify-content-center m-3">
          <Col xs={6} md={3} className="d-flex flex-column justify-content-between text-center">
            <div style={{height: "50vh"}}>
             <br />
                <Link to ='/LogIn'>
                <button className="FrontLogo">
                <img
                  alt=""
                  src={Logo}
                  width="250"
                  height="250"
                  className="d-inline-block m-auto"
                />
                </button>
                </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}




function App() {

  return (
    <>
      <Body />
    </>
  )
}

export default App