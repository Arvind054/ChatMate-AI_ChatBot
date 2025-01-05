import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.svg";
import MenuIcon from '@mui/icons-material/Menu';
import {ChatData} from './Context/ChatContext'
import DeleteIcon from '../assets/DeleteIcon.svg'
import { UserData } from './Context/UserContext';
import {useNavigate} from 'react-router-dom';
const SideBar = () => {
  const [showSidebar, toggleSidebar] = useState(false);
  const {chats,createNew, createNewChat,currChat, setCurrentChat, deleteChat} = ChatData();
  const {UserLogOut} = UserData();
    const navigate = useNavigate();
  useEffect(()=>{
   if(window.innerWidth <= 800){
    toggleSidebar(true);
   }else{
    toggleSidebar(false);
   }
  }, []);
  async function handelDelete(chatId){
     await deleteChat(chatId);
  }
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
            <div className="sidebarSingleChat" key = {i}>
             <button  onClick={()=>setCurrentChat(e._id)}> 
             <span>{e.tittle.slice(0, 20)}...</span>
             </button>
            <button onClick={()=>handelDelete(e._id)}> <img src={DeleteIcon} alt="" className='deleteBtn'  /></button>
            </div>
          )
          )) :<p>No Recent Chats</p>}
          
        </div>
        <button id='logoutBtn' onClick={()=> UserLogOut(navigate)}>Log Out</button>
      </div>
    </div>
          </div>
  )
}
}

export default SideBar
