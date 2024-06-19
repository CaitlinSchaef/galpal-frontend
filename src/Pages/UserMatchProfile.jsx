// this page is a display of the current logged in user's profile where they'll be able to view and update it

import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getUser, getMatchProfile, getAnswers, baseUrl } from "../api"
import { Context } from "../Context"
import Image from 'react-bootstrap/Image';


// <img src={`http://127.0.0.1:8000${profilePhoto}`} width="250"
//                 height="250" alt="Profile Photo" />

const Body = () => {
    const { context } = useContext(Context)
    const [userProfile, setUserProfile] = useState()
    const [name, setName] = useState()
    const [profilePhoto, setProfilePhoto] = useState()
    const [bio, setBio] = useState()
    const [city, setCity] = useState()
    const [userState, setUserState] = useState()
    const [answerList, setAnswerList] = useState()

    useEffect(() => {
        const grabProfile = async () => {
            try {
                const response = await getMatchProfile({ context })
                setUserProfile(response.data)
                setName(response.data.display_name)
                setProfilePhoto(response.data.profile_photo)
                setBio(response.data.bio)
                setCity(response.data.city)
                setUserState(response.data.state)
            } catch (error) {
                console.error('Failed to fetch user:', error)
            }
        }
        grabProfile()
    }, [context])
    
    console.log('USER Profile: ', userProfile)
    console.log('NAME: ', name)
    console.log('BIO: ', bio)

    useEffect(() => {
        const grabAnswers = async () => {
            try {
                const response = await getAnswers({ context })
                setAnswerList(response.data)
            } catch (error) {
                console.error('Failed to fetch answers:', error)
            }
        }
        grabAnswers()
    }, [context])

    console.log('ANSWER LIST: ', answerList)

    return(
        <div>
            {/* displaying name, bio, and location from the user match profile */}
            <br/>
            <h1>{name}!</h1>
            <h4>{bio}</h4>
            <h5>{city}, {userState}</h5>
            <br/>
            <Image src={`${baseUrl}${profilePhoto}`} width="271" height="280" roundedCircle/>
            <br />
            <div>
                {/* check and see if the answer has an image, if it has an image then it will render the image and not 'answer' */}
                {answerList && answerList.map((answerItem, index) => (
                    <div key={index}>
                        <h5>Question: {answerItem.question.question}</h5>
                        {answerItem.image_answer ? (
                            <Image src={`${baseUrl}${answerItem.image_answer}`} width="280" height="280" alt="Answer Image" />
                        ) : (
                            <p>Answer: {answerItem.answer}</p>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}


function UserMatchProfile(){
    return(
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
          minBreakpoint="xs"
        >
          <Container className="mt-5">
            <Row className="justify-content-center m-3">
                <Col xs={12} md={8} className="d-flex flex-column justify-content-between text-center MainBody">
                    <div className="overflow-scroll mb-3" style={{height: "75vh"}}>
                        <Body />
                    </div>
                </Col>
            </Row>
          </Container>
        </ThemeProvider>
    )
}

export default UserMatchProfile

