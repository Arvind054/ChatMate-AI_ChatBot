import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserData } from './Context/UserContext';
import SideBar from './SideBar';
import Chat from './Chat';

const Home = () => {
    const {verifyUser, isAuth} = UserData();
     const navigator = useNavigate();
    useEffect(()=>{
        if(!isAuth){
            navigator('/login');
        }
    },[]);
  return (
  
    <div className='HomeComponent'> 
    {isAuth && <><SideBar></SideBar><Chat></Chat></>}
   
    </div> 
  )
}

export default Home
