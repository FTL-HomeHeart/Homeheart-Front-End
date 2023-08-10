import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import MovingComponent from "react-moving-text";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  media: {
    height: 600,
    backgroundSize: "cover",
    backgroundPosition: "50% 80%",
  },
  overlay: {
    position: "absolute",
    right: theme.spacing(25),
    top: theme.spacing(10),
    bottom: theme.spacing(10),
    width: "35%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: theme.spacing(4),
  },
  overlayText: {
    marginBottom: theme.spacing(2),
    fontSize: "70px",
  },
  button: {
    alignSelf: "start",
  },
  // add blurry effect on the overlay
}));

export default function ImageCardGetStarted({ user }) {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  const [userDataID, setUserDataID] = useState(null);

  useEffect(() => {
    // Fetch globalUserData here (if needed)
    const globalUserData = localStorage.getItem("userData"); 
    const userID = localStorage.getItem('userId');
    setUserDataID(userID);
    setUserData(globalUserData);
    console.log(globalUserData);
  }, []);

  console.log("userData:", userData)
  const showGetStartedButton = userData ? true : false;
  
  return (

    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2706&q=80"
        title="Contemplative Reptile"
      />
      <div className={classes.overlay}>
        <Typography variant="body1" component="p" className={classes.overlayText}>
          <MovingComponent
            type="fadeInFromTop"
            duration="1200ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            Welcome {user.firstName}!
          </MovingComponent>
        </Typography>
        {!showGetStartedButton ? (
        // Show the "Get Started" button when showGetStartedButton is true
        <RouterLink to="/user-form">
          <Button
            variant="contained"
            style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
            className={classes.button}
          >
            Get Started!
          </Button>
        </RouterLink>
      ) : (
          <Button
            variant="contained"
            style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
            className={classes.button}
            component={RouterLink}
            to={`/recommendations/${userDataID}`}
          >
            See Mental Health Professionals
          </Button>
      )}
      </div>
    </Card>
  );
}