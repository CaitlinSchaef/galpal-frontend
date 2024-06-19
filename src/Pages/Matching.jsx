// this page is where people will swipe 


// import React, { useEffect, useState, useContext } from 'react';
// import { getMatchProfile, getMatchRequests, createMatchRequest, updateMatchRequest, createMessageChannel, addToFriendsList } from '../api'; // Import your API functions
// import { Context } from '../Context'; // Assuming you have a UserContext to provide user info and access token

// function Matching() {
//     const { context } = useContext(UserContext); // Use context for user data and access token
//     const [profiles, setProfiles] = useState([]);
//     const [deniedUserIds, setDeniedUserIds] = useState([]);

//     useEffect(() => {
//         async function fetchProfiles() {
//             try {
//                 const response = await getMatchProfile({ context });
//                 const allProfiles = response.data;

//                 const matchRequestsResponse = await getMatchRequests({ context });
//                 const matchRequests = matchRequestsResponse.data;

//                 const deniedProfiles = matchRequests
//                     .filter(match => match.requested.id === context.user.profile.id && match.status === 'Denied')
//                     .map(match => match.requester.id);

//                 setDeniedUserIds(deniedProfiles);

//                 const availableProfiles = allProfiles.filter(profile => !deniedProfiles.includes(profile.id));

//                 // Fetch user's interests
//                 const userInterestsResponse = await getInterestInventory({ context });
//                 const userInterests = userInterestsResponse.data.map(item => item.interest.id);

//                 // Sort profiles by shared interests
//                 const sortedProfiles = availableProfiles.sort((a, b) => {
//                     const aInterests = a.interest_inventory.map(item => item.interest.id);
//                     const bInterests = b.interest_inventory.map(item => item.interest.id);

//                     const aShared = aInterests.filter(interest => userInterests.includes(interest)).length;
//                     const bShared = bInterests.filter(interest => userInterests.includes(interest)).length;

//                     return bShared - aShared;
//                 });

//                 setProfiles(sortedProfiles);
//             } catch (error) {
//                 console.log('Error fetching profiles:', error);
//             }
//         }

//         fetchProfiles();
//     }, [context]);

//     const handleFriend = async (requestedProfile) => {
//         try {
//             const matchRequestsResponse = await getMatchRequests({ context });
//             const matchRequests = matchRequestsResponse.data;

//             const existingMatch = matchRequests.find(match =>
//                 (match.requester.id === requestedProfile.id && match.requested.id === context.user.profile.id) ||
//                 (match.requester.id === context.user.profile.id && match.requested.id === requestedProfile.id)
//             );

//             if (existingMatch) {
//                 // Update existing match request
//                 await updateMatchRequest({
//                     context,
//                     id: existingMatch.id,
//                     data: {
//                         status: 'Approved',
//                         matched: true
//                     }
//                 });

//                 // Automatically create message channel and add to friends list
//                 await createMessageChannel({
//                     context,
//                     data: {
//                         name: `${requestedProfile.display_name} and ${context.user.profile.display_name}`,
//                         users: [requestedProfile.id, context.user.profile.id]
//                     }
//                 });

//                 await addToFriendsList({
//                     context,
//                     data: {
//                         user_id: context.user.profile.id,
//                         friend_id: requestedProfile.id
//                     }
//                 });

//             } else {
//                 // Create new match request
//                 await createMatchRequest({
//                     context,
//                     data: {
//                         requester: context.user.profile.id,
//                         requested: requestedProfile.id,
//                         status: 'Pending',
//                         matched: false
//                     }
//                 });
//             }
//             // Reload profiles after updating match request
//             fetchProfiles();
//         } catch (error) {
//             console.log('Error handling friend request:', error);
//         }
//     };

//     const handlePass = async (requestedProfile) => {
//         try {
//             const matchRequestsResponse = await getMatchRequests({ context });
//             const matchRequests = matchRequestsResponse.data;

//             const existingMatch = matchRequests.find(match =>
//                 (match.requester.id === requestedProfile.id && match.requested.id === context.user.profile.id) ||
//                 (match.requester.id === context.user.profile.id && match.requested.id === requestedProfile.id)
//             );

//             if (existingMatch) {
//                 // Update existing match request
//                 await updateMatchRequest({
//                     context,
//                     id: existingMatch.id,
//                     data: {
//                         status: 'Denied',
//                         matched: false
//                     }
//                 });
//             } else {
//                 // Create new match request
//                 await createMatchRequest({
//                     context,
//                     data: {
//                         requester: context.user.profile.id,
//                         requested: requestedProfile.id,
//                         status: 'Denied',
//                         matched: false
//                     }
//                 });
//             }
//             // Reload profiles after updating match request
//             fetchProfiles();
//         } catch (error) {
//             console.log('Error handling pass request:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Matching Portal</h1>
//             {profiles.length > 0 ? (
//                 profiles.map(profile => (
//                     <div key={profile.id}>
//                         <h2>{profile.display_name}</h2>
//                         <p>{profile.bio}</p>
//                         <p>{profile.city}, {profile.state}</p>
//                         {profile.profile_photo && <img src={profile.profile_photo} alt="Profile" />}
//                         <button onClick={() => handleFriend(profile)}>Friend</button>
//                         <button onClick={() => handlePass(profile)}>Pass</button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No profiles to match.</p>
//             )}
//         </div>
//     );
// }

// export default Matching;

function Matching() { 
    return (
        <>
        This is the matching page </>
    )
}

export default Matching
