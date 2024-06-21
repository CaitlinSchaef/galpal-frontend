// this is going to be the user's settings where they can potentially delete their account, change their name/email etc

import { useContext } from 'react'
import { Context } from '../Context'
import { deleteUser } from '../api'
import { useNavigate } from 'react-router-dom'

function UserSettings() {
    const { context } = useContext(Context)
    const navigate = useNavigate()
    
    const logOut = () => {
          localStorage.clear("token")
          context.setAccessToken('')
          localStorage.clear("user")
          context.setUser('')
          console.log('LOGGED OUT: SUCCESS')
          navigate('/')
    }

    const handleDelete = () => {
        deleteUser({ context })
        navigate('/')
      }


    return (
        <>
        Update email? 
        <button onClick={() => logOut()}>Log Out</button>

        <br/>
        <br/>
        <br/>
        <button className="deleteButton" onClick={() => handleDelete()}>Delete Account!</button>
        </>
    )
}

export default UserSettings

