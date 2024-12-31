import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './components/Context/UserContext.jsx'
createRoot(document.getElementById('root')).render(
   <>
  <UserProvider>
    <App />
    </UserProvider>
    <Toaster/>
    </>

)
