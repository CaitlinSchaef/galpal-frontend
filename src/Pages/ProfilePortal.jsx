// this is really just a place for them to land
// then from there they can 
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from "react"
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getUser, getMatchProfile } from "../api"
import { Context } from "../Context"
import Image from 'react-bootstrap/Image';


// <img src={`http://127.0.0.1:8000${profilePhoto}`} width="250"
//                 height="250" alt="Profile Photo" />

function ProfilePortal(){
    const { context } = useContext(Context)
    const [userProfile, setUserProfile] = useState()
    const [name, setName] = useState()
    const [profilePhoto, setProfilePhoto] = useState()


    useEffect(() => {
        const grabProfile = async () => {
            try {
                const response = await getMatchProfile({ context })
                setUserProfile(response.data)
                setName(response.data.display_name)
                setProfilePhoto(response.data.profile_photo)
            } catch (error) {
                console.error('Failed to fetch user:', error)
            }
        }
        grabProfile()
    }, [context])
    
    console.log('USER Profile: ', userProfile)
    console.log('NAME: ', name)



    return(
        <div>
            
            <br/>
            <h1>Hello {name}!</h1>
            <br/>
            
            <Image src={`http://127.0.0.1:8000${profilePhoto}`} width="271" height="280" roundedCircle/>

            <Link to='/UserMatchProfile'>
                <h3> View or Change Your Match Display </h3>
            </Link>
            <br/>
            <Link to='/UserInterestInventory'>
                <h3> View or Change Your Interest Inventory </h3>
            </Link>
        </div>
    )
}

export default ProfilePortal