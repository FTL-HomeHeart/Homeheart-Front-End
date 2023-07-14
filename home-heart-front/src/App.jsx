import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import LoginForm from './components/LoginForm/LoginForm'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/register" element={<RegistrationForm />} /> 
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<NavBar />} />
      </Routes>
     </Router>

     <Footer />
    </>
  )
}

export default App
