import { useEffect, useState } from "react";
import {createContext, useContext } from "react";
import toast from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import server from '../../server';
import { UserData } from "./UserContext";
const genAI = new GoogleGenerativeAI("AIzaSyAwPJIcVh1YoBG2GrRaw5dVBYn14OYwjOU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const ChatContext = createContext();

export const ChatProvider = ({children})=>{
    const {isAuth} = UserData();
    const [messages, setMessage] = useState([]);
    const [prompt, setPrompt]   = useState("");
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [createNew, setCreateNew] = useState(false);
    const [currChat, setCurrentChat] = useState(null);
    const [messageLoading, setMessageLoading] = useState(false);
    async function getResponse(){
        if(prompt ===""){
            return toast.error("Please enter a message");
        }
        setLoading(true);
      try{
         const result  = await model.generateContent(prompt);
         const data = result.response.text();
         const message = {
                question : prompt,
                answer : data,
         }
         setMessage((prev)=>[{...prev}, message]);
         setPrompt("");
         setLoading(false);
         const response = await axios.get(`${server}/chats/new/${currChat}`, {
            params: {
              question: prompt,
              answer: data,
            },
            headers: {
              token: localStorage.getItem("token"),
            },
          });
                    
          setChats(response.data.data.chats);
      }
      catch(err){
            toast.error("An error occurred, please try again"); 
            setPrompt("");
            setMessage(false);
      }
    }
    async function getChats(){
         try{
             const response = await axios.get(`${server}/chats/all`, {
                headers:{
                    token: localStorage.getItem('token'),
                },
             });
             setChats(response.data.data.chats);
         }
         catch(err){
            toast.error("Error Getting Chats , Please try again");
         }
    }
    async function createNewChat(){
        setCreateNew(true);
        try{
            const {data} = await axios.post(`${server}/chats/new`, {}, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            });
             setChats(data.data);
             setCurrentChat(data.data[0]._id)
        }catch(err){
              toast.error("Error Creating Chat, Please try again");
        }
        setCreateNew(false);
    }
    async function getMessages(){
        if(currChat == null){
            return ;
        }
           setMessageLoading(true);
           try{
                  const {data} = await axios.get(`${server}/chats/all/${currChat}`, {
                    headers:{
                        token: localStorage.getItem("token"),
                    }
                  });
                  setMessage(data.data.chat);

           }catch(err){
                toast.error("Error fetching Messages");
           }
           setMessageLoading(false);
    }
    useEffect(()=>{
       
        getChats();
        
    }, []);
    useEffect(()=>{
        if(isAuth){
       getMessages();
        }
    }, [currChat])
    return <ChatContext.Provider value = {{getResponse,messages,prompt, setPrompt, loading, chats,createNew, createNewChat, currChat, setCurrentChat}}>{children}</ChatContext.Provider>
}

export const ChatData =  () => useContext(ChatContext);