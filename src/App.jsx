import './styles/app.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Hearder from './components/Hearder'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { Context, server } from './main'
import Footer from './components/Footer'

const App = () => {
  const { setUser, setIsAuthenticated ,setLoading} = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/users/me`, {
      withCredentials: true,
    }).then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    })

  }, [])

  return (

    <Router>
      <Hearder />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Toaster />
      <Footer />
    </Router>
  )
}

export default App
