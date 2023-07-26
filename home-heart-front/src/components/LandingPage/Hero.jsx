import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovingComponent from "react-moving-text";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";

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
  },
  button: {
    alignSelf: "start",
    marginTop: theme.spacing(2),
  },
  h1: {
    textAlign: "left",
    fontSize: "2.5em",
    marginBottom: theme.spacing(3),
  }
  // add blurry effect on the overlay

}));

export default function ImageCard() {
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
          component="h1"
          className={classes.h1}
        >
            <MovingComponent
            type="fadeInFromTop"
            duration="1200ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            Feels Like Home!
          </MovingComponent>
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.overlayText}
        >
          Empowering the journey of immigrants through accessible, personalized
          mental health support.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.overlayText}
        >
          Connect with professionals from your home country, communicate in your
          native language, and find comfort in familiarity. We're here to help
          every step of the way.
        </Typography>
        <Button variant="contained" style={{ backgroundColor: "#7E9BB6", color: "#ffffff" }} className={classes.button}>
          Learn More
        </Button>
      </div>
    </Card>
  );
}
