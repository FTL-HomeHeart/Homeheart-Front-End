import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    width: 375, // Set a fixed width for each card
    height: 700, // Set a fixed height for each card
  },
  media: {
    width: '100%', // Make the image fill the entire width of the card
    height: 300, // Adjust the desired height for the image
    objectFit: 'cover', // Make the image fit within the specified dimensions
    marginBottom: theme.spacing(2),
    borderRadius: 8,
  },
  text: {
    marginBottom: theme.spacing(2),
    fontFamily: 'Inter, sans-serif',
    color: "#616161",
    fontSize: "16px",
    letterSpacing: 0.5
  }
}));

const TestimonialCard = ({ testimonial, name, image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography variant="body1" component="p" className={classes.text}>
          "{testimonial}"
        </Typography>
        <Typography variant="subtitle2" component="p" className={classes.text} >
          - {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
