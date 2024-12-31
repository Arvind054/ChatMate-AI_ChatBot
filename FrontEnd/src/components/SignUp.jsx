import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserData } from './Context/UserContext';
const SignUp = () => {
  const {btnLoading, UserRegister} = UserData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
    UserRegister(name, email, password, navigate);
  }
  return (
    <div className='main'>
       <div className="inputBox">
        <form >
           <input type="text" className='userInputs' placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
           <input  className='userInputs' type="email"  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
           <input required className='userInputs' type="text" placeholder='password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
           <button style={{color: "green"}} onClick={(e)=>handleSubmit(e)} disabled = {btnLoading}>{btnLoading ? "...wait": "SignUp"}</button>
           </form>
            <p>Alaready had an account ? <a href="/">LogIn</a></p>
       </div>
    </div>
  )
}

export default SignUp
