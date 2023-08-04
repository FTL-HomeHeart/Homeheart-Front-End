import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { CssBaseline, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Text from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ImageCard from "../LandingPage/Hero";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const BASE_URL = "http://localhost:3001";

const backgroundImageUrl = "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2706&q=80";

export default function LoginForm({
  user,
  setUser,
  setLoggedIn,
  setLoginError,
  setUserData, 
  // setUserData, //userData prop
}) {
  const defaultTheme = createTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  // const [user, setUser] = useState(null);
  // const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    // const userData = localStorage.getItem("userData");
    if (token && user) {
      setLoggedIn(true);
      // const userDataFromStorage = userData ? JSON.parse(userData) : null;
      setUser(JSON.parse(user));
      // setUserData(userDataFromStorage);
      // localStorage.setItem("userLoggedInBefore", "true");
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
        // localStorage.setItem("token", token);
        // localStorage.setItem("userId", decodedToken.userId);
        // localStorage.setItem("userData", JSON.stringify(userData)); // Save userData to local storage
        setUserData(userData);

        console.log(userData);
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


  const handleSignIn = (e) => {
    e.preventDefault();
    handleLoginSubmit({
      identifier: username,
      identifier: email,
      password,
    });
    
useEffect(() => {
  if (password !== "correctPassword") {
    setPasswordError(true);
    return;
  } else {
    setPasswordError(false);
    handleSignIn({ email, password });
  }
});

  };

  const handleGoogleLogin = () => {
    // Redirect the user to the Google login page
    window.location.href = "http://localhost:3001/auth/google";
  };
  return (
    <Paper
      elevation={0} // Set elevation to 0 to remove the shadow
      sx={{
        p: 4,
        mt: 8,
        backgroundImage: `url(${backgroundImageUrl})`, // Use the URL as the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "", // This will make the image fixed and cover the whole screen
        height: "100vh", // Set the height to full viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1vh",
      }}
    >
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <Paper
            elevation={20} // Set elevation to 0 to remove the shadow
            sx={{
              p: 4,
              mt: 8,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#ffffff",
              marginTop: "-23vh",
            }}
          >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSignIn}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email or Username"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <Typography color="error">Incorrect password!</Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
              sx={{ mt: 3, mb: 6 }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
              sx={{ mb: 4 }}
              onClick={handleGoogleLogin}
            >
              Sign In with Google
            </Button>
          </Box>
          <Text sx={{ mt: 1, mb: 2 }}>
            Don't have an account? <Link href="/register">Register</Link>
          </Text>
        </Box>
        </Paper>
      </Container>
    </ThemeProvider>
   </Paper>
  );
}
