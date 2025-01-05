import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.svg";
import MenuIcon from '@mui/icons-material/Menu';
import {ChatData} from './Context/ChatContext'
const SideBar = () => {
  const [showSidebar, toggleSidebar] = useState(false);
  const {chats,createNew, createNewChat,currChat, setCurrentChat} = ChatData();
  useEffect(()=>{
   if(window.innerWidth <= 800){
    toggleSidebar(true);
   }else{
    toggleSidebar(false);
   }
  }, [])
  if(showSidebar){
       return (
        <button onClick={()=>toggleSidebar(!showSidebar)}>
        <MenuIcon ></MenuIcon>
        </button>
       )
  }else{
  return (
    
    <div className='SideBarComponent'>  
    <div className="appLogo">
       <img  src={logo} alt="" /> <span>ChatMate</span>
    </div>
       <hr />
    <div className="sideBarChat">
      <button onClick={createNewChat}> {createNew ? "creating new chat..." : "create New Chat"}</button>
      <div className="chats">
        <h3>Recent Chats</h3>
        <div className="recentChatDisplay">
          {chats && chats.length > 0 ?  (chats.map((e,i)=>(
             <button key = {i} onClick={()=>setCurrentChat(e._id)}> 
             <span>{e.tittle}...</span>
             <span>de</span>
             </button>
          )
          )) :<p>No Recent Chats</p>}
          
        </div>
        <button id='logoutBtn'>Log Out</button>
      </div>
    </div>
          </div>
  )
}
}

export default SideBar
