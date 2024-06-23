// a page for users to view and update their interest inventory
import { useState, useContext, useEffect } from "react"
import { getInterestInventory, updateInterestInventory, getInterests } from "../api"
import { Context } from "../Context"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const InitialDisplay = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [interestInventory, setInterestInventory] = useState([])
    const [selectedInterests, setSelectedInterests] = useState([])

    useEffect(() => {
        const fetchInterestInventory = async () => {
            try {
                const response = await getInterestInventory({ context })
                const interests = response.data.map(item => item.interest.interests)
                setInterestInventory(response.data)
                setSelectedInterests(interests)
                console.log('INTEREST INVENTORY:', response.data)
            } catch (error) {
                console.error('Failed to get interest inventory:', error)
            }
        }
        fetchInterestInventory()
    }, [context])

        // need to put in a no interest found blurb in case it crashes while in their demo?
    return (
        <>
        <h1>Your Current Interests: </h1>
            {interestInventory.length > 0 ? (
                <ul>
                    {interestInventory.map((item, index) => (
                        <li key={index}>{item.interest.interests}</li>
                    ))}
                </ul>
            ) : (
                <p>No interests found, update your inventory below!</p>
            )}
            <button  onClick={(() => setDisplay('UpdateInventoryDisplay'))}>Update Your Interests!</button>
        </>
    )
}

const UpdateInventoryDisplay = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [interestInventory, setInterestInventory] = useState([])
    const [selectedInterests, setSelectedInterests] = useState([])
    const [interestList, setInterestList] = useState([])
    const maxSelections = 15

    useEffect(() => {
        const fetchInterestInventory = async () => {
            try {
                const response = await getInterestInventory({ context })
                const interests = response.data.map(item => item.interest.interests)
                setInterestInventory(response.data)
                setSelectedInterests(interests)
                console.log('INTEREST INVENTORY:', response.data)
            } catch (error) {
                console.error('Failed to get interest inventory:', error)
            }
        }
        fetchInterestInventory()
    }, [context])


    // we're always going to call getInterests so that users can update their interests with the newest list of available interests 
    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await getInterests({ context })
                setInterestList(response.data)
                console.log('INTEREST LIST:', response.data)
            } catch (error) {
                console.error('Failed to get interests:', error)
            }
        };
        fetchInterests()
    }, [context])

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
            await updateInterestInventory({ context, interests: selectedInterests })
            console.log('Interests updated successfully');

            // Fetch updated interest inventory after submission
            const response = await getInterestInventory({ context });
            setInterestInventory(response.data)
            setSelectedInterests(response.data.map(item => item.interest.interests))
        } catch (error) {
            console.error('Failed to update interests:', error)
        }
    }

    return (
        <div>
            <h2>Update Your Interests: </h2>
            <div>Select Your Interests: {selectedInterests.length} / {maxSelections}</div>
            {interestList.length > 0 ? (
                <form>
                    {interestList.map((interest) => (
                        <div key={interest.id}>
                            <input
                                type="checkbox"
                                id={`interest-${interest.id}`}
                                value={interest.interests}
                                onChange={() => handleCheckboxChange(interest.interests)}
                                checked={selectedInterests.includes(interest.interests)}
                                disabled={!selectedInterests.includes(interest.interests) && selectedInterests.length >= maxSelections}
                            />
                            <label htmlFor={`interest-${interest.id}`}>{interest.interests}</label>
                        </div>
                    ))}
                    <button type="button" onClick={handleSubmit} disabled={selectedInterests.length === 0}>
                        Update Interests!
                    </button>
                </form>
            ) : (
                <div>No interests found</div>
            )}
        </div>
    )
}

function UserInterestInventory(){
    const [display, setDisplay] = useState('InitialDisplay')

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
                  {display === "InitialDisplay" && <InitialDisplay setDisplay={setDisplay} />}
                  {display === "UpdateInventoryDisplay" && <UpdateInventoryDisplay setDisplay={setDisplay} />}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </ThemeProvider>
    )
}


export default UserInterestInventory