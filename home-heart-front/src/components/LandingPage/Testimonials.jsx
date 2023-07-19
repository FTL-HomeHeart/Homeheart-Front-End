import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Divider } from '@material-ui/core';
import TestimonialCard from './TestimonialCard';

const useStyles = makeStyles((theme) => ({
  containeTestimonails: {
    padding: theme.spacing(4),
    maxWidth: '100%',
  },
  heading: {
    marginBottom: theme.spacing(2),
    fontFamily: 'Inter, sans-serif',
    color: "#7693B0",
    fontSize: "36px",
    fontWeight: 400,
  },
  worksDivider: {
    width: 150,
    backgroundColor: "#C4C4C4",
    height: 5,
    marginBottom: theme.spacing(4),
  },
  subbyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textSubheading: {
    marginBottom: theme.spacing(2),
    fontFamily: 'Inter, sans-serif',
    color: "#616161",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: 0.5
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  media: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: theme.spacing(2),
  },
}));

const Testimonials = () => {
  const classes = useStyles();

  const testimonialsData = [
    {
      testimonial: "As a single mother, moving to a new country was overwhelming. I missed my family, the familiar sounds, the food, and speaking Spanish. But what I missed the most was having someone who understood my struggles. Finding HomeHeart felt like a lifeline. I connected with a professional who knew my culture and spoke my language. It's been a transforming journey, and I've found the strength to create a new home for my daughter and me.",
      name: 'Maria Carlos',
      image: 'https://www.nyic.org/wp-content/uploads/2019/10/img-rights-health@2x.jpg',
    },
    {
      testimonial: "When I first moved to the US, everything felt alien and I often felt out of place. I struggled with anxiety and loneliness. A friend recommended HomeHeart, and I decided to give it a try. It's one of the best decisions I've made. The professional I connected with was from my hometown and it made a huge difference. I've been using HomeHeart for a year now, and it's helped me find balance and peace in my new life.",
      name: "Juan Mateo", 
      image: "https://i.etsystatic.com/26363159/r/il/e124c3/3153448532/il_1588xN.3153448532_8ing.jpg", 
    },
    {
      testimonial: "I came to the US for college when I was 18. It was exciting, but also stressful and sometimes, incredibly lonely. I found HomeHeart during my sophomore year. I was paired with a mental health professional from Ethiopia and it felt like talking to a piece of home. It's been a huge support for me and has made my college journey a lot smoother. I recommend HomeHeart to all international students. It's truly a game-changer.",
      name: 'Abel Johannes',
      image: 'https://lionlocs.com/cdn/shop/articles/image2.jpg?v=1606188864&width=1600',
    },
  ];

  return (
    <Container maxWidth={false}>
      <Container className={classes.subbyContainer}>
        <Typography variant="h4" className={classes.heading}>
          Testimonials
        </Typography>
        <Divider className={classes.worksDivider} />
        <Typography variant="body1" className={classes.textSubheading}>
          Hear from our users about their experiences with HomeHeart.
        </Typography>
      </Container>
      <Container className={classes.containeTestimonails}>
        <Grid container spacing={4} justify="center" className={classes.cardContainer}>
          {testimonialsData.map((testimonial, index) => (
            <Grid item key={index}>
              <TestimonialCard {...testimonial} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default Testimonials;
