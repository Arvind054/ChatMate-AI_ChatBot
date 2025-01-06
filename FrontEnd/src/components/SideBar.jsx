import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.svg";
import {ChatData} from './Context/ChatContext'
import DeleteIcon from '../assets/DeleteIcon.svg'
import { UserData } from './Context/UserContext';
import {useNavigate} from 'react-router-dom';
import menuBar from '../assets/menuBar.svg'
import closeIcon from '../assets/closeIcon.svg'
const SideBar = () => {
  const {chats,createNew, createNewChat,currChat, setCurrentChat, deleteChat} = ChatData();
  const {UserLogOut} = UserData();
  const [showSideabar, setShowSidebar] = useState(true);
  const [minScreen, setminScreen] = useState(false);
  const styles = { zIndex: 1, width: '100%' };
    const navigate = useNavigate();
  
  async function handelDelete(chatId){
     await deleteChat(chatId);
  }
useEffect(()=>{
 if(window.innerWidth < 800){
   setShowSidebar(false);
   setminScreen(true);
 }else{
  setShowSidebar(true);
  setminScreen(false);
 }
},[]);
  if(!showSideabar){
    return (
      <button className='showMenuBarBtn' onClick={()=>{setShowSidebar(true)}}> 
        <img src={menuBar} alt="img not" />
        </button>
        
    )
  }else{
  return (
    <div className='SideBarComponent' style={minScreen ? styles : undefined}>  
    <div className="appLogo">
       <img  src={logo} alt="" /> <span>ChatMate</span> {minScreen ? <button onClick={()=>{setShowSidebar(false)}} className='closeIconbtn'><img src={closeIcon} alt="" /></button> : ""}
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
            <span className='chatDel' onClick={()=>handelDelete(e._id)}> <img src={DeleteIcon} alt="" className='deleteBtn'  /></span>
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
