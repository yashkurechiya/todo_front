import {  useState } from 'react'
import ReactDOM from "react-dom/client"
 
import React from 'react';
import { createContext } from "react";

import App from './App.jsx'


export const server = "https://todo-back-wzlw.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false })


const AppWrapper = () => {
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const [loading, setLoading]= useState(false);
  const [user, setUser] = useState({});


  return (
    <Context.Provider
    value={{
      isAuthenticated,
      setIsAuthenticated,
      loading,
      setLoading,
      user,
      setUser
    }} >
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
