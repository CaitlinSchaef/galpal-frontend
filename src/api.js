import axios from 'axios'

// const baseUrl = 'https://galpal-backend.fly.dev/'
const baseUrl = 'http://127.0.0.1:8000/'


// Get access token (this happens on user log in):
export const getToken = ({ auth, username, password }) => {
    return axios.post(`${baseUrl}token/`, {
        username: username,
        password: password
    }).then(response => {
        console.log('TOKEN RESPONSE: ', response)
        auth.setAccessToken(response.data.access)
        auth.setUser(username)
    }).catch(error => {
        console.log('TOKEN GRAB ERROR: ', error)
        auth.setAccessToken(undefined)
    })
}

// Fetch User Profile:
export const fetchUser = ({ auth }) => {
    axios({
      method: 'get',
      url: `${baseUrl}profile/`, 
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    }).then(response => {
      console.log('PROFILE: ', response)
    })
    .catch(error => {
      console.log('GET USER ERROR: ', error)
      auth.setAccessToken(undefined)
    })
  }

//Create New User
export const createUser = ({ username, password, firstName, lastName, displayName, bio, email, phone, city, stateLocation, profilePhoto }) => {
    axios({
      method: 'post',
      url: `${baseUrl}create_user/`, 
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