// this is going to be the user's settings where they can potentially delete their account, change their name/email etc

import { useContext } from 'react'
import { Context } from '../Context'



function UserSettings() {
    const { context } = useContext(Context)
    
    const logOut = () => {
        // this will both clear the local storage and also take away the access token!
        const logOut = () => {
          localStorage.clear("token")
          context.setAccessToken('')
          localStorage.clear("user")
          context.setUser('')
          console.log('LOGGED OUT: SUCCESS')
        }
    
    }

    return (
        <>
        Update name/email/etc 
        <button onClick={() => logOut()}>Log Out</button>
        Delete Account 
        </>
    )
}

export default UserSettings