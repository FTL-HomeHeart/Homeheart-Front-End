import React, { useState } from "react";
import { CssBaseline, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

import jwtDecode from "jwt-decode";
const defaultTheme = createTheme();

export default function RegistrationForm({
  setLoggedIn,
  setUser,
  setLoginError,
  user,
}) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const defaultTheme = createTheme();

  const backgroundImageUrl = "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2706&q=80";

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
        localStorage.setItem("userData", ""); 
        localStorage.setItem("userLoggedInBefore", "true");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors({});

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Invalid email format!",
      }));
      return;
    }

    // Checks password length
    if (password.length < 8) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password must be at least 8 characters long.",
      }));
      return;
    }

    // Checks if first name, last name, and username contain numbers
    if (/\d/.test(firstName) || /\d/.test(lastName) || /\d/.test(username)) {
      setErrors((prevState) => ({
        ...prevState,
        numeric: "First name, last name, and username cannot contain numbers.",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // Perform registration logic
    handleRegistrationSubmit({
      username,
      email,
      firstName,
      lastName,
      password,
    });
    setErrors({});
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
           elevation={20}
           sx={{
             position: "absolute",
             top: "50%",
             left: "50%",
             transform: "translate(-50%, -50%)",
             p: 4,
             backgroundSize: "cover",
             backgroundPosition: "center",
             backgroundColor: "#FFFFFF",
             width: "30%",
             marginTop: "4vh",
           }}
          >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates about appointments and articles via email."
                />
              </Grid>
            </Grid>

            {errors.email && (
              <Typography color="error">{errors.email}</Typography>
            )}

            {errors.password && (
              <Typography color="error">{errors.password}</Typography>
            )}

            {errors.numeric && (
              <Typography color="error">{errors.numeric}</Typography>
            )}

            {errors.confirmPassword && (
              <Typography color="error">{errors.confirmPassword}</Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid sx={{ mt: 1, mb: 2 }} container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Paper>
      </Container>
    </ThemeProvider>
    </Paper>
  );
}
