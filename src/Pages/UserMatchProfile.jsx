// this page is a display of the current logged in user's profile where they'll be able to view and update it

import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getUser, getMatchProfile, getAnswers, baseUrl, updateMatchProfileDisplay, updateProfileAnswer, getQuestions, createAnswer } from "../api"
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

    return (
        <div>
            {/* displaying name, bio, and location from the user match profile */}
            <br />
            <h1>{name}!</h1>
            <h4>{bio}</h4>
            <h5>{city}, {userState}</h5>
            <br />
            <Image src={`${baseUrl}${profilePhoto}`} className="profPic mx-auto" roundedCircle />
            <br />
            <div>
                {/* check and see if the answer has an image, if it has an image then it will render the image and not 'answer' */}
                {answerList && answerList.map((answerItem, index) => (
                    <div key={index} className="py-3">
                        <h5>Question: {answerItem.question.question}</h5>
                        {answerItem.image_answer ? (
                            <Image src={`${baseUrl}${answerItem.image_answer}`} className='profPic mvw-50 mx-auto py-2' alt="Answer Image" />
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
            <br />
            <button
                className="me-2"
                title="CreateNewMatchAnswersDisplay" onClick={(() => setDisplay('CreateNewMatchAnswersDisplay'))}
            > Create New Answers!
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
                    State: <br />
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
    const { context } = useContext(Context)
    const [answerList, setAnswerList] = useState()
    const [questionList, setQuestionList] = useState([])
    const [updatedAnswers, setUpdatedAnswers] = useState([])

    //fetch match profile questions when the page loads, going to put them in a drop down
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions({ context })
                setQuestionList(response.data)
            } catch (error) {
                console.error('Failed to fetch questions:', error)
            }
        }
        fetchQuestions()
    }, [context])


    console.log('QUESTION LIST: ', questionList)

    useEffect(() => {
        const grabAnswers = async () => {
            try {
                const response = await getAnswers({ context })
                setAnswerList(response.data)
                // start off with updated answers with fetched answers
                setUpdatedAnswers(response.data)
            } catch (error) {
                console.error('Failed to fetch answers:', error)
            }
        };
        grabAnswers()
    }, [context])

    // Handle input changes in the form
    const handleInputChange = (index, event) => {
        const { name, value, files } = event.target
        const newUpdatedAnswers = [...updatedAnswers]
        if (name === 'image_answer') {
            newUpdatedAnswers[index][name] = files[0]
        } else {
            newUpdatedAnswers[index][name] = value
        }
        setUpdatedAnswers(newUpdatedAnswers)
    }

    // handle the update
    const handleUpdate = async (index) => {
        const answer = updatedAnswers[index]
        try {
            const formData = new FormData()
            formData.append('question', answer.question.question)
            formData.append('answer', answer.answer)
            if (answer.image_answer instanceof File) {
                formData.append('image_answer', answer.image_answer)
            }

            await updateProfileAnswer({ context, formData, id: answer.id })
            setDisplay('InitialDisplay'); // Switch back to view mode
        } catch (error) {
            console.error('Failed to update MatchProfile:', error)
        }
    }

    return (
        <div>
            <h1>Edit Your Match Answers</h1>
            {updatedAnswers.map((answer, index) => (
                <div key={index}>
                    <form onSubmit={() => handleUpdate(index)}>
                        <div>
                            <label>Question:</label>
                            <select
                                name="question"
                                value={answer.question.question}
                                onChange={(e) => handleInputChange(index, e)}
                            >
                                <option value="">Select a question</option>
                                {questionList.map((q) => (
                                    <option key={q.id} value={q.question}>{q.question}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Answer:</label>
                            <input
                                type="text"
                                name="answer"
                                value={answer.answer}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        </div>
                        <div>
                            <label>Image:</label>
                            <input
                                type="file"
                                name="image_answer"
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        </div>
                        <button type="button" onClick={() => handleUpdate(index)}>Update</button>
                    </form>
                </div>
            ))}
            <button onClick={() => setDisplay('InitialDisplay')}>Cancel</button>
        </div>
    )
}

const CreateNewMatchAnswersDisplay = ({ setDisplay }) => {
    //I'm going to submit stuff in a form, so got rid of the data keys state
    const { context } = useContext(Context)
    const [questionList, setQuestionList] = useState([])
    const [forms, setForms] = useState([])
    const [formCount, setFormCount] = useState(0)
    const [answerList, setAnswerList] = useState([])


    //fetch match profile questions when the page loads, going to put them in a drop down
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions({ context })
                setQuestionList(response.data)
            } catch (error) {
                console.error('Failed to fetch questions:', error)
            }
        }
        fetchQuestions()
    }, [context])


    console.log('QUESTION LIST: ', questionList)

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
    console.log('ANSWER LIST LENGTH: ', answerList.length)

    // Calculate remaining forms count
    const remainingForms = Math.max(0, 5 - answerList.length)

    // limit to 5 answers 
    const addForm = () => {
        if (formCount < 5) {
            // assign data keys here, image is set to null as a default 
            setForms([...forms, { question: '', answer: '', image: null }])
            setFormCount(formCount + 1)
        } else {
            // let them know they've reached their limit
            alert('You can only add up to 5 answers!')
        }
    }

    // Remove a form by it's index so that if you want to change it you can 
    const removeForm = (index) => {
        const newForms = forms.filter((_, i) => i !== index)
        setForms(newForms)
        setFormCount(formCount - 1)
    }

    // have to handle the drop down input changing so that I can set it as a value and it doesn't log it as blank 
    const handleInputChange = (index, event) => {
        const { name, value, files } = event.target
        const newForms = [...forms]
        if (name === 'image') {
            newForms[index][name] = files[0]
        } else {
            newForms[index][name] = value
        }
        setForms(newForms)
    }

    // this is the actual submit to create the answers 
    const handleSubmit = async (e) => {
        //have to put this in to stop the normal form defaults
        e.preventDefault()
        const promises = forms.map(async (form) => {
            const formData = new FormData()
            formData.append('question', form.question)
            formData.append('answer', form.answer)
            if (form.image) {
                formData.append('image_answer', form.image)
            }

            // Log the form data, this is what is being sent, set it up to show data key and what is being sent
            for (let [key, value] of formData.entries()) {
                console.log(key, ':', value)
            }

            return createAnswer({ context, formData })
        })
        try {
            await Promise.all(promises);
            console.log('All forms submitted successfully')
            setDisplay('InitialDisplay')
        } catch (error) {
            console.error('Failed to submit forms:', error)
        }
    }
    // I had to add some formatting in this return because it was just nuts 
    return (
        <Container>
            <Row className="justify-content-center m-3">
                <Col xs={8} md={10} className="text-center justify-content-center">
                    <div>
                        <h3>Build Out Your Profile By Answering a Few Questions!</h3>
                        <h5>Add up to 5 answers!</h5>
                        <p>Remaining answers to add: {remainingForms}</p>
                        <button onClick={addForm}>Add Question/Answer</button>
                        {/* I'm going to add a container and row and column just to try and fix some formatting stuff*/}
                        {forms.map((form, index) => (
                            <div key={index}>
                                <form onSubmit={handleSubmit}>
                                    <div xs={6}>
                                        <label>Question:</label>
                                        <select
                                            name="question"
                                            style={{ width: "100%" }}
                                            value={form.question}
                                            onChange={(e) => handleInputChange(index, e)}
                                        >
                                            {/* no value here because it's just the display */}
                                            <option value="">Select a question</option>
                                            {/* map over the list of questions we got earlier */}
                                            {questionList.map(q => (
                                                <option key={q.id} value={q.question}>{q.question}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Okay I'm going to try and set something here so that if there is a question with image, it will not show this. But I'm going to have to do 
                                 it by kind of reversing the logic. I'll say if the question does not include the picture render this */}
                                    {!form.question.includes('picture') && (
                                        <div>
                                            <label>Answer:</label>
                                            <input
                                                type="text"
                                                name="answer"
                                                value={form.answer}
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                    )}
                                    {/* this is something that sets the display to show a file input if the question has an image, this was hard!! */}
                                    {form.question.includes('picture') && (
                                        <div>
                                            <label>Image:</label>
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={(e) => handleInputChange(index, e)}
                                            />
                                        </div>
                                    )}
                                    {/* this button will remove the question if they change their mind */}
                                    <button type="button" onClick={() => removeForm(index)}>Remove</button>
                                </form>
                            </div>
                        ))}
                        <button type="submit" onClick={handleSubmit}>Submit Your Answers</button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

function UserMatchProfile() {
    const { context } = useContext(Context)
    const [display, setDisplay] = useState('InitialDisplay')


    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
            minBreakpoint="xs"
        >
            <Container className="mt-5">
                <Row className="justify-content-center m-3">
                    {/* <Col xs={12} md={8} className="d-flex flex-column justify-content-between text-center MainBody"> */}
                    <Col xs={12} md={10} className="d-flex justify-content-between text-center MainBody overflow-scroll mx-auto" style={{ height: "75vh" }}>
                        <div className="overflow-scroll mb-3" style={{ height: "75vh" }}>
                            {display === "InitialDisplay" && <InitialDisplay setDisplay={setDisplay} />}
                            {display === "UpdateMatchProfileDisplay" && <UpdateMatchProfileDisplay setDisplay={setDisplay} />}
                            {display === "UpdateMatchAnswersDisplay" && <UpdateMatchAnswersDisplay setDisplay={setDisplay} />}
                            {display === "CreateNewMatchAnswersDisplay" && <CreateNewMatchAnswersDisplay setDisplay={setDisplay} />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    )
}

export default UserMatchProfile

