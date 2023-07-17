import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#fff",
    color: "#333",
  },
  title: {
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    "& > *": {
      margin: theme.spacing(0, 2),
      fontWeight: "bold",
      color: "#666",
    },
  },
  avatar: {
    backgroundColor: "#f50057",
  },
}));

const NavBar = ({ loggedIn, handleLogout, user }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          HomeHeart
        </Typography>
        <div className={classes.navLinks}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/AboutUs">
            About Us
          </Button>
          <Button color="inherit" component={Link} to="/ContactUs">
            Contact Us
          </Button>
          <Button color="inherit" component={Link} to="/Appointments">
            Appointments
          </Button>
          <Button color="inherit" component={Link} to="/Resources">
            Resources
          </Button>
        </div>
        {loggedIn ? (
          <>
            <IconButton color="inherit" aria-label="User Account">
              <Avatar></Avatar>
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
