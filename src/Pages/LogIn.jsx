import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getToken } from "../api"
import { Context } from '../Context'
import { useNavigate } from 'react-router-dom'

const Body = () => {
  const { context } = useContext(Context)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submit = () => {
    getToken({ context, username, password })
    navigate('/ProfilePortal')
  }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
    minBreakpoint="xs"
    >
      <Container>
        <br/>
        <br/>
        <Row className="justify-content-center m-3">
          <Col xs={8} md={3} className="d-flex flex-column justify-content-between text-center MainBody mt-5">
            <div className="overflow-scroll" style={{height: "50vh"}}>
              <h1>Login</h1>
              <div>
              <div>Username:</div>
              <input 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              </div>
              <div>
                <div>Password:</div>
                <input 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div style={{ marginTop: 20 }}>
   
                <button onClick={() => submit()}>Submit</button>

              </div>
             <br />
                <Link to ='/CreateUser'>
                <button>New User? Create Account</button>
                </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}




function LogIn() {

  return (
    <>
      <Body />
    </>
  )
}

export default LogIn