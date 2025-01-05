
import { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import server from '../../server';
import toast from 'react-hot-toast';
import axios from 'axios';
const UserContext = createContext();
export const UserProvider = ({children})=>{
    const [btnLoading, setBtnLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    async function UserLogin(email, password, navigate){
        setBtnLoading(true);
        try{
            const response = await axios.get(`${server}/login`, {
                params:{
                    email : email,
                    password: password
                }
                
            });
            const token = response.data.token;
              localStorage.setItem('token', token);
              navigate('/');
               toast.success("Login Successfull");
               setIsAuth(true);
               setBtnLoading(false);
          }catch(err){
              toast.error("Invalid Credintials, try again");
              navigate('/login');
              setBtnLoading(false);
            }
    };
    async function UserRegister(name, email, password, navigate){
        setBtnLoading(true);
        try{ 
            const response = await axios.post(`${server}/signUp`, 
              {
                name: name,
                email: email,
                password: password
              }, 
              {
                headers: {
                  'Content-Type': 'application/json',
                }
              }
            );
            const token = response.data.token;
            localStorage.setItem('token', token);
            setIsAuth(true);
          toast.success("SignUp Successfull");
          setBtnLoading(false);
            navigate('/');
            
        }catch(err){
            toast.error("Invalid Credintials, try again");
            setBtnLoading(false);
            navigate('/signUp');
        }
        
    };
     function UserLogOut(navigte){
          localStorage.removeItem("token");
          setIsAuth(false);
          navigte("/login");
    }
    async function verifyUser(){
        const token = localStorage.getItem('token');
        if(token){
          try{
          const response = await fetch(`${server}/verify?token=${token}`);
          setIsAuth(true);
        }catch(err){
            setIsAuth(false);
        }
        }
      };
    useEffect(()=>{
      verifyUser();
    }, []);
    return (
        
        <UserContext.Provider value = {{UserLogin, btnLoading, UserRegister, verifyUser, isAuth, setIsAuth, UserLogOut}}>{children}</UserContext.Provider>
    );
}
export const UserData = ()=> useContext(UserContext);