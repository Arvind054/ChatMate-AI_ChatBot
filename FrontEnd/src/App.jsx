import React from 'react'
import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
      {
        path : '/login',
        element: <Login/>
      },
      {
        path: '/signUp',
        element: <SignUp/>
      },{
        path: '/',
        element: <Home/>
      }

  ])
  return (
    <>
    
    <RouterProvider router={router}/>
    </>
  )
}

export default App
