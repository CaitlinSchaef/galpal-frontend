import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createUser } from "../api"
// import { useNavigate } from 'react-router-dom'


const Body = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [stateLocation, setStateLocation] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    // const navigate = useNavigate()

    const submit = () => {
        createUser({ username, password, firstName, lastName, displayName, bio, email, phone, city, stateLocation, profilePhoto })
        .then(response => {
            console.log('CREATE NEW USER: RESPONSE: ', response)
            // navigate('/Demo')
          })
          .catch(error => console.log('CREATE NEW USER ERROR: ', error))
          // navigate('/CreateUser')
        }
    
      return (
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
          minBreakpoint="xs"
        >
          <Container>
            <Row className="justify-content-center m-3">
              <Col xs={12} md={8} className="d-flex flex-column justify-content-between text-center MainBody">
                <div className="overflow-scroll" style={{height: "75vh"}}>
                  <h1>Create New User</h1>
                  <div>
                    <div>Username:</div>
                    <input 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                  </div>
                  <div>
                    <div>Email:</div>
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                  </div>
                  <div>
                    <div>Password:</div>
                    <input 
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div>
                    <div>First Name:</div>
                    <input 
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    />
                  </div>
                  <div>
                    <div>Last Name:</div>
                    <input 
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    />
                  </div>
                  <div>
                    <div>Phone Number:</div>
                    <input 
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    />
                  </div>
                  <div>
                    <div>City:</div>
                    <input 
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    />
                  </div>
                  <div>
                    <div>State:</div>
                    <input 
                    onChange={(e) => setStateLocation(e.target.value)}
                    value={stateLocation}
                    />
                  </div>
                  <div>
                    <div>Display Name:</div>
                    <input 
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    />
                  </div>
                  <div>
                    <div>Bio:</div>
                    <input 
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    />
                  </div>
                  <div> Profile Photo: 
                    <br />

                  <input 
                    type="file"
                    accept='image/*'
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <button onClick={() => submit()}>Create New User</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
    </ThemeProvider>
  )
}


function CreateUser(){
    return (
        <>
            <Body />
        </>
    )
}

export default CreateUser