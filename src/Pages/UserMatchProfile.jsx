// this page is a display of the current logged in user's profile where they'll be able to view and update it

import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getUser, getMatchProfile, getAnswers, baseUrl, updateMatchProfileDisplay, updateProfileAnswer } from "../api"
import { Context } from "../Context"
import Image from 'react-bootstrap/Image'



const InitialDisplay = ({ setDisplay }) => {
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
                <button
                className="me-2"
                title="UpdateMatchProfileDisplay" onClick={(() => setDisplay('UpdateMatchProfileDisplay'))}
                > Update Your Profile!  
                </button>
                <button
                className="me-2"
                title="UpdateMatchAnswersDisplay" onClick={(() => setDisplay('UpdateMatchAnswersDisplay'))}
                > Update Your Answers!  
                </button>
        </div>
    )
}

const UpdateMatchProfileDisplay = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [userProfile, setUserProfile] = useState()
    const [displayName, setDisplayName] = useState('')
    const [profilePhoto, setProfilePhoto] = useState()
    const [bio, setBio] = useState('')
    const [city, setCity] = useState('')
    const [stateLocation, setStateLocation] = useState('')

    const states = [{ code: 'AL', name: 'Alabama' },
        { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' },
        { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' },
        { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' },
        { code: 'DE', name: 'Delaware' },
        { code: 'DC', name: 'District of Columbia' },
        { code: 'FL', name: 'Florida' },
        { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' },
        { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' },
        { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' },
        { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' },
        { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' },
        { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' },
        { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' },
        { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' },
        { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' },
        { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' },
        { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' },
        { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' },
        { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' },
        { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' },
        { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' },
        { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' },
        { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' },
        { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' },
        { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' },
        { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' },
        { code: 'WY', name: 'Wyoming' }
    ]
    //going to pre-populate their current info 
    useEffect(() => {
        const grabProfile = async () => {
            try {
                const response = await getMatchProfile({ context })
                setUserProfile(response.data)
                setDisplayName(response.data.display_name)
                setProfilePhoto(response.data.profile_photo)
                setBio(response.data.bio)
                setCity(response.data.city)
                setStateLocation(response.data.state)
            } catch (error) {
                console.error('Failed to fetch user:', error)
            }
        }
        grabProfile()
    }, [context])

    //handle the update 
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('display_name', displayName);
            formData.append('bio', bio);
            formData.append('city', city);
            formData.append('state', stateLocation);
            if (profilePhoto instanceof File) {
                formData.append('profile_photo', profilePhoto)
            }

            await updateMatchProfileDisplay({ context, formData });
            setDisplay('InitialDisplay'); // Switch back to view mode
        } catch (error) {
            console.error('Failed to update MatchProfile:', error);
        }
    }

    return (
        <div>
            <h1>Edit Your Match Profile</h1>
            <div>
                <div>Display Name:</div>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
            <div>
                <div>Bio:</div>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <div>
                <div>City:</div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                        <label>
                            State: <br/>
                            <select
                                value={stateLocation}
                                onChange={(e) => setStateLocation(e.target.value)}
                            >
                                {states.map((state) => (
                                    <option key={state.code} value={state.code}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
            <div>
                <div>Profile Photo:</div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
            </div>
            <div>
                <button onClick={handleUpdate}>Update Changes</button>
                <button onClick={() => setDisplay('InitialDisplay')}>Cancel</button>
            </div>
        </div>
    )
}

const UpdateMatchAnswersDisplay = ({ setDisplay }) => {

}

function UserMatchProfile(){
    const { context } = useContext(Context);
    const [display, setDisplay] = useState('InitialDisplay')


    return(
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
          minBreakpoint="xs"
        >
          <Container className="mt-5">
            <Row className="justify-content-center m-3">
                <Col xs={12} md={8} className="d-flex flex-column justify-content-between text-center MainBody">
                    <div className="overflow-scroll mb-3" style={{height: "75vh"}}>
                        {display === "InitialDisplay" && <InitialDisplay setDisplay={setDisplay} />}
                        {display === "UpdateMatchProfileDisplay" && <UpdateMatchProfileDisplay setDisplay={setDisplay} />}
                        {display === "UpdateMatchAnswersDisplay" && <UpdateMatchAnswersDisplay setDisplay={setDisplay} />}
                    </div>
                </Col>
            </Row>
          </Container>
        </ThemeProvider>
    )
}

export default UserMatchProfile

