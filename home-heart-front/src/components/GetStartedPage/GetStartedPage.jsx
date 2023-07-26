import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

export default function ImageCardGetStarted({user}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2706&q=80"
        title="Contemplative Reptile"
      />
      <div className={classes.overlay}>
        <Typography
          variant="body1"
          component="p"
          className={classes.overlayText}
          fontSize="20px"
        >
          Welcome {user.firstName}!
        </Typography>
        <RouterLink to="/user-form">
          {/* <Link style={{ textDecoration: "none" }}> */}
          <Button
            variant="contained"
            style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }}
            className={classes.button}
          >
            Get Started!
          </Button>
        </RouterLink>
      </div>
    </Card>
  );
}
