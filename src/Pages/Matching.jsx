// this page is where people will swipe 
import {  getAllAnswers, getAllProfileDisplays, getAllInterestInventories, getMatchRequests, getInterestInventory, baseUrl } from '../api'
import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Context } from "../Context"
import Image from 'react-bootstrap/Image'


// <img src={`http://127.0.0.1:8000${profilePhoto}`} width="250"
//                 height="250" alt="Profile Photo" />

const Body = () => {
    const { context } = useContext(Context)

    const [allAnswerList, setAllAnswerList] = useState([])
    const [listOfAllUsers, setListOfAllUsers] = useState([])
    const [listOfAllInventories, setListOfAllInventories] = useState([])
    const [matchRequests, setMatchRequests] = useState([])
    const [currentUserInterests, setCurrentUserInterests] = useState([])
    const [potentialMatches, setPotentialMatches] = useState([])
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0)

    //I need to set something for the current user in state maybe? because line 83 is bad 

    // okay this used to be like 4 use effects but we're combining them so the page doesn't run a bunch 
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
                setMatchRequests(matchRequestsResponse.data)

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

            const filteredMatches = profilesWithInterests.filter(profile => profile.user !== context.user)

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

    const displayProfile = () => {
        if (potentialMatches.length === 0) {
            return (
                <div>No potential matches found.</div>
            );
        }

        const profile = potentialMatches[currentProfileIndex]

        // Filter answers for the current profile
        const profileAnswers = allAnswerList.filter(answer => answer.user === profile.user)

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

    const nextProfile = () => {
        if (currentProfileIndex < potentialMatches.length - 1) {
            setCurrentProfileIndex(currentProfileIndex + 1)
        }
    }

    const previousProfile = () => {
        if (currentProfileIndex > 0) {
            setCurrentProfileIndex(currentProfileIndex - 1)
        }
    }

    return (
        <div>
            <div>
                {displayProfile()}
            </div>
            <button onClick={previousProfile} disabled={currentProfileIndex === 0}>Previous</button>
            <button onClick={nextProfile} disabled={currentProfileIndex === potentialMatches.length - 1}>Next</button>
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



//     // Function to handle passing on a potential match
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

//     // Function to handle adding a potential match as a friend :)
//     const handlePass = async () => {
//         const currentProfile = potentialMatch[currentProfileIndex]
//         try {
//             // Create new match request with status 'Denied'
//             await createMatchRequest({ context, data: { requester: context.user, requested: currentProfile.user, status: 'Denied' } })
//             // Move to the next potential match
//             setCurrentProfileIndex(prevIndex => prevIndex + 1)
//         } catch (error) {
//             console.error('Error handling friend:', error)
//         }
//     }


