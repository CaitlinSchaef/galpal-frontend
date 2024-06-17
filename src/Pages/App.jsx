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
        <br/>
        <Row className="justify-content-center">
          <Col xs={6} md={3} className="justify-content-center mt-5">
                <br/>
                <br/>
                <Link to ='/LogIn'>
                <img
                  alt=""
                  src={Logo}
                  width="250"
                  height="250"
                />
                </Link>
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