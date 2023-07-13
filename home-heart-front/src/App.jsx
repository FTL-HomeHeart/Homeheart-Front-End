import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/register" element={<RegistrationForm />}></Route>

      </Routes>
     </Router>
    </>
  )
}

export default App
