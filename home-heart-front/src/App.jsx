import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginForm from "./components/LoginForm/LoginForm";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AuthenticatedLandingPage from "./components/LandingPage/AuthenticatedLandingPage";
import UserForm from "./components/GetStartedPage/UserForm";
import CurrentLocationForm from "./components/GetStartedPage/CurrentLocationForm";
import MedicalProfessionalsGrid from "./components/MedicalProfessionalsGrid/MedicalProfessionalsGrid";
import ProfilePhoto from "./components/GetStartedPage/ProfilePhoto";
import MedicalProfessionalDetailedView from "./components/MedicalProfessionalDetailedView/MedicalProfessionalDetailedView";
import SavedMedicalProfessionals from "./components/SavedMedicalProfessionals/SavedMedicalProfessionals";
import BookAppointment from "./components/AppointmentScheduling/BookAppointment";
import { Box } from "@mui/material";
import UpcomingAppointments from "./components/AppointmentConfirmed/UpcomingAppointment";
import AppointmentConfirmed from "./components/AppointmentConfirmed/AppointmentConfirmed";
import AdditionalResourcesPage from "./components/AdditionalResourcesPage/AdditionalResourcesPage";
import PrivateRoute from "./PageContainer";
import AboutUs from "./components/AboutUs/AboutUs";
import NotFound from "./components/NotFound/NotFound";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logginError, setLoginError] = useState("");

    // State for userData
    const [userData, setUserData] = useState({});

    // Function to update userData state
    const handleUserDataUpdate = (newUserData) => {
      setUserData(newUserData);
    };


  const [userSavedMedicalProfessionals, setUserSavedMedicalProfessionals] =
    useState([]);

  const theme = createTheme({
    direction: "rtl",
    palette: {
      primary_color: {
        main: "#7693B0",
      },
      secondary_color: {
        main: "#3f474f",
      },
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const userData = localStorage.getItem("userData");
    if (token && user) {
      setLoggedIn(true);
      const userData = user ? JSON.parse(user) : null;
      setUser(userData);
    }
  }, []);

  // Register User when signup button is clicked

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar
            loggedIn={loggedIn}
            user={user}
            setLoggedIn={setLoggedIn}
            setUser={setUser}
            setLoginError={setLoginError}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <AuthenticatedLandingPage user={user} userData={userData} />
                  ) : (
                    <LandingPage />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  loggedIn ? (
                    <Navigate to="/home" />
                  ) : (
                    <RegistrationForm
                      setUser={setUser}
                      user={user}
                      setLoginError={setLoginError}
                      setLoggedIn={setLoggedIn}
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
                    <LoginForm
                      setUser={setUser}
                      user={user}
                      setLoginError={setLoginError}
                      setLoggedIn={setLoggedIn}
                      setUserData={handleUserDataUpdate} // Pass the function to LoginForm
                    />
                  )
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <AuthenticatedLandingPage user={user} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-form"
                element={
                  <PrivateRoute>
                    <UserForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/current-location"
                element={
                  <PrivateRoute>
                    <CurrentLocationForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile-photo"
                element={
                  <PrivateRoute>
                    <ProfilePhoto />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recommended_professionals/:id"
                element={
                  <PrivateRoute>
                    <MedicalProfessionalsGrid
                      userSavedMedicalProfessionals={
                        userSavedMedicalProfessionals
                      }
                      setUserSavedMedicalProfessionals={
                        setUserSavedMedicalProfessionals
                      }
                      user={user}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/saved_medical_professionals/:id"
                element={
                  <PrivateRoute>
                    <SavedMedicalProfessionals />
                  </PrivateRoute>
                }
              />
              <Route
                path="/professional_details/:id"
                element={
                  <PrivateRoute>
                    <MedicalProfessionalDetailedView
                      userSavedMedicalProfessionals={
                        userSavedMedicalProfessionals
                      }
                      setUserSavedMedicalProfessionals={
                        setUserSavedMedicalProfessionals
                      }
                      user={user}
                    />
                  </PrivateRoute>
                }
              />

              <Route
                path="/recommendations/:id"
                element={
                  <PrivateRoute>
                    <MedicalProfessionalsGrid
                      userSavedMedicalProfessionals={
                        userSavedMedicalProfessionals
                      }
                      setUserSavedMedicalProfessionals={
                        setUserSavedMedicalProfessionals
                      }
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book_appointment/:professionalId"
                element={
                  <PrivateRoute>
                    <BookAppointment />
                  </PrivateRoute>
                }
              />
              <Route
                path="/upcoming_appointments/:id"
                element={
                  <PrivateRoute>
                    <UpcomingAppointments />
                  </PrivateRoute>
                }
              />
              <Route
                path="/appointment_confirmed"
                element={
                  <PrivateRoute>
                    <AppointmentConfirmed />
                  </PrivateRoute>
                }
              />

              <Route path="/resources" element={<AdditionalResourcesPage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/AboutUs" element={<AboutUs />} />
            </Routes>
          </Box>
        </Router>
        <Footer />
      </ThemeProvider>
    </>
  );
}
