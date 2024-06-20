// build interest inventory and profile builder here?
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getInterests, createInterestInventory, getQuestions, createMatchProfile, createAnswer, baseUrl } from "../api"
import { Context } from "../Context"




const InitialDisplay = ({ setDisplay }) => {
    return (
        <>
             <h1>Welcome to the User Demo!</h1>
                <h3> 
                    We are so excited that you're here and ready to make new friends!
                    Let's get started by filling out the interest inventory and building your profile.
                    And don't worry, you'll always be able to update these later!
                </h3>
                <button
                className="me-2"
                title="AddInterestDisplay:" onClick={(() => setDisplay('AddInterestDisplay:'))}
                > Next: 
                </button>
        </>
    )
}

const AddInterestDisplay = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [selectedInterests, setSelectedInterests] = useState([])
    const [interestList, setInterestList] = useState([])
    //setting the max number of selections they can select 
    const maxSelections = 15

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await getInterests({ context })
                setInterestList(response.data)
            } catch (error) {
                console.error('Failed to fetch interests:', error)
            }
        }
        fetchInterests()
    }, [context])

    console.log('INTEREST LIST: ', interestList)

   
    const handleCheckboxChange = (interest) => {
        setSelectedInterests((prevSelected) => {
            if (prevSelected.includes(interest)) {
                return prevSelected.filter((i) => i !== interest)
            } else if (prevSelected.length < maxSelections) {
                return [...prevSelected, interest]
            } else {
                return prevSelected
            }
        })
    }

    const handleSubmit = async () => {
        try {
            await Promise.all(selectedInterests.map(interest =>
                createInterestInventory({ context, interest: interest.interests }),
                setDisplay('CreateMatchProfile:')
            ))
        } catch (error) {
            console.error('Failed to submit interests:', error)
        }
    }

    return (
        <div>
            <div>Select Your Interests: {selectedInterests.length} / {maxSelections}</div>
            {interestList.length > 0 ? (
                <form>
                    {interestList.map((interest) => (
                        <div key={interest.id}>
                            <input
                                type="checkbox"
                                id={`interest-${interest.id}`}
                                value={interest.interests}
                                onChange={() => handleCheckboxChange(interest)}
                                checked={selectedInterests.includes(interest)}
                                disabled={!selectedInterests.includes(interest) && selectedInterests.length >= maxSelections}
                            />
                            <label htmlFor={`interest-${interest.id}`}>{interest.interests}</label>
                        </div>
                    ))}
                    <button type="button" onClick={handleSubmit} disabled={selectedInterests.length === 0}>
                        Choose Interests
                    </button>
                </form>
            ) : (
                <div>No interests found</div>
            )}
        </div>
    )
}

const CreateMatchProfile = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [displayName, setDisplayName] = useState('')
    const [bio, setBio] = useState('')
    const [city, setCity] = useState('')
    const [stateLocation, setStateLocation] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    // const navigate = useNavigate()

    //maybe I need to set it like {AL: AL}, do like a code/key and a name and take the code
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
            setDisplay('AddAnswerDisplay:')
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
                    </div>
                    <div style={{ marginTop: 20 }}>
                    <button onClick={() => submit()}>Create Your Match Profile</button>
                    </div>
            </div>
    )
}

const AddAnswerDisplay = ({ setDisplay }) => {
    //I'm going to submit stuff in a form, so got rid of the data keys state
    const { context } = useContext(Context)
    const [questionList, setQuestionList] = useState([])
    const [forms, setForms] = useState([])
    const [formCount, setFormCount] = useState(0)


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
            setDisplay('AllDoneDisplay:')
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
                    <button onClick={addForm}>Add Question/Answer</button>
                    {/* I'm going to add a container and row and column just to try and fix some formatting stuff*/}
                    {forms.map((form, index) => (
                        <div key={index}>
                            <form onSubmit={handleSubmit}>
                                <div xs={6}>
                                    <label>Question:</label>
                                    <select
                                        name="question"
                                        style={{width: "100%"}}
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

const AllDoneDisplay = () => {
    return (
        <>
             <h1>You're all done!</h1>
             <Link to ='/ProfilePortal'>
                <button>To Your Profile</button>
            </Link>
        </>
    )
}



function Demo() {
    const [display, setDisplay] = useState('InitialDisplay:')

    return (
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
          minBreakpoint="xs"
          >
          <Container>
            <Row className="justify-content-center m-3">
              <Col xs={12} md={7} className="d-flex flex-column justify-content-between text-center MainBody">
                <div className="overflow-scroll" style={{height: "75vh"}}>
                  <div>
                    {display === "InitialDisplay:" && <InitialDisplay setDisplay={setDisplay} />}
                    {display === "AddInterestDisplay:" && <AddInterestDisplay setDisplay={setDisplay} />}
                    {display === "CreateMatchProfile:" && <CreateMatchProfile setDisplay={setDisplay} />}
                    {display === "AddAnswerDisplay:" && <AddAnswerDisplay setDisplay={setDisplay} />}
                    {display === "AllDoneDisplay:" && <AllDoneDisplay setDisplay={setDisplay} />}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </ThemeProvider>
    )
  }

  export default Demo