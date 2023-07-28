import React from 'react';
import { Container, Typography, makeStyles, Divider, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: 1440,
    height: 820,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: theme.spacing(10),
  },
  heading: {
    marginBottom: theme.spacing(2),
    fontFamily: 'Inter, sans-serif',
    color: "#7693B0",
    fontSize: "36px",
    fontWeight: 400,
  },
  text: {
    marginBottom: theme.spacing(3),
    fontFamily: 'Inter, sans-serif',
    color: "#616161",
    fontSize: "16px",
    letterSpacing: 0.5
  },
  textSubheading: {
    marginBottom: theme.spacing(10),
    fontFamily: 'Inter, sans-serif',
    color: "#616161",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: 0.5
  }, 
  image: {
    width: 575,
    height: 490, 
    marginLeft: theme.spacing(4),
  },
  worksDivider: {
    width: 150,
    backgroundColor: "#C4C4C4", 
    height: 5, 
    marginBottom: theme.spacing(4),
  }, 
  boldedText: {
    fontWeight: 500,
    color: "#484848",
  },
}));

const HowItWorks = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        How it Works
      </Typography>
      <Divider className={classes.worksDivider} />
      <Typography variant="body1" className={classes.textSubheading}>
        Getting started with HomeHeart is easy. Here's how:
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="body1" className={classes.text}>
            <strong className={classes.boldedText}>Find a Therapist:</strong> Use our advanced search features to find mental health professionals who meet your needs. 
            You can search based on language, cultural background, specialization, and more 
          </Typography>
          <Typography variant="body1" className={classes.text}>
            <strong className={classes.boldedText}>Schedule your session:</strong> Once you've found your professional, use our platform to schedule a session at a time that works for you. 
          </Typography>
          <Typography variant="body1" className={classes.text}>
            <strong className={classes.boldedText}>Begin your journey:</strong> Attend your session and begin your journey to towards mental wellness. Remember, we're here to support you every step of the way
          </Typography>
          <Typography variant="body1" className={classes.text}>
            <strong className={classes.boldedText}>Share your experience:</strong> After your session, provide feedback to help us improve and help other users find the right professional for them. 
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src="https://images.unsplash.com/photo-1521321205814-9d673c65c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2374&q=80" alt="Get stated Image" className={classes.image} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorks;
