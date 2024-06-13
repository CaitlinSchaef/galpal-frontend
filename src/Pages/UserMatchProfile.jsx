// this page is a display of the current logged in user's profile where they'll be able to view and update it

import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createPost, fetchUser, getPosts } from "../api"
import Form from 'react-bootstrap/Form';
import { context } from "../Context"
import { useContext, useEffect } from 'react'


const UserProfileDisplay = () => {
    const { context } = useContext(Context)
    const [profile, setProfile] = useState()

    useEffect(() => {
        const storedUsername = localStorage.getItem('user')

        if (context && storedUsername) {
            fetchUser({ context }).then(response => {
                try {
                    const userProfile = response.data.filter(profile => profile.user !== null)
                }
            })
        }
    })
}


function UserMatchProfile(){
    return(
        <div>
            This is the profile portal
        </div>
    )
}

export default UserMatchProfile

