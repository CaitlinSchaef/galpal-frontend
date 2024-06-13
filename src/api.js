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
// Get All Questions
export const getQuestions = ({ context }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-questions`,
    headers: {
      Authorization: `Bearer ${context.accessToken}`
    }
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message Channels


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Messages
