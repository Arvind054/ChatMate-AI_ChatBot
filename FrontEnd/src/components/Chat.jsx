import React, { useEffect } from 'react'
import SingleChat from './SingleChat'
import {ChatData} from './Context/ChatContext'
import { useRef} from 'react'
const Chat = () => {
  const {loading, getResponse, prompt, setPrompt, messages, currChat} = ChatData();
  const currentChat = messages;
  const chatContainerRef = useRef();
  useEffect(()=>{
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTo({top :chatContainerRef.current.scrollHeight,
        behavior : "smooth"
      })
    }
  },[messages]);
  async function handleSubmit(){
    await getResponse();
  }
  return (
    <div className='ChatComponent'>
      
      <div className="currentChat" ref= {chatContainerRef}>
      {!currChat && "Click 'New Chat' to start a new Chat..."}

      {currentChat && currentChat.length > 0  ? (currentChat.map((e, i)=>{
       return  <SingleChat question={e.question} answer={e.answer} key={i}  />
      })) : <> <br></br>{" Use The Search Bar below To search..."}</>}
           
      </div>
      {currChat && <>
      <div className="userChatInput">
        <textarea  value = {prompt} type="text" placeholder="Type a message to search" onChange={(e)=> setPrompt(e.target.value)} />
        <button disabled = {loading} onClick={handleSubmit}> {loading ? "Searching" : "Search"}</button>
      </div>
      </>}
    </div>
  )
}

export default Chat
