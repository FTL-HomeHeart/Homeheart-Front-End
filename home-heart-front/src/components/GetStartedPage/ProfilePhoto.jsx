import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Link} from "react-router-dom";
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

const defaultTheme = createTheme();

const ProfilePhoto = ({ handleLocationFormSubmit }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLocationFormSubmit({
      profilePhoto,
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
            Profile Photo 🙂
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={(e) => setProfilePhoto(e.target.files[0])} // Updating state with the selected image
                />
              </Grid>
            </Grid>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
                sx={{ mt: 3, mb: 2 }}
              >
                Skip, and finish later.
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePhoto;
