import React, { useState } from "react";
import { CssBaseline, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
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
                <TextField
                  required
                  fullWidth
                  id="timezone"
                  label="Timezone"
                  name="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                />
              </Grid>
            </Grid>
            <Link to="/profile-photo" style={{ textDecoration: "none" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CurrentLocationForm;
