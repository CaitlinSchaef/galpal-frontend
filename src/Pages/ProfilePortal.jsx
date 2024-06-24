// this is really just a place for them to land
// then from there they can 
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getUser, getMatchProfile, baseUrl } from "../api"
import { Context } from "../Context"
import Image from 'react-bootstrap/Image';



// <img src={`http://127.0.0.1:8000${profilePhoto}`} width="250"
//                 height="250" alt="Profile Photo" />

function ProfilePortal() {
  const { context } = useContext(Context)
  const [userProfile, setUserProfile] = useState()
  const [name, setName] = useState()
  const [profilePhoto, setProfilePhoto] = useState()


  useEffect(() => {
    const grabProfile = async () => {
      try {
        const response = await getMatchProfile({ context })
        setUserProfile(response.data)
        setName(response.data.display_name)
        setProfilePhoto(response.data.profile_photo)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }
    grabProfile()
  }, [context])

  console.log('USER Profile: ', userProfile)
  console.log('NAME: ', name)

  console.log('ALSO BLAMMO: BASEURL: ', baseUrl)
  console.log('BLAMMO: PROFILE PHOTO: ', profilePhoto)

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
      minBreakpoint="xs"
    >
      <Container className="mt-1" style={{ height: "75vh" }}>
        <Row className="justify-content-center flex-column m-3">
          <Col xs={12} md={10} className="d-flex justify-content-between text-center MainBody overflow-scroll mx-auto" style={{ height: "75vh" }}>
            {/* <div className="overflow-scroll" style={{height: "75vh"}}> */}
            {/* <br/> */}
            <h1 className='mx-auto w-100'>Hello {name}!</h1>
            {/* <br/> */}
            <Image src={`${baseUrl}${profilePhoto}`} className="profPic mx-auto" roundedCircle />

            <div className='mt-3 mx-auto text-center d-flex flex-column w-100'>
              <span>

                <Link to='/UserMatchProfile'>
                  <button className="mb-2 me-1">View or Change Your Match Profile  </button>
                </Link>
              </span>
                {/* <br/> */}
              <span>

                <Link to='/UserInterestInventory'>
                  <button>View or Change Your Interest Inventory  </button>
                </Link>
              </span>
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}

export default ProfilePortal