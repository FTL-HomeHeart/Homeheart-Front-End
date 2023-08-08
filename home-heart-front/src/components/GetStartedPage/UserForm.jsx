import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Select from "react-select";
import { getNames } from "country-list";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";
const defaultTheme = createTheme();
const countryNames = getNames();
const options = getNames().map((name) => ({
  value: name,
  label: name,
  name: "countryOfOrigin",
}));
const UserForm = ({ handleUserFormSubmit }) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("userId");

  const [userData, setUserData] = useState({
    countryOfOrigin: null,
    languagePreference: "",
    birthdate: "",
    gender: "",
    user_id: user_id,
  });

  const handleUserFormTextInputChange = (event) => {
    // console.log("EVENT:", event)
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    // console.log("userdata changed:", userData)
  };

  const handlePreviousClick = () => {
    // Perform any actions you need when the "Previous" button is clicked
    // For example, you can navigate to the previous page or update the state accordingly.
    // For this example, I'll just log a message to the console.
    // console.log("Previous button clicked");
  };

  const handleSelectInputChange = (event) => {
    const { name, value } = event;
    setUserData({
      ...userData,
      [name]: value,
    });

    // console.log("userdata changed:", userData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // console.log(
      //   "userData:",
      //   userData
      // )

      // Assuming you have the user's ID stored in a variable called "userId"

      // console.log("data from user:", userData);
      // Make a PUT request to the backend API to update the user data
      const response = axios
        .put(
          `${BASE_URL}/api/update_user_information/first_form/${user_id}`,
          userData
        )
        .then((response) => {
          // console.log("Response from backend:", response.data);
          navigate("/current-location");
        });
      // Move to the next step
      // handleUserFormSubmit(userData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // console.log("Response from backend:", response.data);
  // console.log("data from user:", userData);
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
          // onSubmit={handleSubmit}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            User Information
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} zIndex="200">
                <div style={{ backgroundColor: "white", zIndex: 100 }}>
                  <Select
                    required
                    fullWidth
                    id="countryOfOrigin"
                    placeholder="Country of Origin"
                    name="countryOfOrigin"
                    options={options}
                    value={{
                      label: userData.countryOfOrigin || "Country of Origin",
                      value: userData.countryOfOrigin,
                    }}
                    onChange={handleSelectInputChange}
                    // Custom styles for the react-select component
                    styles={{
                      // To set a fixed width for the control (main input field)
                      control: (provided) => ({
                        ...provided,
                        minWidth: 200, // Adjust the value according to your needs
                      }),
                      // To set a fixed width for the dropdown menu
                      menu: (provided) => ({
                        ...provided,
                        minWidth: 200, // Adjust the value according to your needs
                      }),
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="languagePreference"
                  label="Language Preference"
                  name="languagePreference"
                  value={userData.languagePreference}
                  onChange={handleUserFormTextInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="birthdate"
                  label="Birthdate" // Provide the "Birthdate" label here
                  name="birthdate"
                  type="date"
                  value={userData.birthdate}
                  onChange={handleUserFormTextInputChange}
                  InputLabelProps={{
                    shrink: true, // Label will always float above the input field
                  }}
                />
              </Grid>
              <Grid item xs={12} zIndex="100">
                <FormControl fullWidth>
                  <TextField
                    select
                    required
                    id="gender"
                    label="Gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleUserFormTextInputChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button
                    style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Previous
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                {/* <Link to="/current-location" style={{ textDecoration: 'none' }}> */}
                <Button
                  type="submit"
                  style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Next
                </Button>
                {/* </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserForm;
