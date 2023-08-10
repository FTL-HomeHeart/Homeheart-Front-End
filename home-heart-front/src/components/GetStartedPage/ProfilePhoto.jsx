import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
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
  Card,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovingComponent from "react-moving-text";

const defaultTheme = createTheme();

const ProfilePhoto = () => {
  const id = localStorage.getItem("userId");
  console.log("USER id FROM Profle photo", id);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleAvatarClick = () => {
    document.getElementById("profilePhotoInput").click();
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
      >
        <MovingComponent
          type="spin"
          duration="1200ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none"
        >
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 3,
              backgroundColor: '#7E9BB6',
              borderRadius: 2.5,
              height: 500,
              width: 400,
              color: '#FFFFFF', // Text color
              // '&:hover': {
              //   cursor: 'pointer',
              //   backgroundColor: 'grey', // Hover color
              //   color: 'red', // Hover text color
              // },
            }}
          >
            <Avatar
              onClick={handleAvatarClick}
              src={profilePhoto ? URL.createObjectURL(profilePhoto) : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}
              alt="Avatar"
              sx={{
                m: 1,
                bgcolor: '#7E9BB6',
                width: 130,
                height: 130,
                fontSize: '60px',
              }}
            >
              <AccountCircleIcon sx={{ fontSize: '60px' }} />
            </Avatar>
            <Typography component="h1" variant="h5" color="white">
              Profile Photo
            </Typography>

            <Typography component="h1" variant="h6" color="white" style={{ marginTop: '40px', fontStyle: 'italic' }}  >
              Click the icon to add a profile photo, and personalize your account to help others recognize you!
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <input
                    type="file"
                    id="profilePhotoInput"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={(e) => {
                      setProfilePhoto(e.target.files[0]);
                      // Revoke the previous URL, if any
                      if (e.target.files[0]) {
                        URL.revokeObjectURL(profilePhoto);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </MovingComponent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Link to="/current-location" style={{ textDecoration: "none" }}>
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
                onClick={() => {window.location.href = `/recommended_professionals/${id}`}}
                style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {profilePhoto ? "Submit and Finish" : "Skip"}
              </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </ThemeProvider>
  );
};

export default ProfilePhoto;


