import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Context } from "../Context"
import Image from 'react-bootstrap/Image'
import { getMessageChannels, getMessages, createMessage, getAllProfileDisplays, getMatchProfile } from "../api"
import ListGroup from 'react-bootstrap/ListGroup'


//Initial Display
// This will just display all of the available message channels, they can click into one specific one
const InitialDisplay = ({ setDisplay, setSelectedChannel }) => {
    const { context } = useContext(Context)
    const [availableMessageChannels, setAvailableMessageChannels] = useState([])
    const [listOfAllUsers, setListOfAllUsers] = useState([])
    const [currentUserProfile, setCurrentUserProfile] = useState({})

    // big use effect to fetch all profiles and all message channels, and the current users profile (could use this or context, just setting it in case I want to use it)
    useEffect(() => {
        const fetchMessageChannels = async () => {
            try {
                const response = await getMessageChannels({ context })
                setAvailableMessageChannels(response.data)
            } catch (error) {
                console.error('Failed to fetch message channels:', error)
            }
        };

        const fetchAllProfileDisplays = async () => {
            try {
                const response = await getAllProfileDisplays({ context })
                setListOfAllUsers(response.data)
            } catch (error) {
                console.error('Failed to fetch profile displays:', error)
            }
        };

        const fetchCurrentUserProfile = async () => {
            try {
                const response = await getMatchProfile({ context })
                setCurrentUserProfile(response.data)
            } catch (error) {
                console.error('Failed to fetch current user profile:', error)
            }
        }

        fetchMessageChannels()
        fetchAllProfileDisplays()
        fetchCurrentUserProfile()
    }, [context])

    console.log('ALL PROFILES: ', listOfAllUsers)
    console.log('CURRENT USER: ', currentUserProfile)

    const getUsernameById = (id) => {
        const user = listOfAllUsers.find(user => user.user === id)
        return user ? user.display_name : "Unknown User"
    }
    
    // handle the click 
    const handleChannelClick = (channel) => {
        setSelectedChannel(channel)
        setDisplay('SpecificMessageDisplay')
    }

    // this is going to show all of the message channels that the current user is a part of, but only the other persons name. this works!
    const renderMessageChannels = () => {
        return availableMessageChannels.map(channel => {
            let otherUserId
            if (channel.user1.includes(currentUserProfile.user)) {
                otherUserId = channel.user2[0] 
            } else if (channel.user2.includes(currentUserProfile.user)) {
                otherUserId = channel.user1[0]
            } else {
                console.error('Current user is not part of this channel:', channel)
                return null // Handle the case where current user is not found in channel
            }

            const otherUsername = getUsernameById(otherUserId)

            return (
                <div key={channel.name}>
                    <ListGroup>
                        <ListGroup.Item action onClick={() => handleChannelClick(channel)}>
                            {otherUsername}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            )
        })
    }


    console.log('MESSAGE CHANNELS: ', availableMessageChannels)

    return (
        <>
            <h1>Message Channels:</h1>
            {renderMessageChannels()}
        </>
    )
}
// Specific Message Channel Display
// This is what will show whenever someone clicks into a specific message channel 
//I think I will pass 'selectedChannel' to this from the initial display page 
const SpecificMessageDisplay = ({ setDisplay, selectedChannel }) => {
    const { context } = useContext(Context)
    const [messageContent, setMessageContent] = useState('')
    const [messagesInChannel, setMessagesInChannel] = useState([])
    const [error, setError] = useState(null)
    const [listOfAllUsers, setListOfAllUsers] = useState([])
    const [currentUserProfile, setCurrentUserProfile] = useState({})
    const characterLimit = 500
    // State to manage polling interval
    const [pollingIntervalId, setPollingIntervalId] = useState(null)

   
    // a useEffect to grab all of the messages for this channel, but also to grab all profiles so we can use display names 
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages({ context, messageChannel: selectedChannel.name })
                if (Array.isArray(response.data)) {
                    setMessagesInChannel(response.data)
                } else {
                    console.error('Unexpected response format:', response)
                    setError('Unexpected response format')
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error)
                setError('Failed to fetch messages')
            }
        }

        const fetchAllProfileDisplays = async () => {
            try {
                const response = await getAllProfileDisplays({ context })
                setListOfAllUsers(response.data)
            } catch (error) {
                console.error('Failed to fetch profile displays:', error)
            }
        }

        const fetchCurrentUserProfile = async () => {
            try {
                const response = await getMatchProfile({ context })
                setCurrentUserProfile(response.data)
            } catch (error) {
                console.error('Failed to fetch current user profile:', error)
            }
        }

        fetchMessages()
        fetchAllProfileDisplays()
        fetchCurrentUserProfile()

        // set up polling interval to fetch messages every 15 seconds (15000 = 15 seconds)
        const intervalId = setInterval(fetchMessages, 15000) 

        // store the interval ID in state, so we can clear it later
        setPollingIntervalId(intervalId)

        // clean up function to clear interval when the user leaves this page
        return () => {
            if (pollingIntervalId) {
                clearInterval(pollingIntervalId)
            }
        }
    }, [context, selectedChannel])

    // getting user id's and then display names from the lists of all users 
    const getUsernameById = (id) => {
        const user = listOfAllUsers.find(user => user.user === id)
        return user ? user.display_name : "Unknown User";
    }

    // function to handle message submission
    const submitMessage = async () => {
        try {
            const response = await createMessage({ context, messageChannel: selectedChannel.name, messageContent })
            if (response && response.data) {
                setMessagesInChannel([...messagesInChannel, response.data])
                setMessageContent('')
            } else {
                console.error('Unexpected response format on message creation:', response)
                setError('Unexpected response format on message creation')
            }
        } catch (error) {
            console.error('Error sending message:', error)
            setError('Error sending message')
        }
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    console.log('MESSAGES: ', messagesInChannel)

    // function for how we're going to display the individual messages, switching sides by user 
    const renderMessages = () => {
        return messagesInChannel.map((message, index) => {
            const isCurrentUser = message.message_author === currentUserProfile.user
            const displayName = getUsernameById(message.message_author)

            return (
                <div 
                    key={index} 
                    style={{ 
                        textAlign: isCurrentUser ? 'right' : 'left', 
                        padding: '10px', 
                        backgroundColor: isCurrentUser ? '#D899DB' : '#D9AC89', 
                        borderRadius: '10px',
                        margin: '10px 0'
                    }}
                >
                    <p>{message.message_content}</p>
                    <small>{displayName}</small>
                </div>
            )
        })
    }

    const handleInputChange = (e) => {
        setMessageContent(e.target.value)
    }

    console.log('CURRENT USER: ', context.user)

    const otherUser1 = selectedChannel.user1[0]
    const otherUser2 = selectedChannel.user2[0]
    const otherUser1Name = getUsernameById(otherUser1)
    const otherUser2Name = getUsernameById(otherUser2)
    const channelName = `${otherUser1Name} and ${otherUser2Name}`

    return (
        <>
        <button onClick={() => setDisplay('InitialDisplay')}>Back to All Messages</button>
        <h1>Specific Message Channel: {channelName}</h1>
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {messagesInChannel.length > 0 ? (
                renderMessages()
            ) : (
                <p>No messages yet. Send your first message!</p>
            )}
        </div>
        <div>
            <textarea 
                value={messageContent} 
                onChange={handleInputChange}
                style={{ width: '100%', height: '100px' }}
                maxLength={characterLimit}
            />
            <div>
                <small>{characterLimit - messageContent.length} characters left</small>
            </div>
            <button onClick={submitMessage}>Send</button>
        </div>
    </>
    )
}



function MessageChannel() {
    const [display, setDisplay] = useState('InitialDisplay')
    const [selectedChannel, setSelectedChannel] = useState(null)

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
                  {display === "InitialDisplay" && <InitialDisplay setDisplay={setDisplay} setSelectedChannel={setSelectedChannel} />}
                  {display === "SpecificMessageDisplay" && <SpecificMessageDisplay setDisplay={setDisplay} selectedChannel={selectedChannel} />}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </ThemeProvider>
    )
}

export default MessageChannel

