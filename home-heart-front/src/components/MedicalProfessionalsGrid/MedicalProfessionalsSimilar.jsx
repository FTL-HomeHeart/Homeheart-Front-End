import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container, Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import MedicalProfessionalCard from "../MedicalProfessionalsGrid/MedicalProfessionalCard";
import MedicalProfessionalsDummyData from "../../../data/medical_professionals_with_bios.json";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Typography } from "@material-ui/core";

// Import react-slick styles and Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(2),
    // backgroundColor: "red",
  },
  // carouselContainer: {
  //   position: "relative",
  // },
  // carousel: {
  //   margin: "0 auto",
  //   width: "80%", // Adjust the width as per your requirement
  //   position: "relative",
  //   // Add padding for arrow buttons
  //   paddingLeft: "40px",
  //   paddingRight: "40px",
  // },
  arrowButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "100%",
    // Adjust the left and right positioning
    left: 0,
    right: 0,
  },
  arrowButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  // Additional styles to position the arrow buttons
  prevArrow: {
    left: 0,
    zIndex: 1,
  },
  nextArrow: {
    right: 0,
    zIndex: 1,
  },
  slickPrev: {
    "&:before": {
      color: "red",
    },
    color: "red",
  }
}));

export default function MedicalProfessionalsSimilar({ currentProfessionalID }) {
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const BASE_URL = "http://localhost:3001"; // replace with your base URL

  const classes = useStyles();

  // Fetch the recommendations using the user's ID from local storage
  useEffect(() => {
    const id = localStorage.getItem("userId");
    console.log("USER ID in similar comp", id);
    if (id) {
      axios
        .get(`${BASE_URL}/api/recommendations/${id}`)
        .then((response) => {
          setProfessionals(response.data);
        })
        .catch((error) => {
          // This is just so that I can actually work with the component - Ethan
          setProfessionals(MedicalProfessionalsDummyData);
          console.log(error);
        });
    }
  }, []);

  // Update the filtered professionals whenever professionals or currentProfessionalID changes
  useEffect(() => {
    if (professionals) {
      const filtered = professionals.filter(
        (professional) => professional.professional_id !== currentProfessionalID
      );
      setFilteredProfessionals(filtered);
    }
  }, [professionals, currentProfessionalID]);

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  // Custom components for arrow buttons
// Custom components for arrow buttons
const PrevArrow = ({ onClick }) => (
  <div style={{left: "0 !important", backgroundColor: 'red'}}>
    <IconButton onClick={onClick} className={classes.arrowButton}>
      <ArrowBackIosIcon />
    </IconButton>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className={classes.nextArrow}>
    <IconButton onClick={onClick} className={classes.arrowButton}>
      <ArrowForwardIosIcon />
    </IconButton>
  </div>
);


  // react-slick settings with navigation arrows
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };


  const sliderRef = React.createRef();

  return (
    <Container align="center" className={classes.mainContainer}>
      <Typography variant="h5">Similar Medical Professionals</Typography>
      <div className={classes.carouselContainer}>
        <Slider ref={sliderRef} {...settings}>
          {filteredProfessionals.map((professional) => (
            <MedicalProfessionalCard
              key={professional.professional_id}
              professional={professional}
            />
          ))}
        </Slider>
      </div>
    </Container>
  );
}
