import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '../assets/CircleGalPal.png'
import BackgroundAnimation from '../BackgroundAnimation'



const Body = () => {

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
      minBreakpoint="xs"
    >
      <Container className="d-flex align-items-center justify-content-center" style={{ height: '90vh' }}>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Link to='/LogIn'>
              <img
                alt=""
                src={Logo}
                width="350"
                height="350"
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
    <div className="App">
      <BackgroundAnimation />
      <div className="content">
        <Body />
      </div>
    </div>
  )
}

export default App