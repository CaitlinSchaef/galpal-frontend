// this is going to be the user's settings where they can potentially delete their account, change their name/email etc

import { useContext } from 'react'
import { Context } from '../Context'
import { deleteUser } from '../api'
import { useNavigate } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function UserSettings() {
    const { context } = useContext(Context)
    const navigate = useNavigate()
    
    const logOut = () => {
          localStorage.clear("token")
          context.setAccessToken('')
          localStorage.clear("user")
          context.setUser('')
          console.log('LOGGED OUT: SUCCESS')
          navigate('/')
    }

    const handleDelete = () => {
        deleteUser({ context })
        navigate('/')
      }


    return (
        <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
      minBreakpoint="xs"
    >
      <Container className="mt-1" style={{ height: "75vh" }}>
        <Row className="justify-content-center flex-column m-3">
          <Col xs={12} md={10} className=" text-center mx-auto">
          <>
            <span className="mt-5">
            <button onClick={() => logOut()}>Log Out</button>
            </span>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <span className="mt-5">
                <h5> Accounts can not be recovered after deletion! </h5>
            <button className="deleteButton" onClick={() => handleDelete()}>Delete Account!</button>
            </span>
          </>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}

export default UserSettings

