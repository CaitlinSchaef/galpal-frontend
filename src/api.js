import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// const baseUrl = 'https://galpal-backend.fly.dev/'
// const baseUrl = 'http://127.0.0.1:8000/'
export const baseUrl = import.meta.env.VITE_BASE_URL
console.log('BASE URL: ', baseUrl)



// i am going to set the navigates on success
// const navigate = useNavigate()
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//User stuff

// Get access token (this happens on user log in), this works (try and catch handled on login page so navigate worked)
export const getToken = ({ username, password }) => {
    return axios.post(`${baseUrl}/token/`, {
        username: username,
        password: password
    })
}

// Fetch User Profile, this works (but not really using it anywhere)
export const getUser = ({ context }) => {
    axios({
      method: 'get',
      url: `${baseUrl}/profile/`, 
      headers: {
        Authorization: `Bearer ${context.accessToken}`
      }
    }).then(response => {
      console.log('PROFILE: ', response)
    })
    .catch(error => {
      console.log('GET USER ERROR: ', error)
      context.setAccessToken(undefined)
    })
  }

//Create New User, this works, try and catch handled on create user page so navigate worked)
export const createUser = ({ username, password, firstName, lastName,  email}) => {
    return axios({
      method: 'post',
      url: `${baseUrl}/create-user/`, 
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: {
        username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        email,
      }
    })
  }

