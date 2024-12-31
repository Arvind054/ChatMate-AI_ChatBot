import React from 'react'
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = 'AIzaSyAwPJIcVh1YoBG2GrRaw5dVBYn14OYwjOU';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { UserData } from './Context/UserContext';
const Home = () => {
    const {verifyUser} = UserData();
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState("output will be here");
    const [searching, setSearchig] = useState(false);
     const navigator = useNavigate();
    useEffect( ()=>{
    verifyUser();
    }, [])
    async function getOutput(e) {
      e.preventDefault();
      setSearchig(true);
      const result = await model.generateContent(prompt);
      setOutput(result.response.text());
      setSearchig(false);
      setPrompt('');
    }
  return (
    <div>
      <div className="main">
        <div className="allChats">
          <h3>All Chats</h3>
        </div>
        <div className="chat">
          <div className='outputBox'>
          <ReactMarkdown>{output}</ReactMarkdown>
          </div>
          <div className="inputBar">
          <form >
            <input placeholder='search here...' type="text" value={prompt} onChange={(e) => { setPrompt(e.target.value) }} /> 
            <button onClick={(e) => { getOutput(e) }} type='submit'>{searching ? "searching..." : "search"}</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
