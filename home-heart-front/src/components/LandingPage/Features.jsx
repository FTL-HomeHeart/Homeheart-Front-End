import React from "react";
import {
  Container,
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container2: {
    width: 1500,
    height: 726,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  content: {
    width: "100%",
    display: "flex",
    // alignItems: 'center',
    justifyContent: "space-between",
    height: "100%",
    // backgroundColor: "blue",
  },
  featureList: {
    width: "70%",
    marginRight: theme.spacing(1),
    listStyleType: "disc",
    paddingLeft: 0,
  },
  featureItem: {
    marginBottom: theme.spacing(2),
    display: "list-item",
    listStylePosition: "inside",
  },
  featureImage: {
    marginTop: "90px",
    flex: 1,
    height: "70%",
    width: "50%", //making sure it covers the aspect ratio
    marginLeft: theme.spacing(5),
  },
  interFont: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    color: "#616161",
    paddingTop: theme.spacing(2),
    fontWeight: 400,
    lineHeight: "28px",
    listStyleType: "disc",
    letterSpacing: 0.5,
  },
  SectionHeading: {
    fontFamily: "Inter, sans-serif",
    fontSize: "36px",
    color: "#7693B0",
    paddingBottom: theme.spacing(2),
  },
  SectionSubHeading: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    color: "#616161",
    paddingBottom: theme.spacing(2),
    fontWeight: 400,
    letterSpacing: 0.5,
  },
}));

export default function Features() {
  const classes = useStyles();

  return (
  <Container className={classes.container2}>
    <div className={classes.content}>
      <List className={classes.featureList}>
        <Typography className={classes.SectionHeading} component="h2">
          Features
        </Typography>
        <Typography
          variant="h6"
          component="span"
          className={classes.SectionSubHeading}
        >
          HomeHeart is designed with you in mind. Here are some features that
          make us unique.
        </Typography>
        <ListItem className={classes.featureItem}>
          <Typography
            variant="h6"
            component="span"
            className={classes.interFont}
          >
            Language and Cultural Matching: Connect with mental health
            professionals from your home country, for therapy in your native
            language and cultural context.
          </Typography>
        </ListItem>
        <ListItem className={classes.featureItem}>
          <Typography
            variant="h6"
            component="span"
            className={classes.interFont}
          >
            Affordable Pricing: We leverage economic disparities to offer you
            affordable prices, making mental health care more accessible.
          </Typography>
        </ListItem>
        <ListItem className={classes.featureItem}>
          <Typography
            variant="h6"
            component="span"
            className={classes.interFont}
          >
            Verified Professionals: All professionals on our platform are
            thoroughly verified to ensure you receive reliable and quality
            care.
          </Typography>
        </ListItem>
        <ListItem className={classes.featureItem}>
          <Typography
            variant="h6"
            component="span"
            className={classes.interFont}
          >
            Secure and Confidential: Your privacy is our top priority. We
            provide secure communication channels and protect your personal
            information.
          </Typography>
        </ListItem>
        <ListItem className={classes.featureItem}>
          <Typography
            variant="h6"
            component="span"
            className={classes.interFont}
          >
            Rich Resource Library: Access a wide range of resources related to
            mental health and the immigrant experience, to enhance your
            understanding and provide additional support.
          </Typography>

        </ListItem>
      </List>

      <img
        src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        alt="Feature Image"
        className={classes.featureImage}
      />
    </div>
  </Container>
  );
};

