import React from 'react'
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { UserData } from './Context/UserContext';
import { use } from 'react';
const Home = () => {
    const {verifyUser, isAuth} = UserData();
     const navigator = useNavigate();
    useEffect(()=>{
        if(!isAuth){
            navigator('/login');
        }
    },[]);
  return (
    <div>Home</div>
  )
}

export default Home
