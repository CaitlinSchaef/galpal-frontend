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

// Get access token (this happens on user log in):
export const getToken = ({ username, password }) => {
    return axios.post(`${baseUrl}token/`, {
        username: username,
        password: password
    })
}

// Fetch User Profile:
export const getUser = ({ context }) => {
    axios({
      method: 'get',
      url: `${baseUrl}profile/`, 
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

//Create New User
export const createUser = ({ username, password, firstName, lastName,  email}) => {
    return axios({
      method: 'post',
      url: `${baseUrl}create-user/`, 
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Match Questions

// Get Match Profile Questions
export const getQuestions = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}get-questions/`,
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
// this is filtering by the user on the back end maybe it works
export const getAnswers = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}get-answers/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}

// Create Match Profile Answers
export const createAnswer = ({ context, formData }) => {
  return axios({
      method: 'post',
      url: `${baseUrl}create-answer/`,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Match Profile Display

// Create Match Profile Display
//took out the .then and .catch here because I'm doing it in the function
export const createMatchProfile = ({ context, displayName, bio, city, stateLocation, profilePhoto }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}create-match-profile/`, 
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

//Get Match Profile Display
export const getMatchProfile = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}get-match-profile/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Match Requests
// you need to filter results coming in based on denied? I need to like get user profiles and compare against requests and then don't show anyone that has denied, so prob will need to do stuff with fetch profile 
// no i need to get match request and then filter out where the user = requested and status = denied


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Interests

//get all of the interests
export const getInterests = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}get-interests/`,
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

// Create new interest inventory
export const createInterestInventory = ({ context, interest }) => {
  axios({
    method: 'post',
    url: `${baseUrl}create-interest-inventory/`, 
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

// Get interest inventory
export const getInterestInventory = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}get-interest-inventory/`,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Requested Matches

export const getMatchRequests = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}get-match-requests/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  });
};

export const createMatchRequest = ({ context, data }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}create-match-request/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: data
  });
};

// update match request
export const updateMatchRequest = ({ context, id, data }) => {
  return axios({
    method: 'patch',
    url: `${baseUrl}update-match-request/${id}/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'application/json'
    },
    data: data
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message Channels
export const createMessageChannel = ({ context, data }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}create-message-channel/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: data
  });
};

export const addToFriendsList = ({ context, data }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}add-to-friends-list/`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: data
  });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Messages
