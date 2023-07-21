import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginForm from "./components/LoginForm/LoginForm";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
const BASE_URL = "http://localhost:3001";
import jwtDecode from "jwt-decode";
import AuthenticatedLandingPage from "./components/LandingPage/AuthenticatedLandingPage";
import UserForm from "./components/GetStartedPage/UserForm";
import CurrentLocationForm from "./components/GetStartedPage/CurrentLocationForm";
import MedicalProfessionalsGrid from "./components/MedicalProfessionalsGrid/MedicalProfessionalsGrid";
import ProfilePhoto from "./components/GetStartedPage/ProfilePhoto";

function App({ handleUserFormSubmit }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logginError, setLoginError] = useState("");
  const [welcomeUserMsg, setWelcomeUserMsg] = useState("");

  const theme = createTheme({
    direction: "rtl",
  });

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
  const handleLoginSubmit = async ({ identifier, password, navigate }) => {
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
        navigate("/home");
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
    navigate,
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
        console.log("user Data:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        setLoggedIn(true);
        setLoginError("");
        navigate("/");
        console.log(data.message);
      } else {
        setLoginError(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error is:", error);
    }
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
    setLoginError("");
    navigate("/");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {/* Have to be outside of Routes as it should render regardless */}
          <NavBar handleLogout={handleLogout} loggedIn={loggedIn} user={user} />
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? <AuthenticatedLandingPage /> : <LandingPage />
              }
            />

            <Route
              path="/register"
              element={
                loggedIn ? (
                  <Navigate to="/home" />
                ) : (
                  <RegistrationForm
                    handleRegistrationSubmit={handleRegistrationSubmit}
                  />
                )
              }
            />
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginForm handleLoginSubmit={handleLoginSubmit} />
                )
              }
            />

            {loggedIn ? (
              <Route path="/home" element={<AuthenticatedLandingPage />} />
            ) : (
              <Route path="/login" element={<LoginForm />} />
            )}

            <Route path="/user-form" element={<UserForm />} />
            <Route path="/current-location" element={<CurrentLocationForm />} />

            <Route path="/profile-photo" element={<ProfilePhoto />} />
            <Route
              path="/recommended_professionals"
              element={<MedicalProfessionalsGrid />}
            />
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </>
  );
}
export default App;
