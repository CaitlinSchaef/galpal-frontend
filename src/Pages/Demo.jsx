// build interest inventory and profile builder here?

import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getInterests, createInterestInventory, getQuestions } from "../api"
import { Context } from "../Context"



const InitialDisplay = ({ setDisplay }) => {
    return (
        <>
             <h1>Welcome to the User Demo!</h1>
                <h3> 
                    We are so excited that you're here and ready to make new friends!
                    We have just a few things to go over before we finish building your profile and you get started. 
                </h3>
                <button
                className="me-2"
                title="FirstDemoPage:" onClick={(() => setDisplay('FirstDemoPage:'))}
                > Begin Demo: 
                </button>
        </>
    )
}

const FirstDemoPage = ({ setDisplay }) => {
    return (
        <>
            {/*  Do I want to put the icon? */}
            <h1> Your Profile Portal </h1>
            <h3> If you select the GalPal icon in the top left corner, it will take you to your Profile Portal. 
                This is where you will normally land whenever you log in to your account. From there you can view or update 
                your interest inventory and your match profile. Match profiles are what you will see whenever you are looking 
                at potential friends.  
            </h3>
                <button
                className="me-2"
                title="SecondDemoPage:" onClick={(() => setDisplay('SecondDemoPage:'))}
                > Next: 
                </button>
        </>
    )
}

const SecondDemoPage = ({ setDisplay }) => {
    return (
        <>
            {/*  Put the little puzzle icon here */}
            <h1> Matching </h1>
            <h3> In the top right corner there are three icons, the first of which is a little puzzle piece.
                Clicking on the puzzle piece will take you to the matching portal, where you can browse profiles and send friend requests.
                You have two options when viewing someone's profile, 'Friend' or 'Pass'. If this person has already friended you, a special message 
                channel will be created, just for you two to get to know each other! Which brings me to our next icon!
            </h3>
            <button
                className="me-2"
                title="ThirdDemoPage:" onClick={(() => setDisplay('ThirdDemoPage:'))}
                > Next: 
                </button>
        </>
    )
}

const ThirdDemoPage = ({ setDisplay }) => {
    return (
        <>
            {/*  Put the little message icon here */}
            <h1> Messaging </h1>
            <h3> The second from last icon you see looks like a little piece of mail, and this is where your messaging lives.
                When two people friend each other, they will automatically see an empty message appear in the messaging page. 
            </h3>
            <button
                className="me-2"
                title="FourthDemoPage:" onClick={(() => setDisplay('FourthDemoPage:'))}
                > Next: 
            </button>
        </>
    )
}

const FourthDemoPage = ({ setDisplay }) => {
    return (
        <>
            {/*  Put the little gear icon here */}
            <h1> Settings </h1>
            <h3> The second from last icon you see looks like a gear, and this is your user settings.
                 Here, you can edit your name, email, or permanently delete your account.
                 There is also an option here for you to email us any suggestions, from adding an interest field to any feedback for the app!
            </h3>
            <button
                className="me-2"
                title="FifthDemoPage:" onClick={(() => setDisplay('FifthDemoPage:'))}
                > Next: 
                </button>
        </>
    )
}

const FifthDemoPage = ({ setDisplay }) => {
    return (
        <>
            {/*  Put the little gear icon here */}
            <h1> All Done! </h1>
            <h3> Thank you for completing that short demo. Now we are going to move on to the first real aspect of building your profile, the interest inventory!
                You will select up to 15 interests from our long list, and we will use that to filter your matches.
                You will automatically see people first who have the most shared interest with you. 
                And don't worry, you can always update your interests in the profile portal!
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
                createInterestInventory({ context, interest: interest.interests })
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
    );
};

const AddAnswerDisplay = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [questionList, setQuestionList] = useState([])

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions({ context })
                setQuestionList(response.data)
            } catch (error) {
                console.error('Failed to fetch interests:', error)
            }
        }
        fetchQuestions();
    }, [context]);

    console.log('QUESTION LIST: ', questionList)

    return (
        <> Lets make some answers </>
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
                    {display === "FirstDemoPage:" && <FirstDemoPage setDisplay={setDisplay} />}
                    {display === "SecondDemoPage:" && <SecondDemoPage setDisplay={setDisplay} />}
                    {display === "ThirdDemoPage:" && <ThirdDemoPage setDisplay={setDisplay} />}
                    {display === "FourthDemoPage:" && <FourthDemoPage setDisplay={setDisplay} />}
                    {display === "FifthDemoPage:" && <FifthDemoPage setDisplay={setDisplay} />}
                    {display === "AddInterestDisplay:" && <AddInterestDisplay setDisplay={setDisplay} />}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </ThemeProvider>
    )
  }

  export default Demo