import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Context } from "../Context"
import Image from 'react-bootstrap/Image'
import { getMessageChannels, getMessages, createMessage, getAllProfileDisplays } from "../api"


//Initial Display
// This will just display all of the available message channels, they can click into one specific one
const InitialDisplay = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [availableMessageChannels, setAvailableMessageChannels] = useState([])
    const [listOfAllUsers, setListOfAllUsers] = useState([])

    useEffect(() => {
        const fetchMessageChannels = async () => {
            try {
                const response = await getMessageChannels({ context })
                setAvailableMessageChannels(response.data)
            } catch (error) {
                console.error('Failed to fetch message channels:', error)
            }
        }
        fetchMessageChannels()
    }, [context])

    console.log('MESSAGE CHANNELS: ', availableMessageChannels)

    return (
        <>
             <h1>Message Channels:</h1>
        </>
    )
}
// Specific Message Channel Display
// This is what will show whenever someone clicks into a specific message channel 
const SpecificMessageDisplay = ({ setDisplay }) => {
    const { context } = useContext(Context)
    const [messageContent, setMessageContent] = useState('')
    const [messageChannel, setMessageChannel] = useState('')
    const [messagesInChannel, setMessagesInChannel] = useState([])

    //I need to do something to setMessageChannel, don't know if that needs to happen in initial display or here??


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages({ context, messageChannel })
                setMessagesInChannel(response.data)
            } catch (error) {
                console.error('Failed to fetch messages:', error)
            }
        }
        fetchMessages()
    }, [context])


    return (
        <>
             <h1>Specific Messages Channels</h1>
        </>
    )
}


function MessageChannel() {
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
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </ThemeProvider>
    )
}

export default MessageChannel

