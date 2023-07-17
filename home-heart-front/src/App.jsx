import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
const BASE_URL = "http://localhost:3001";
import jwtDecode from "jwt-decode";
import AuthenticatedPage from "./components/AuthenticatedTemp/AuthenticatedTemp";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logginError, setLoginError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setLoggedIn(true);
      const userData = user ? JSON.parse(user) : null;
      setUser(userData);
    }
  }, []);

  // Login User when login button is clicked
  const handleLoginSubmit = async ({ identifier, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        const decodedToken = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", decodedToken.userId);
        const userData = {
          ...decodedToken,
          username: decodedToken.username,
          email: decodedToken.email,
          fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
        };
        console.log("userData:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        //Successful Login
        setLoggedIn(true);
        setLoginError("");
        // navigate("/");
        console.log("data message", data.message);
        console.log(loggedIn);
      } else {
        //Login failed
        setLoginError(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Register User when signup button is clicked
  const handleRegistrationSubmit = async ({
    username,
    email,
    password,
    firstName,
    lastName,
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        const decodedToken = jwtDecode(token);
        const userData = {
          ...decodedToken,
          username: decodedToken.username, // Assuming these fields are in the decoded token
          email: decodedToken.email,
          fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
        };
        localStorage.setItem("token", token);
        localStorage.setItem("userId", decodedToken.userId);
        console.log("userData:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        setLoggedIn(true);
        setLoginError("");
        // navigate("/");
        console.log(data.message);
      } else {
        setLoginError(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error is:", error);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={
              <RegistrationForm
                handleRegistrationSubmit={handleRegistrationSubmit}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginForm handleLoginSubmit={handleLoginSubmit} />}
          />
          <Route path="/" element={<NavBar />} />
          <Route path="/authenticated-page" element={<AuthenticatedPage />} />
        </Routes>
      </Router>

      <Footer />
    <Router>
      <Routes>
      <Route path="/register" element={<RegistrationForm />} /> 
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<NavBar />} />
      </Routes>
  </Router>
     <Footer />
</>
  );
}
export default App;