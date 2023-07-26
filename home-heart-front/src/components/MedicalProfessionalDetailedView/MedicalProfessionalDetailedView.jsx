import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalProfessionalCard from "../MedicalProfessionalsGrid/MedicalProfessionalCard";
import MedicalProfessionalCommentSection from "./MedicalProfessionalCommentSection";
import MedicalProfessionalSimilar from "../MedicalProfessionalsGrid/MedicalProfessionalsSimilar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import MedicalProfessionalsDummyData from "../../../data/medical_professionals_with_bios.json";

const BASE_URL = "http://localhost:3001";
const useStyles = makeStyles((theme) => ({
  doctorName: {
    fontFamily: "Inter, sans-serif",
    color: "#111010",
    fontSize: "36px",
  },
  bookmark: {
    marginLeft: theme.spacing(2),
  },
  pricing: {
    fontFamily: "Inter, sans-serif",
    color: "#111010",
    fontStyle: "normal",
    fontWeight: 400,
  },
  autobiography: {
    fontFamily: "Inter, sans-serif",
    color: "#616161",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "28px",
    marginBottom: "3rem",
  },
  detailsSection: {
    marginTop: theme.spacing(3),
  },
  details5: {
    marginBottom: theme.spacing(2),
    fontFamily: "Poppins, sans-serif !important",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  similarProfessionalsSection: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4rem",
  },

  similarProfessionalsHeader: {
    marginBottom: theme.spacing(10),
    fontFamily: "Poppins, sans-serif",
    fontSize: "30px",
    fontWeight: 500,
  },
  commentSectionContainer: {
    marginTop: "5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(5),
  },
  sendMessageButton: {
    marginTop: "1rem",
    backgroundColor: "#7693B0",
    textTransform: "none",
    color: "#FFF",
    marginLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#4777b8",
    },
  },
  bookAppointmentButton: {
    marginTop: "1rem",
    backgroundColor: "#7693B0",
    textTransform: "none",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#4777b8",
    },
  },
}));

export default function MedicalProfessionalDetailedView() {
  const classes = useStyles();
  const { id } = useParams();
  const [professionals, setProfessionals] = useState([]);
  const [similarProfessionals, setSimilarProfessionals] = useState([]);
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState(null);

  // fetching function for the dummy data
  //   useEffect(() => {
  //     axios
  //       .get(`${BASE_URL}/api/recommendations/${id}`)
  //       .then((response) => {
  //         setSimilarProfessionals(response.data);
  //       })
  //       .catch((error) => {
  //         setProfessionals(MedicalProfessionalsDummyData[0]);
  //         console.log(error);
  //       });
  //   }, [id]);

  // the fetching function from the backend medical professionals table
  const handleFetchMedicalProfessionalData = () => {
    axios
      .get(`http://localhost:3001/api/professional_details/${id}`)
      .then((response) => {
        // Assuming that the API response data is an array of professionals
        const foundProfessional = response.data.find(
          (professional) => professional.professional_id === parseInt(id)
        );

        if (foundProfessional) {
          setProfessionals(foundProfessional);
        }
      })
      .catch((error) => {
        // This is just so that I can still view the detailed view page without the backend running -Ethan
        setProfessionals(MedicalProfessionalsDummyData[0]);
        console.log(error);
      });
  };

  const handleFetchMedicalProfessionalComments = () => {
    axios
      .get(`http://localhost:3001/api/medical_professional/comments/${id}`)
      .then((response) => {
        console.log("response", response.data.result);
        setComments(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetchMedicalProfessionalData();
    // fetchSimilarProfessionals();
    handleFetchMedicalProfessionalComments();

    const user = localStorage.getItem("user");
    if (user) {
      const userData2 = user ? JSON.parse(user) : null;
      setUserData(userData2.userId);
    }
  }, [id]);

  const {
    first_name,
    last_name,
    bio,
    country,
    language_proficiency,
    years_of_experience,
    specialization,
    image,
    rating,
    availability_start_time,
    availability_end_time,
    qualification,
    price,
    timezone,
  } = professionals;
  console.log("professional is ", professionals.comments);

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Left Half: Medical Professional Image and Name */}
        <Grid item xs={12} md={6}>
          <img
            src={image}
            alt={`A picture of ${first_name}`}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <Typography variant="h4" className={classes.doctorName}>
              {first_name} {last_name}
            </Typography>
            <FavoriteIcon className={classes.bookmark} />
          </div>
          <Typography variant="h6" gutterBottom className={classes.pricing}>
            {(price / 8).toFixed(2)} per session
          </Typography>
          <Button
            variant="contained"
            size="medium"
            className={classes.bookAppointmentButton}
          >
            Book Appointment
          </Button>
          <Button
            variant="contained"
            size="medium"
            className={classes.sendMessageButton}
          >
            Send Message
          </Button>
        </Grid>
        {/* Right Half: Bio and details5 */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" className={classes.autobiography}>
            {bio}
          </Typography>
          <div className={classes.details5Section}>
            <Typography variant="h6" className={classes.details5}>
              Country: {country}
            </Typography>
            <Typography variant="h6" className={classes.details5}>
              Languages: {language_proficiency}
            </Typography>
            {/* @Nathnaelc I will work on this a bit more like time formatting and stuff */}
            <Typography variant="h6" className={classes.details5}>
              Availability: {availability_start_time} - {availability_end_time}
            </Typography>
            <Typography variant="h6" className={classes.details5}>
              Timezone: {timezone}
            </Typography>
            <Typography variant="h6" className={classes.details5}>
              Years of Experience: {years_of_experience} years
            </Typography>
            <Typography variant="h6" className={classes.details5}>
              Specialization: {specialization}
            </Typography>
            <Typography variant="h6" className={classes.details5}>
              Qualification: {qualification}
            </Typography>
            <Typography variant="h6" className={classes.details5}>
              Monthly Price: {price}
            </Typography>
            {/* you may move the rating to the left underneath their name or next to the price */}
            <Typography variant="h6" className={classes.details5}>
              Rating: {rating}
            </Typography>
          </div>
        </Grid>
      </Grid>
      {/* get rid of this and replace it with recommended professionals */}

      <div className={classes.commentSectionContainer}>
        <Typography variant="h5" className={classes.similarProfessionalsHeader}>
          Hear from other patients who have worked with Dr.{" "}
          {last_name ? last_name : "Smith"}
        </Typography>
        <MedicalProfessionalCommentSection
          comments={comments}
          setComments={setComments}
          userData={userData}
          medicalProfessionalId={id}
          handleFetchMedicalProfessionalComments={
            handleFetchMedicalProfessionalComments
          }
        />
        <MedicalProfessionalSimilar
          currentProfessionalID={professionals.professional_id}
        />
      </div>
    </Container>
  );
}
