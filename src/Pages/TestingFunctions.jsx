import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getInterests, createInterestInventory, getQuestions, createAnswer, createMatchProfile } from "../api"
import { Context } from "../Context"

//this is just a page to test stuff so i don't have to mess with the interest inventory
//I will set an array of form states, where each form has its own state for question, answer, and image

const Body = () => {
    const { context } = useContext(Context)
    const [displayName, setDisplayName] = useState('')
    const [bio, setBio] = useState('')
    const [city, setCity] = useState('')
    const [stateLocation, setStateLocation] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    // const navigate = useNavigate()

    const submit = () => {
        createMatchProfile({ context, displayName, bio, city, stateLocation, profilePhoto })
        .then(response => {
            console.log('CREATE MATCH PROFILE: RESPONSE: ', response)
            // navigate('/Demo')
            })
            .catch(error => console.log('CREATE MATCH PROFILE: ', error))
            // navigate('/CreateUser')
        }

        return (
            <div>
                <h1>Your Match Profile</h1>
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
                    <div style={{ marginTop: 20 }}>
                    <button onClick={() => submit()}>Create Match Display</button>
                    </div>
            </div>
    )
}


function Testing(){
    return (
        <Body />
    )
}

export default Testing