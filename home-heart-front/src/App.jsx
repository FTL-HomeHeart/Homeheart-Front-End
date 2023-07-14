import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/register" element={<RegistrationForm />}></Route>
      <Route path="/" element={<NavBar />}></Route>
      </Routes>
     </Router>

     <Footer />
    </>
  )
}

export default App
