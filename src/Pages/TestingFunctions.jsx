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

    //maybe I need to set it like {AL: AL}
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

    const submit = () => {
        createMatchProfile({ context, displayName, bio, city, stateLocation, profilePhoto })
        .then(response => {
            console.log('CREATE MATCH PROFILE: RESPONSE: ', response)
            })
            .catch(error => console.log('CREATE MATCH PROFILE: ', error))
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
                    {/* <div>State:</div>
                    <input 
                    onChange={(e) => setStateLocation(e.target.value)}
                    value={stateLocation}
                    />*/}
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