import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { UserData } from './Context/UserContext';
import { useEffect } from 'react';

const Login = () => {
  const {UserLogin, btnLoading, isAuth} = UserData();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function handleSubmit(e){
      e.preventDefault();
      UserLogin(email, password, navigate);
    }
useEffect(()=>{
  if(isAuth){
    navigate('/');
  }
});
  return (
    <div className='main'>
       <div className="inputBox">
        <form >
           <input  className='userInputs' type="email"  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
           <input required className='userInputs' type="text" placeholder='password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
           <button style={{color: "green"}} onClick={(e)=>handleSubmit(e)} disabled = {btnLoading}>{btnLoading ? "Login": "..wait"}</button>
           </form>
            <p>new User ?<a href="/signUp">Sign Up</a></p>
       </div>
    </div>
  )
}

export default Login
