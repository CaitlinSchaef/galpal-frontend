// this page is where people will swipe 
import {  getAllAnswers, getAllProfileDisplays, getAllInterestInventories, getMatchRequests, getInterestInventory, baseUrl, createMatchRequest, updateMatchRequest, getMatchProfile } from '../api'
import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Context } from "../Context"
import Image from 'react-bootstrap/Image'


const Body = () => {
    const { context } = useContext(Context)

    const [allAnswerList, setAllAnswerList] = useState([])
    const [listOfAllUsers, setListOfAllUsers] = useState([])
    const [listOfAllInventories, setListOfAllInventories] = useState([])
    const [matchRequests, setMatchRequests] = useState([])
    const [currentUserInterests, setCurrentUserInterests] = useState([])
    const [potentialMatches, setPotentialMatches] = useState([])
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
    const [currentUserName, setCurrentUserName] = useState()

    useEffect(() => {
        const grabProfile = async () => {
            try {
                const response = await getMatchProfile({ context })
                setCurrentUserName(response.data.display_name)
            } catch (error) {
                console.error('Failed to fetch user:', error)
            }
        }
        grabProfile()
    }, [context])


    // okay this used to be like 4 use effects but we're combining them so the page doesn't run a bunch, all the info we need
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profilesResponse, answersResponse, inventoriesResponse, matchRequestsResponse, currentUserInterestsResponse] = await Promise.all([
                    getAllProfileDisplays({ context }),
                    getAllAnswers({ context }),
                    getAllInterestInventories({ context }),
                    getMatchRequests({ context }),
                    getInterestInventory({ context })
                ])

                setListOfAllUsers(profilesResponse.data)
                setAllAnswerList(answersResponse.data)
                setListOfAllInventories(inventoriesResponse.data)
                setMatchRequests(matchRequestsResponse.data || [])

                const interests = currentUserInterestsResponse.data.map(item => item.interest.interests)
                setCurrentUserInterests(interests)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            }
        }

        fetchData()
    }, [context])

    console.log('LIST OF ALL PROFILES:', listOfAllUsers)
    console.log('ALL ANSWER LIST:', allAnswerList)
    console.log('ALL INVENTORIES LIST:', listOfAllInventories)
    console.log('ALL MATCH REQUESTS:', matchRequests)
    console.log('CURRENT USER INTEREST INVENTORY:', currentUserInterests)

    useEffect(() => {
        if (listOfAllUsers.length > 0 && listOfAllInventories.length > 0 && currentUserInterests.length > 0) {
            console.log("Starting filtering and sorting...")

            let usersInterestsMap = {}
            listOfAllInventories.forEach(item => {
                const userId = item.user
                if (!usersInterestsMap[userId]) {
                    usersInterestsMap[userId] = []
                }
                usersInterestsMap[userId].push(item.interest)
            })

            let profilesWithInterests = listOfAllUsers.map(profile => ({
                ...profile,
                interests: usersInterestsMap[profile.user] || []
            }))


            profilesWithInterests.forEach(profile => {
                console.log(`User ${profile.user} (${profile.display_name}) has interests:`, profile.interests)
            })
            // get usernames of users who have been denied

            /// Get denied users based on matchRequests
            const deniedUsers = Array.isArray(matchRequests)
            ? matchRequests.filter(request => request.status === 'Denied').map(request => request.requested_display_name)
            : []
            
            console.log('DENIED USERS: ', deniedUsers)

            const deniedRequesters = Array.isArray(matchRequests)
               ? matchRequests.filter(request => request.status === 'Denied').map(request => request.requester_display_name)
               : []


           console.log('DENIED REQUESTERS: ', deniedRequesters)

           //I think I may need to add a filter for instances where the current user = requester on a matchRequest and the status is 'pending'?

           const pendingRequested = Array.isArray(matchRequests)
               ? matchRequests.filter(request => request.status === 'Pending').map(request => request.requested_display_name)
               : []

            // updating to not show approved ones either
            const approvedRequested = Array.isArray(matchRequests)
               ? matchRequests.filter(request => request.status === 'Approved').map(request => request.requested_display_name)
               : []

            // filter potential matches by current user, denied requested and denied requester
            // basically I don't want to show match requests where the status is Denied and the current user is the requested or requester
            const filteredMatches = profilesWithInterests.filter(profile =>
                profile.display_name !== currentUserName && !deniedUsers.includes(profile.display_name) && !deniedRequesters.includes(profile.display_name) && !pendingRequested.includes(profile.display_name) && !approvedRequested.includes(profile.display_name)

            )

            filteredMatches.forEach(profile => {
                const profileInterests = profile.interests.map(interest => interest.interests);
                const sharedInterestsCount = currentUserInterests.filter(interest => profileInterests.includes(interest)).length
                profile.sharedInterestsCount = sharedInterestsCount
                console.log(`User ${profile.user} (${profile.display_name}) shared interests count:`, sharedInterestsCount)
            })

            filteredMatches.sort((a, b) => b.sharedInterestsCount - a.sharedInterestsCount)

            setPotentialMatches(filteredMatches.sort((a, b) => b.sharedInterestsCount - a.sharedInterestsCount))
            setCurrentProfileIndex(0)
        } else {
            console.log("Data not yet available for filtering and sorting.")
            console.log("List of all users length:", listOfAllUsers.length)
            console.log("List of all inventories length:", listOfAllInventories.length)
            console.log("Current user interests length:", currentUserInterests.length)
        }
    }, [listOfAllUsers, listOfAllInventories, currentUserInterests, context.user])

        // Function to diss someone aka pass
    const handlePass = async () => {
        const currentProfile = potentialMatches[currentProfileIndex]
        try {
            console.log('CURRENT PROFILE: ', currentProfile)
            // Create new match request with status 'Denied'
            await createMatchRequest({ context, data: { requested: currentProfile.display_name, status: 'Denied' } })
            console.log('LOOK HERE: ', currentProfile.user)
            console.log('LOOKIT THIS: ', currentProfile)
            // Move to the next potential match
            setCurrentProfileIndex(prevIndex => prevIndex + 1)
        } catch (error) {
            console.error('Error handling friend:', error)
        }
    }

    // function to handle a 'friend'
    const handleFriend = async () => {
        const currentProfile = potentialMatches[currentProfileIndex]
        try {
            const existingRequest = matchRequests.find(request => request.requester === currentProfile.user)
            console.log('EXISTING REQUEST:', existingRequest); // Add this line

            if (existingRequest) {
                // Update existing request to 'Approved'
                let editedRequest = {
                    ...existingRequest,
                    status: 'Approved',
                    matched: true
                }
                // await updateMatchRequest({ context, id: existingRequest.id, data: { status: 'Approved', matched: true } })
                await updateMatchRequest({ context, id: existingRequest.id, data: editedRequest })
            } else {
                // Create new match request with status 'Pending'
                await createMatchRequest({ context, data: { requested: currentProfile.display_name, status: 'Pending' } })
            }
            // Move to the next potential match
            setCurrentProfileIndex(prevIndex => prevIndex + 1)
        } catch (error) {
            console.error('Error handling pass:', error)
        }
    }


    const displayProfile = () => {
        if (potentialMatches.length === 0) {
            return (
                <div>No more friends to meet!</div>
            )
        }

        // const profile = potentialMatches[currentProfileIndex]

        // // Filter answers for the current profile
        // const profileAnswers = allAnswerList.filter(answer => answer.user === profile.user)

        let profileAnswers = [];
        const profile = potentialMatches[currentProfileIndex];

        if (profile) {
        // Filter answers for the current profile
        profileAnswers = allAnswerList.filter(answer => answer.user === profile.user);
        } else {
        // Handle the case when there are no more profiles
        console.warn('No more profiles available.');
        return 'No more friends to meet!'
        }

        return (
            <div>
                <h1>{profile.display_name}!</h1>
                <h4>{profile.bio}</h4>
                <h5>{profile.city}, {profile.userState}</h5>
                <br />
                <Image src={`${baseUrl}${profile.profile_photo}`} width="271" height="280" roundedCircle alt="Profile Photo" />
                <br />
                <div>
                    {profileAnswers && profileAnswers.map((answerItem, index) => (
                        <div key={index}>
                            <h5>Question: {answerItem.question.question}</h5>
                            {answerItem.image_answer ? (
                                <Image src={`${baseUrl}${answerItem.image_answer}`} width="280" height="280" alt="Answer Image" />
                            ) : (
                                <p>Answer: {answerItem.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    

    return (
        <div>
            <div>
                {displayProfile()}
            </div>
            <button onClick={handlePass} disabled={potentialMatches.length === 0}>PASS</button>
            <button onClick={handleFriend} disabled={potentialMatches.length === 0}>FRIEND</button>
        </div>
    )
}



function Matching(){
    return(
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
          minBreakpoint="xs"
        >
          <Container className="mt-5">
            <Row className="justify-content-center m-3">
                <Col xs={12} md={8} className="d-flex flex-column justify-content-between text-center MainBody">
                    <div className="overflow-scroll mb-3" style={{height: "75vh"}}>
                        <Body />
                    </div>
                </Col>
            </Row>
          </Container>
        </ThemeProvider>
    )
}

export default Matching




//     const handleFriend = async () => {
//         const currentProfile = potentialMatch[currentProfileIndex]
//         try {
//             const existingRequest = matchRequests.find(request => request.requester === currentProfile.user)

//             if (existingRequest) {
//                 // Update existing request to 'Approved'
//                 await updateMatchRequest({ context, data: { id: existingRequest.id, status: 'Approved', matched: true } })
//                 // Create message channel and add to friends list (assuming backend handles this)
//                 await createMessageChannel({ context, data: { profileId: currentProfile.user } })
//                 await addToFriendsList({ context, data: { profileId: currentProfile.user } })
//             } else {
//                 // Create new match request with status 'Pending'
//                 await createMatchRequest({ context, data: { requester: context.user, requested: currentProfile.user } })
//             }

//             // Move to the next potential match
//             setCurrentProfileIndex(prevIndex => prevIndex + 1)
//         } catch (error) {
//             console.error('Error handling pass:', error)
//         }
//     }



