// this is going to be the user's settings where they can potentially delete their account, change their name/email etc

import { useState, useContext } from 'react'
import { Context } from '../Context'

const LogOut = () => {
    const { context } = useContext(Context)
  
    // this will both clear the local storage and also take away the access token!
    const logOut = () => {
      localStorage.clear("token")
      context.setAccessToken('')
      localStorage.clear("user")
      context.setUser('')
      console.log('LOGGED OUT: SUCCESS')
    }

}

function UserSettings() {
    return (
        <>
        Update name/email/etc 
        Log Out
        Delete Account 
        </>
    )
}

export default UserSettings