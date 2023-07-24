import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const defaultTheme = createTheme();

export default function RegistrationForm({ handleRegistrationSubmit }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  // const [passwordError, setPasswordError] = useState(false);
  // const [emailError, setEmailError] = useState(false);
  // const [numericError, setNumericError] = useState(false);

  const defaultTheme = createTheme();

  const CopyRight = () => {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="">
          HomeHeart
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
      </Container>
    </ThemeProvider>
  );
}