// Delete User Profile, honestly don't know if this works, need to try it with a dummy account
export const deleteUser = ({ context }) => {
  axios({
    method: 'delete',
    url: `${baseUrl}/delete-user/`, 
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  }).then(response => {
    console.log('DELETE USER: ', response)
  })
  .catch(error => {
    console.log('DELETE USER ERROR: ', error)
    context.setAccessToken(undefined)
  })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Match Questions

// Get Match Profile Questions, this works
export const getQuestions = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-questions/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  }).then(response => {
    console.log('GET QUESTIONS: ', response)
    // because you're using this data you need to return the response
    return response
  })
  .catch(error => {
    console.log('GET QUESTIONS ERROR: ', error)
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Match Answers

// Get Match Profile Answers
// this is filtering by the user on the back end, it works
export const getAnswers = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-answers/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}

// Create Match Profile Answers, this works
export const createAnswer = ({ context, formData }) => {
  return axios({
      method: 'post',
      url: `${baseUrl}/create-answer/`,
      headers: {
        Authorization: `Bearer ${context.accessToken}`,
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    .then(response => {
      console.log('CREATE ANSWER: ', response)
    })
    .catch(error => {
      console.log('CREATE ANSWER ERROR: ', error)
    })
}

//update profile answers
export const updateProfileAnswer = ({ context, formData, id  }) => {
  return axios({
      method: 'put',
      url: `${baseUrl}/update-answer/${id}/`,
      headers: {
          Authorization: `Bearer ${context.accessToken}`,
          'Content-Type': 'multipart/form-data'
      },
      data: formData
  })
}

// Get ALLL Match Profile Answers for all users, this works 
export const getAllAnswers = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-all-answers/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  }).then(response => {
    console.log('GET ALL ANSWERS: ', response)
    // because you're using this data you need to return the response
    return response
  })
  .catch(error => {
    console.log('GET ALL ANSWERS ERROR: ', error)
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Match Profile Display

// Create Match Profile Display
//took out the .then and .catch here because I'm doing it in the function, this works
export const createMatchProfile = ({ context, displayName, bio, city, stateLocation, profilePhoto }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-match-profile/`, 
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      display_name: displayName,
      bio,
      city,
      state: stateLocation,
      profile_photo: profilePhoto,
    }
  })
}

//update match profile Display , this works, handling try catch on function page
// this is a put, so basically deletes the old user stuff and makes a new one
export const updateMatchProfileDisplay = ({ context, formData  }) => {
  return axios({
      method: 'put',
      url: `${baseUrl}/update-match-profile/`,
      headers: {
          Authorization: `Bearer ${context.accessToken}`,
          'Content-Type': 'multipart/form-data'
      },
      data: formData
  })
}

//Get Match Profile Display, this works
export const getMatchProfile = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-match-profile/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}

// Get ALLLLL Match Profile Displays like for all users, this works! 
export const getAllProfileDisplays = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-all-match-profiles/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  }).then(response => {
    console.log('GET ALL PROFILES: ', response)
    // because you're using this data you need to return the response
    return response
  })
  .catch(error => {
    console.log('GET ALL PROFILES ERROR: ', error)
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Interests

//get all of the interests, this works
export const getInterests = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-interests/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  }).then(response => {
    console.log('GET INTERESTS: ', response)
    // because you're using this data you need to return the response
    return response
  })
  .catch(error => {
    console.log('GET INTERESTS ERROR: ', error)
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Interests Inventories 

// Create new interest inventory, this works
export const createInterestInventory = ({ context, interest }) => {
  axios({
    method: 'post',
    url: `${baseUrl}/create-interest-inventory/`, 
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
    },
    data: {
      // username: context.user,
      interest,
    }
  }).then(response => {
    console.log('CREATE INTEREST: ', response)
  })
  .catch(error => {
    console.log('CREATE INTEREST ERROR: ', error)
  })
}

// Get interest inventory of current user, this works
export const getInterestInventory = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-interest-inventory/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  }).then(response => {
    console.log('GET INTEREST INVENTORY: ', response)
    // because you're using this data you need to return the response
    return response
  })
  .catch(error => {
    console.log('GET INTEREST INVENTORY ERROR: ', error)
  })
}

// Get interest inventory of all users 
export const getAllInterestInventories = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-all-interest-inventories/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}

//update interest inventory , this works, handling try catch on function page
// this is a put, so basically deletes the old user stuff and makes a new one
export const updateInterestInventory = ({ context, interests }) => {
  return axios({
      method: 'put',
      url: `${baseUrl}/update-interest-inventory/`,
      headers: {
          Authorization: `Bearer ${context.accessToken}`,
          'Content-Type': 'application/json'
      },
      data: {
          interests: interests
      }
  })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Match Requests
// you need to filter results coming in based on denied? I need to like get user profiles and compare against requests and then don't show anyone that has denied, so prob will need to do stuff with fetch profile 
// no i need to get match request and then filter out where the user = requested and status = denied


// get match requests, idk if this works
export const getMatchRequests = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-match-requests/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}


// create new match request, idk if this works
export const createMatchRequest = ({ context, data }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-match-request/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: data,
  })
}

// update match request, idk if this works
// using a patch because it will just update part of the thing, but maybe need to change it to a put?
export const updateMatchRequest = ({ context, data, id }) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/update-match-request/${id}/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'application/json'
    },
    data: data,
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message Channels

//create message channel
export const createMessageChannel = ({ context, data }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-message-channel/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

// get message channels
export const getMessageChannels = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-message-channel/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Messages

//create a new message
export const createMessage = ({ context, messageChannel, messageContent }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-message/`, 
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      message_channel: messageChannel,
      message_content: messageContent,

    }
  })
}

// export const createMessage = async ({ context, messageChannel, messageContent }) => {
//   const response = await axios.post('/create-message/', {
//       message_channel: messageChannel,
//       message_content: messageContent,
//   }, {
//       headers: {
//           Authorization: `Bearer ${context.token}`,
//       },
//   });
//   return response;
// };

// get messages for a specific message channel
// had to set this up so that the messageChannel was a query 
export const getMessages = ({ context, messageChannel }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-messages/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    },
    params: {
      message_channel: messageChannel
    }
  })
}

// export const getMessages = async ({ context, messageChannel }) => {
//   const response = await axios.get('/get-messages/', {
//       params: {
//           message_channel: messageChannel,
//       },
//       headers: {
//           Authorization: `Bearer ${context.token}`,
//       },
//   });
//   return response;
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Friends List 

// create new friend list, might not need this as I'm doing it in back end
export const addToFriendsList = ({ context, data }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/add-to-friends-list/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

// get friends list
export const getFriendsList = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-friends-list/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}

