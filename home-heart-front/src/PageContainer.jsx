// import React, { useEffect } from "react";
// import { useLocation, Routes, Route, Navigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
// import NavBar from "./components/NavBar/NavBar";
// import LandingPage from "./components/LandingPage/LandingPage";
// import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
// import LoginForm from "./components/LoginForm/LoginForm";
// import AuthenticatedLandingPage from "./components/LandingPage/AuthenticatedLandingPage";
// import Footer from "./components/Footer/Footer";

// const BASE_URL = "http://localhost:3001";
// export default function PageContainer({
//   checkUserAuthStatus,
//   loggedIn,
//   user,
//   logginError,
//   loading,
//   setLoggedIn,
//   setUser,
//   setLoginError,
//   setLoading,
// }) {
//   const location = useLocation();

//   useEffect(() => {
//     checkUserAuthStatus(location);
//   }, [location]);

//   const handleLoginSubmit = async ({ identifier, password }) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           identifier,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const token = data.token;
//         const decodedToken = jwtDecode(token);
//         localStorage.setItem("token", token);
//         localStorage.setItem("userId", decodedToken.userId);
//         const userData = {
//           ...decodedToken,
//           username: decodedToken.username,
//           email: decodedToken.email,
//           fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
//         };
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);
//         setLoggedIn(true);
//         setLoginError("");
//         setLoading(false);
//       } else {
//         setLoginError(data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleRegistrationSubmit = async ({
//     username,
//     email,
//     password,
//     firstName,
//     lastName,
//   }) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           firstName,
//           lastName,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const token = data.token;
//         const decodedToken = jwtDecode(token);
//         const userData = {
//           ...decodedToken,
//           username: decodedToken.username,
//           email: decodedToken.email,
//           fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
//         };
//         localStorage.setItem("token", token);
//         localStorage.setItem("userId", decodedToken.userId);
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);

//         setLoggedIn(true);
//         setLoginError("");
//       } else {
//         setLoginError(data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setLoggedIn(false);
//     setUser(null);
//     setLoginError("");
//   };

//   return (
//     <>
//       <NavBar handleLogout={handleLogout} loggedIn={loggedIn} user={user} />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route
//           path="/register"
//           element={
//             loading ? (
//               <div>Loading...</div>
//             ) : loggedIn ? (
//               <Navigate to="/home" />
//             ) : (
//               <RegistrationForm
//                 handleRegistrationSubmit={handleRegistrationSubmit}
//               />
//             )
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             loading ? (
//               <div>Loading...</div>
//             ) : loggedIn ? (
//               <Navigate to="/home" />
//             ) : (
//               <LoginForm handleLoginSubmit={handleLoginSubmit} />
//             )
//           }
//         />
//         <Route
//           path="/home"
//           element={
//             loading ? (
//               <div>Loading...</div>
//             ) : loggedIn ? (
//               <AuthenticatedLandingPage />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//       <Footer />
//     </>
//   );
// }
