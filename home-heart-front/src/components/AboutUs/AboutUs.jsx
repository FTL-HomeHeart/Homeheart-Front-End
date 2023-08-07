import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    height: "100%",
    margin: theme.spacing(4),
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    backgroundColor: "#7693B0",
    color: "white",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  headerText: {
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(15),
    height: "auto",
    objectFit: "cover",
  },
  companyLogo: {
    width: "70%",
    height: "auto",
  },
  pos: {
    marginBottom: 12,
  },
  developersGrid: {
    marginTop: theme.spacing(4),
  },
  partnersGrid: {
    justifyContent: "center",
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(25),
    marginRight: theme.spacing(25),
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function AboutUs() {
  const classes = useStyles();

  const developers = [
    {
      name: "Nathnael Mekonnen",
      github: "https://github.com/Nathnaelc",
      linkedin: "https://linkedin.com/in/nathanseasn/",
      description:
        "Rising Junior at Minerva University, Computer Science and Economics Major",
      picture:
        "https://media.licdn.com/dms/image/D5603AQHvxaxwt5LvDQ/profile-displayphoto-shrink_400_400/0/1675878409843?e=1696464000&v=beta&t=Yg7KiYZsJvMTUczkldAlJ0PFZiCCWo6B2xt25N2EQjw",
    },
    {
      name: "Richmond Akondo",
      github: "https://github.com/Richmondo17",
      linkedin: "https://linkedin.com/in/richmond-akondo/",
      description:
        "Rising Junior at University of Maryland, College Park, BS in Information Science.",
      picture:
        "https://media.licdn.com/dms/image/C5603AQHnZJ-9g0bf7g/profile-displayphoto-shrink_400_400/0/1650327378443?e=1697068800&v=beta&t=GrvRArjXEpchKAkLIakHEc_GHZwfJJKhKYYwsL1up4s",
    },
    {
      name: "Ethan Pineda (he/él/they)",
      github: "https://github.com/ethanpaneraa",
      linkedin: "https://www.linkedin.com/in/ethanpineda/",
      description:
        "Rising Junior at Northwestern University, BA/MS in Computer Science. Learn more about me here: https://ethanpaneraa.github.io/Ethan/: ",
      picture:
        "https://media.licdn.com/dms/image/C4D03AQHWdEnSs1czbg/profile-displayphoto-shrink_800_800/0/1628815121721?e=1697068800&v=beta&t=W7bwH4XQWPzPxi5hjUdg4ofxrqerW6vcx7KyzEidI7s",
    },
  ];

  const partners = [
    {
      name: "CodePath",
      logo: "https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/281884241_3151666095072949_5432073168734063951_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ys8ci1SCessAX8bi3d9&_nc_ht=scontent-sjc3-1.xx&oh=00_AfBexIwNRJo4l5UTc9imEczaXXCLWAf_cP5GLmoX1obL8A&oe=64D1EA2A",
    },
    {
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png",
    },
  ];

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2" className={classes.headerText}>
          About Us
        </Typography>
      </div>
      <Grid
        container
        justifyContent="center"
        className={classes.developersGrid}
      >
        {developers.map((developer, index) => (
          <Grid item key={index}>
            <Card className={classes.root}>
              <CardContent>
                <Grid container justify="center">
                  <Avatar
                    alt={developer.name}
                    src={developer.picture}
                    className={classes.avatar}
                  />
                </Grid>
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                  gutterBottom
                >
                  {developer.name}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  align="center"
                >
                  {developer.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={developer.github} target="_blank">
                  Github
                </Button>
                <Button size="small" href={developer.linkedin} target="_blank">
                  LinkedIn
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid container className={classes.partnersGrid}>
          {partners.map((partner, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              className={classes.cardContainer}
            >
              <Card className={classes.root}>
                <CardContent>
                  <Grid container justify="center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={classes.companyLogo}
                    />
                  </Grid>
                  <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    gutterBottom
                  >
                    {partner.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
