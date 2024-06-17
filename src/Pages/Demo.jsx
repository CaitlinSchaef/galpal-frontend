// build interest inventory and profile builder here?

import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getInterests, createInterestInventory, getQuestions, createMatchProfile } from "../api"
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
    const maxSelections = 10

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await getInterests({ context })
                setInterestList(response.data)
            } catch (error) {
                console.error('Failed to fetch interests:', error)
            }
        }
        fetchInterests();
    }, [context]);

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
        });
    };

    const handleSubmit = async () => {
        try {
            await Promise.all(selectedInterests.map(interest =>
                createInterestInventory({ context, interest: interest.interests }),
                setDisplay('AddAnswerDisplay:')
            ))
        } catch (error) {
            console.error('Failed to submit interests:', error)
        }
    };

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



const AddAnswerDisplay = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [questionList, setQuestionList] = useState([])
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [image, setImage] = useState(null)


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
        fetchQuestions();
    }, [context]);


    console.log('QUESTION LIST: ', questionList)

    //handle submit function for the answers
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('question', question);
        formData.append('answer', answer);
        if (image) {
            formData.append('image_answer', image);
        }
    
        try {
            await createAnswer({ context, formData });
            setDisplay('CreateMatchProfile');
        } catch (error) {
            console.error('Failed to create answer:', error);
        }
    }

    return (
        <div>
        <h3>Build Out Your Profile By Answering a Few Questions!</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Question:</label>
                <select value={question} onChange={(e) => setQuestion(e.target.value)}>
                    {questionList.map(q => (
                        <option key={q.id} value={q.question}>{q.question}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Answer:</label>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

// work on this after the match answers 
// const CreateMatchProfile = ({ setDisplay }) => {
//     const [displayName, setDisplayName] = useState('')
//     const [bio, setBio] = useState('')
//     const [city, setCity] = useState('')
//     const [stateLocation, setStateLocation] = useState('')
//     const [profilePhoto, setProfilePhoto] = useState('')
//     // const navigate = useNavigate()

//     const submit = () => {
//         createMatchProfile({ displayName, bio, city, stateLocation, profilePhoto })
//         .then(response => {
//             console.log('CREATE MATCH PROFILE: RESPONSE: ', response)
//             // navigate('/Demo')
//           })
//           .catch(error => console.log('CREATE MATCH PROFILE: ', error))
//           // navigate('/CreateUser')
//         }
    
//       return (
//           <Container>
//             <Row className="justify-content-center m-3">
//               <Col xs={12} md={8} className="d-flex flex-column justify-content-between text-center MainBody">
//                 <div className="overflow-scroll" style={{height: "75vh"}}>
//                   <h1>Your Match Profile</h1>
//                   <div>
//                     <div>Display Name:</div>
//                     <input 
//                     onChange={(e) => setDisplayName(e.target.value)}
//                     value={displayName}
//                     />
//                   </div>
//                   <div>
//                     <div>Bio:</div>
//                     <input 
//                     onChange={(e) => setBio(e.target.value)}
//                     value={bio}
//                     />
//                   </div>

//                   <div> Profile Photo: 
//                     <br />

//                   <input 
//                     type="file"
//                     accept='image/*'
//                     onChange={(e) => setProfilePhoto(e.target.files[0])}
//                   />
//                   </div>
//                   <div style={{ marginTop: 20 }}>
//                     <button onClick={() => submit()}>Create Match Display</button>
//                   </div>
//                   <div>
//                     <div>City:</div>
//                     <input 
//                     onChange={(e) => setCity(e.target.value)}
//                     value={city}
//                     />
//                   </div>
//                   <div>
//                     <div>State:</div>
//                     <input 
//                     onChange={(e) => setStateLocation(e.target.value)}
//                     value={stateLocation}
//                     />
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//   )
// }


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
                    {display === "AddAnswerDisplay:" && <AddAnswerDisplay setDisplay={setDisplay} />}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </ThemeProvider>
    )
  }

  export default Demo