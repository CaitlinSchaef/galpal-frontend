import axios from 'axios'

// const baseUrl = 'https://galpal-backend.fly.dev/'
const baseUrl = 'http://127.0.0.1:8000/'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//User stuff

// Get access token (this happens on user log in):
export const getToken = ({ context, username, password }) => {
    return axios.post(`${baseUrl}token/`, {
        username: username,
        password: password
    }).then(response => {
        console.log('TOKEN RESPONSE: ', response)
        context.setAccessToken(response.data.access)
        context.setUser(username)
    }).catch(error => {
        console.log('TOKEN GRAB ERROR: ', error)
        context.setAccessToken(undefined)
    })
}

// Fetch User Profile:
export const fetchUser = ({ context }) => {
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
export const createUser = ({ username, password, firstName, lastName, displayName, bio, email, phone, city, stateLocation, profilePhoto }) => {
    axios({
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
        display_name: displayName,
        bio,
        email,
        phone,
        city,
        state: stateLocation,
        profile_photo: profilePhoto,
      }
    }).then(response => {
      console.log('CREATE USER: ', response)
    })
    .catch(error => {
      console.log('CREATE USER ERROR: ', error)
    })
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Match Questions

// Get Match Profile Questions
export const getQuestions = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-questions`,
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
    url: `${baseUrl}/get-answers`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
  })
}

// Create Match Profile Answers
export const createAnswer = ({ context, question, answer, image, }) => {
  console.log('THIS IS THE SUBMISSION: ', postCategory)  
  return axios({
      method: 'post',
      url: `${baseUrl}create-answer/`,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'multipart/form-data'
      },
      data: {
         question: postSubCategory, 
         answer: postBody, 
         image_answer: image
      }
    })
    .then(response => {
      console.log('CREATE ANSWER: ', response)
    })
    .catch(error => {
      console.log('CREATE ANSWER ERROR: ', error)
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
    url: `${baseUrl}/get-interests`,
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
    url: `${baseUrl}/get-interest-inventory`,
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
// Message Channels


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Messages
