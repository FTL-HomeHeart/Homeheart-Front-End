import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "@material-ui/core";

const CopyRight = () => {
  return (
    <Typography variant="body2" color="#FFFFFF" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        HomeHeart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

// fix the copyright thing
<CopyRight />;

// TODO: Find out how to import these icons
const socialLinks = [];

const SocialLinkItem = ({ item }) => (
  <Box
    component="li"
    sx={{
      display: "inline-block",
      color: "primary.contrastText",
      mr: 0.5,
    }}
  >
    <a
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        lineHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        color: "inherit",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
        "& img": {
          fill: "currentColor",
          width: 22,
          height: "auto",
        },
      }}
      href={item.link}
    >
      <img src={item.icon} alt={item.name + " icon"} />
    </a>
  </Box>
);

const SocialLinks = () => {
  return (
    <Box sx={{ ml: -1 }}>
      <ul
        sx={{
          m: 0,
          p: 0,
          lineHeight: 0,
          borderRadius: 3,
          listStyle: "none",
        }}
      >
        {socialLinks.map((item) => (
          <SocialLinkItem key={item.name} item={item} />
        ))}
      </ul>
    </Box>
  );
};

const FooterSectionTitle = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Typography
        component="p"
        variant="h5"
        sx={{ color: "primary.contrastText", fontWeight: "700" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

const NavigationItem = ({ label, path }) => {
  return (
    <MuiLink
      underline="hover"
      sx={{
        display: "block",
        mb: 1,
        color: "primary.contrastText",
      }}
    >
      {label}
    </MuiLink>
  );
};

const LegalSectionItems = [
  {
    label: "Terms of Service",
    path: "#",
  },
  {
    label: "Privacy Policy",
    path: "#",
  },
  {
    label: "Cookie Policy",
    path: "#",
  },
];

const ServiceSectionItems = [
  {
    label: "Home",
    path: "#",
  },
  {
    label: "About Us",
    path: "#",
  },
  {
    label: "How it Works",
    path: "#",
  },
  {
    label: "resources",
    path: "#",
  },
  {
    label: "Contact Us",
    path: "#",
  },
];

const ContactSectionItems = [
  {
    label: "415 Mission Street, San Francisco, CA 94105",
  },
];

const FooterNavigation = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Legal" />
        {LegalSectionItems.map(({ label, path }, index) => (
          <NavigationItem
            key={index + path}
            label={label}
            path={/* path */ "#"}
          />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Services" />
        {ServiceSectionItems.map(({ label, path }, index) => (
          <NavigationItem
            key={index + path}
            label={label}
            path={/* path */ "#"}
          />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Contact Information" />
        {ContactSectionItems.map(({ label, path }, index) => (
          <NavigationItem
            key={index + path}
            label={label}
            path={/* path */ "#"}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#768599",
        py: { xs: 6, md: 10 },
        color: "primary.contrastText",
        fontFamily: "Poppins, sans-serif", // Set the Poppins font for the entire footer/ Set the Poppins font for the entire footer
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Box sx={{ width: { xs: "100%", md: 360 }, mb: { xs: 3, md: 0 } }}>
              <Typography component="h2" variant="h2" sx={{ mb: 2 }}>
                HomeHeart
              </Typography>
              <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
                <CopyRight />
              </Typography>
              <SocialLinks />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <FooterNavigation />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
