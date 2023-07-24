import React from 'react';
import { Container, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: 1450,
    height: 530,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(10),
    marginTop: theme.spacing(10),
  },
  image: {
    width: 570,
    height: 530,
    objectFit: 'cover',
  },
  contentContainer: {
    backgroundColor: '#F7F7F7',
    padding: 5, 
    width: 708, 
    // height: "min-content", 
  },
  heading: {
    color: '#7693B0',
    marginBottom: theme.spacing(2),
    fontFamily: 'Inter, sans-serif',
  },
  text: {
    marginBottom: theme.spacing(2),
    fontFamily: 'Inter, sans-serif',
    color: '#616161',
    fontSize: '16px',
    letterSpacing: 0.5,
  },
}));

const Vision = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={10} alignItems="center">
        <Grid item xs={12} md={6}>
          <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="Square Image" className={classes.image} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.contentContainer}>
          <Typography variant="h4" className={classes.heading}>
            Vision
          </Typography>
          <Typography variant="body1" className={classes.text}>
            At HomeHeart, our vision is to bridge the gap between continents for 
            immigrant mental health. We believe that everyone deserves access to 
            culturally sensitive, affordable, and personalized mental health 
            support. By connecting immigrant with mental health professionals from 
            their home countries, we're building a global network of care that 
            transcends geographical boundaries.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Vision; 
