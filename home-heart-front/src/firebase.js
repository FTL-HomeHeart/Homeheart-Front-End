import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};




const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = ({ setLoggedIn, setUser }) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const GoogleName = result.user.displayName;
      const GoogleEmail = result.user.email;
      const GoogleAvatar = result.user.photoURL;

      // Send the user data to the backend
      fetch(`${BASE_URL}/api/auth/googleauth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: GoogleName,
          email: GoogleEmail,
          avatar: GoogleAvatar,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          if (data.message === "User authenticated successfully") {
            setLoggedIn(true);
            setUser({
              firstName: GoogleName,
              email: GoogleEmail,
              avatar: GoogleAvatar,
            });
            // Store the token and user data in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem(
              "user",
              JSON.stringify({
                userId: data.userId,
                firstName: GoogleName,
                email: GoogleEmail,
                avatar: GoogleAvatar,
              })
            );
          } else {
            navigate("register");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
};
