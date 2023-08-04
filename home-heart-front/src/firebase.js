import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRopIlNCvlc1pNAI4n8E0444hcGLJU26s",
  authDomain: "homeheartauth.firebaseapp.com",
  projectId: "homeheartauth",
  storageBucket: "homeheartauth.appspot.com",
  messagingSenderId: "598318748633",
  appId: "1:598318748633:web:bb588d8b5b742642227fc8",
  measurementId: "G-CYKB82DKW7",
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
      fetch("http://localhost:3001/api/auth/googleauth", {
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
