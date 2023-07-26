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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Select from "react-select";
import { getNames } from "country-list";

const defaultTheme = createTheme();
const countryNames = getNames();
const options = getNames().map((name) => ({ value: name, label: name }));
const UserForm = ({ onClick, handleUserFormSubmit }) => {
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [languagePreference, setLanguagePreference] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserFormSubmit({
      countryOfOrigin,
      languagePreference,
      birthdate,
      gender,
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
            User Information
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} zIndex="100">
                <div style={{ backgroundColor: "white", zIndex: 100 }}>
                  <Select
                    required
                    fullWidth
                    id="countryOfOrigin"
                    placeholder="Country of Origin"
                    label="Country of Origin"
                    name="countryOfOrigin"
                    options={options}
                    value={countryOfOrigin}
                    onChange={(e) => setCountryOfOrigin(e)}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                        },
                    })
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
                  value={languagePreference}
                  onChange={(e) => setLanguagePreference(e.target.value)}
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
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  InputLabelProps={{
                    shrink: true, // Label will always float above the input field
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Grid>
            </Grid>

            <Link to="/current-location" style={{ textDecoration: "none" }}>
              <Button
                type="submit"
                style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
                fullWidth
                variant="contained"
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

export default UserForm;
