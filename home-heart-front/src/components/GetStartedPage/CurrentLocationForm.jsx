import React, { useState } from "react";
import { CssBaseline, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TimezoneSelect from "react-timezone-select"; // Import TimezoneSelect component
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Select from "react-select";
import { getNames } from "country-list";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";
console.log("BASE_URL in userform:", BASE_URL);

const defaultTheme = createTheme();
const countryNames = getNames();
const options = getNames().map((name) => ({
  value: name,
  label: name,
  name: "country",
}));

const CurrentLocationForm = ({ handleLocationFormSubmit }) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("userId");

  const [userData, setUserData] = useState({
    country: null,
    city: "",
    state: "",
    streetAddress: "",
    timezone: "",
    postalCode: "",
    user_id: user_id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit userData :", userData);

    try {
      axios
        .put(
          `${BASE_URL}/api/update_user_information/second_form/${user_id}`,
          userData
        )
        .then((response) => {
          console.log("response:", response);
          navigate("/profile-photo");
        });
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleUserFormTextInputChange = (event) => {
    // console.log("EVENT:", event)
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    console.log("userdata changed:", userData);
  };

  const handlePreviousClick = () => {
    // Perform any actions you need when the "Previous" button is clicked
    // For example, you can navigate to the previous page or update the state accordingly.
    // For this example, I'll just log a message to the console.
    // console.log("Previous button clicked");
  };

  const handleSelectInputChange = (event) => {
    console.log(event);
    const { name, value } = event;
    setUserData({
      ...userData,
      [name]: value,
    });

    console.log("userdata changed:", userData);
  };

  const handleTimeZoneSelectInputChange = (event) => {
    const { label } = event;
    setUserData({
      ...userData,
      timezone: label,
    });

    console.log("userdata changed:", userData);
  };

  const timezoneOptions = [
    { value: "UTC", label: "Coordinated Universal Time (UTC)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  ];

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
            Current Location
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3, zIndex: 100 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} zIndex="100">
                <Select
                  required
                  fullWidth
                  id="country"
                  placeholder="Select a Country"
                  // label="Country"
                  name="country"
                  options={options}
                  value={{
                    label: userData.country || "Current Country",
                    value: userData.country,
                  }}
                  onChange={handleSelectInputChange}
                >
                  <MenuItem value="">Select a Country</MenuItem>
                  {countryNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  value={userData.state}
                  onChange={handleUserFormTextInputChange}
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                    }),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={userData.city}
                  onChange={handleUserFormTextInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetAddress"
                  label="Street Address"
                  name="streetAddress"
                  value={userData.streetAddress}
                  onChange={handleUserFormTextInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="postalCode"
                  value={userData.postalCode}
                  onChange={handleUserFormTextInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TimezoneSelect
                    value={{
                      label: userData.timezone,
                      value: userData.timezone,
                    }}
                    onChange={handleTimeZoneSelectInputChange}
                    placeholder="Select a Timezone"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={4} marginTop={1}>
              <Grid item xs={6}>
                <Link to="/user-form" style={{ textDecoration: "none" }}>
                  <Button
                    type="submit"
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
                <Button
                  type="submit"
                  style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CurrentLocationForm;
