import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalProfessionalCard from "../MedicalProfessionalsGrid/MedicalProfessionalCard";
import MedicalProfessionalCommentSection from "./MedicalProfessionalCommentSection";
import MedicalProfessionalSimilar from "../MedicalProfessionalsGrid/MedicalProfessionalsSimilar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import MedicalProfessionalsDummyData from "../../../data/medical_professionals_with_bios.json";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

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
  detailsCard: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
    // Customize the width and padding to make the cards smaller
    width: 130, // Adjust this value based on your design requirements
    padding: theme.spacing(1), // Adjust this value based on your design requirements
  },
  detailsCardContent: {
    padding: theme.spacing(1), // Adjust this value based on your design requirements
  },
  banner: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: "#7693B0", // Customize the background color as per your design
    color: "#FFF", // Customize the text color as per your design
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function MedicalProfessionalDetailedView() {
  const classes = useStyles();
  const { id } = useParams();
  const [professionals, setProfessionals] = useState(null);
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // the fetching function from the backend medical professionals table
  const handleFetchMedicalProfessionalData = () => {
    axios
      .get(`${BASE_URL}/api/professional_details/${id}`)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const foundProfessional = response.data.find(
            (professional) => professional.professional_id === parseInt(id)
          );

          if (foundProfessional) {
            setProfessionals(foundProfessional);
            setLoading(false);
          }
        } else {
          console.error(
            "response.data is not an array or is undefined:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false); // Also set loading to false if there's an error
      });
  };

  // the fetching function from the backend medical professionals comments table
  const handleFetchMedicalProfessionalComments = () => {
    axios
      .get(`${BASE_URL}/api/medical_professional/comments/${id}`)
      .then((response) => {
        setComments(response.data.result);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  useEffect(() => {
    handleFetchMedicalProfessionalData();
    handleFetchMedicalProfessionalComments();

    const user = localStorage.getItem("user");
    if (user) {
      const userData2 = user ? JSON.parse(user) : null;
      setUserData(userData2.userId);
    }
  }, [id]);

  if (loading) {
    return  (
      <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "20px"}}>
        <CircularProgress color="primary" />
        <Typography variant="h5">
          Loading...
        </Typography>
      </div>
      )
  }

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
    time_zone,
  } = professionals;

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Left Half: Medical Professional Image and Name */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.banner}>
            {/* Add the banner content here */}
            <Typography variant="h4">
              Learn More about Dr. {last_name}
            </Typography>
          </Paper>
          <img
            src={image || professionals.image}
            alt={`A picture of ${first_name}`}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "1.5rem",
            }}
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
            ${(price / 8).toFixed(2)} per session
          </Typography>
          <Button
            variant="contained"
            size="medium"
            className={classes.bookAppointmentButton}
            onClick={() => {
              navigate(`/book_appointment/${professionals.professional_id}`);
            }}
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
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <Card className={classes.detailsCard}>
                <CardContent className={classes.detailsCardContent}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Country
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {country}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.detailsCard}>
                <CardContent className={classes.detailsCardContent}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Languages
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {language_proficiency}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.detailsCard}>
                <CardContent className={classes.detailsCardContent}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Year of Experince
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {years_of_experience}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.detailsCard}>
                <CardContent className={classes.detailsCardContent}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Specialization
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {specialization}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.detailsCard}>
                <CardContent className={classes.detailsCardContent}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Rating
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.detailsCard}>
                <CardContent className={classes.detailsCardContent}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Qualification
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {qualification}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.detailsCard}>
                <CardContent className={classes.detailsCardContent}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Start Time
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {availability_start_time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.detailsCard}>
                <CardContent className={classes.detailsCardContent}>
                  <Typography variant="subtitle2" color="textSecondary">
                    End Time
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    {availability_end_time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
