import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Context } from "../Context"
import Image from 'react-bootstrap/Image'
import { getMessageChannels, getMessages, createMessage, getAllProfileDisplays } from "../api"
import ListGroup from 'react-bootstrap/ListGroup';


//Initial Display
// This will just display all of the available message channels, they can click into one specific one
const InitialDisplay = ({ setDisplay, setSelectedChannel }) => {
    const { context } = useContext(Context)
    const [availableMessageChannels, setAvailableMessageChannels] = useState([])
    const [listOfAllUsers, setListOfAllUsers] = useState([])

    // big use effect to fetch all profiles and all message channels
    useEffect(() => {
        const fetchMessageChannels = async () => {
            try {
                const response = await getMessageChannels({ context })
                setAvailableMessageChannels(response.data)
            } catch (error) {
                console.error('Failed to fetch message channels:', error)
            }
        }
        
        const fetchAllProfileDisplays = async () => {
            try {
                const response = await getAllProfileDisplays({ context })
                setListOfAllUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch profile displays:', error)
            }
        }

        fetchMessageChannels()
        fetchAllProfileDisplays()
    }, [context])

    console.log('ALL PROFILES: ', listOfAllUsers)

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
            const otherUserId = channel.user1[0] === context.userId ? channel.user2[0] : channel.user1[0] && channel.user2[0] === context.userId ? channel.user1[0] : channel.user2[0]
            const otherUsername = getUsernameById(otherUserId)

            // something like: action onClick={alertClicked} (add this after Item in <ListGroup.Item>)
            return (
                <div key={channel.name}>
                    <ListGroup>
                    <ListGroup.Item action onClick={() => handleChannelClick(channel)}> {otherUsername} </ListGroup.Item>
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

    //I need to do something to setMessageChannel, don't know if that needs to happen in initial display or here??

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages({ context, messageChannel: selectedChannel.name })
                setMessagesInChannel(response.data)
            } catch (error) {
                console.error('Failed to fetch messages:', error)
            }
        }
        fetchMessages()
    }, [context, selectedChannel])

    // Function to handle message submission
    const submitMessage = async () => {
        try {
            const response = await createMessage({ context, messageChannel: selectedChannel.name, messageContent })
            // Update messages list after successful submission
            setMessagesInChannel([...messagesInChannel, response.data])
            // Clear message content after sending
            setMessageContent('')
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }
    console.log('MESSAGES: ', messagesInChannel)


    return (
        <>
            <h1>Specific Message Channel: {selectedChannel.name}</h1>
            
            <div>
                {messagesInChannel.map((message, index) => (
                    <p key={index}>{message.content}</p>
                ))}
            </div>
            
            <div>
                <input 
                    type="text" 
                    value={messageContent} 
                    onChange={(e) => setMessageContent(e.target.value)} 
                />
                <button onClick={submitMessage}>Send</button>
            </div>
            
            <button onClick={() => setDisplay('InitialDisplay')}>Back</button>
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

