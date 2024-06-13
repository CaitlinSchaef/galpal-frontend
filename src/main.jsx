import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { useReducer } from 'react'

//project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// page imports
import App from './Pages/App.jsx';
import LogIn from './Pages/LogIn.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import CreateUser from './Pages/CreateUser.jsx';
import ProfilePortal from './Pages/ProfilePortal.jsx';
import MyNavBar from './NavBar.jsx';

// import Reducer
import { displayReducer, initialState } from './DisplayReducer.js';

// import Context
import { Context } from './Context.js';

const site = import.meta.env.BASE_URL

const Protected = ({component}) => {
  const { auth } = useContext(Context)
  return auth?.accessToken ? (
    <>
      {component}
    </>
  ) : (
    <Navigate to="/" replace={true} />
  )
}

//this is our layout to install
// If you want to add a footer, do it after the outlet div with <Footer /> same for navbar
function Layout() {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <MyNavBar />
      <div id='page-content'>
        <Outlet />
      </div>
    </ div>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/LogIn',
        element: <LogIn />
      },
      {
        path: '/CreateUser',
        element: <CreateUser />
      },
      {
        path: '/ProfilePortal',
        element: <Protected component={<ProfilePortal />} />
      },
    ]
  }
], {
  basename: site
})


// basically we're creating values that we're going to track and update, and then we need to wrap that whole thing around the app
const ContextProvider = ({ children }) => {
  //we're going to set up local storage to store their token
  let tempToken = localStorage.getItem('token')
  let tempUser = localStorage.getItem('user')
  
  const [accessToken, setAccessToken] = useState(tempToken ? tempToken : '')
  const [user, setUser] = useState(tempUser ? tempUser : '')
  const [state, dispatch] = useReducer(displayReducer, initialState)

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(accessToken))
    localStorage.setItem("user", user)
  }, [accessToken])

  const context = {
    accessToken,
    setAccessToken,
    user,
    setUser,
    state,
    dispatch,
  }

  return (
    <Context.Provider value ={{ context }}>
      {children}
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
   <RouterProvider router={router} />
  </ContextProvider>
)