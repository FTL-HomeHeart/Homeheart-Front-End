import React from "react"; 
import { Container, List, ListItem, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container2: {
    width: 1500,
    height: 726,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "red",
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    // backgroundColor: "blue",
  },
  featureList: {
    width: '70%',
    marginRight: theme.spacing(1),
    listStyleType: 'disc', 
    paddingLeft: 0,  
  },
  featureItem: {
    marginBottom: theme.spacing(2),
    display: 'list-item', 
    listStylePosition: 'inside',
  },
  featureImage: {
    width: '35%', 
    height: '100%',
  },
  interFont: {
    fontFamily: 'Inter, sans-serif',
    fontSize: "18px", 
    color: "#616161", 
    paddingTop: theme.spacing(2),
    fontWeight: 400,
    lineHeight: "28px",
    listStyleType: "disc",
  }, 
  SectionHeading: {
    fontFamily: 'Inter, sans-serif',
    fontSize: "36px",
    color: "#7693B0",
    paddingBottom: theme.spacing(2),
  }, 
  SectionSubHeading: {
    fontFamily: 'Inter, sans-serif',
    fontSize: "18px",
    color: "#616161",
    paddingBottom: theme.spacing(2),
    fontWeight: 400,
  }
}));


const Features = () => {

      const classes = useStyles();

      return (
      <Container className={classes.container2}>
        <div className={classes.content}>
        <List className={classes.featureList}>
                <Typography 
                  className={classes.SectionHeading}
                  component="h2"
                  >
                  Features
                </Typography>
                <Typography 
                variant="h6" 
                component="span" 
                className={classes.SectionSubHeading}
                >
                  HomeHeart is designed with you in mind. Here are some features that make us unique. 
                </Typography>
            <ListItem className={classes.featureItem}>
              <Typography 
                variant="h6" 
                component="span" 
                className={classes.interFont}
                >
                  Language and Cultural Matching: Connect with mental health professionals from your home country, for therapy in your native language and cultural context.
                </Typography>
            </ListItem>
            <ListItem className={classes.featureItem}>
              <Typography 
                variant="h6" 
                component="span" 
                className={classes.interFont}
                >
                  Affordable Pricing: We leverage economic disparities to offer you affordable prices, making mental health care more accessible.
                </Typography>
            </ListItem>
            <ListItem className={classes.featureItem}>
              <Typography 
                variant="h6" 
                component="span" 
                className={classes.interFont}
                >
                  Verified Professionals: All professionals on our platform are thoroughly verified to ensure you receive reliable and quality care.
              </Typography>
            </ListItem>
            <ListItem className={classes.featureItem}>
              <Typography 
                variant="h6" 
                component="span" 
                className={classes.interFont}
                >
                  Secure and Confidential: Your privacy is our top priority. We provide secure communication channels and protect your personal information.
              </Typography>
            </ListItem>
            <ListItem className={classes.featureItem}>
              <Typography 
                variant="h6" 
                component="span" 
                className={classes.interFont}
                >
                  Rich Resource Library: Access a wide range of resources related to mental health and the immigrant experience, to enhance your understanding and provide additional support.
                  </Typography>
            </ListItem>
        </List>
          <img
            src="https://assets.pkimgs.com/pkimgs/ab/images/dp/wcm/202312/0116/camp-extra-wide-dresser-o.jpg"
            alt="Feature Image"
            className={classes.featureImage}
          />
        </div>
    </Container>
    );
};

export default Features; 