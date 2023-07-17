// import React, { useState } from "react";

// export default function RegisterationHandler() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const handleRegistrationSubmit = async ({
//     username,
//     email,
//     password,
//     firstName,
//     lastName,
//     navigate,
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
//           username: decodedToken.username, // Assuming these fields are in the decoded token
//           email: decodedToken.email,
//           //   fullName: `${decodedToken.firstName} ${decodedToken.lastName}`,
//         };
//         localStorage.setItem("token", token);
//         localStorage.setItem("userId", decodedToken.userId);
//         // console.log("userData:", userData);
//         // localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);

//         setLoggedIn(true);
//         // setLoginError("");
//         navigate("/");
//         console.log(data.message);
//       } else {
//         setLoginError(data.message);
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.error("Error is:", error);
//     }
//   };
//   return <div>RegisterationHandler</div>;
// }
// // Register User when signup button is clicked
