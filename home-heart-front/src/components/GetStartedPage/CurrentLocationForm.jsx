import React, { useState } from "react";
import { CssBaseline, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TimezoneSelect from "react-timezone-select"; // Import TimezoneSelect component
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

const defaultTheme = createTheme();
const countryNames = getNames();
const options = getNames().map((name) => ({ value: name, label: name }));

const CurrentLocationForm = ({ handleLocationFormSubmit }) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [timezone, setTimezone] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLocationFormSubmit({
      country,
      city,
      state,
      streetAddress,
      timezone,
      postalCode,
    });
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
          <Box component="form" noValidate sx={{ mt: 3, zIndex:100 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} zIndex="100">
                <Select
                  required
                  fullWidth
                  id="country"
                  placeholder="Select a Country"
                  label="Country"
                  name="country"
                  options={options}
                  value={country}
                  onChange={(e) => setCountry(e)}
                  styles={{
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                  })}}
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetAddress"
                  label="Street Address"
                  name="streetAddress"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
            <FormControl fullWidth>
              <TimezoneSelect
                value={timezone}
                onChange={(tz) => setTimezone(tz.value)}
                placeholder="Select a Timezone"
              />
            </FormControl>
          </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link to="/user-form" style={{ textDecoration: 'none' }}>
                <Button
                  type="submit"
                  style={{ backgroundColor: '#7E9BB6', color: '#ffffff' }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Previous
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/profile-photo" style={{ textDecoration: 'none' }}>
                <Button
                  type="submit"
                  style={{ backgroundColor: '#7E9BB6', color: '#ffffff' }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Next
                </Button>
              </Link>
            </Grid>
          </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CurrentLocationForm;
