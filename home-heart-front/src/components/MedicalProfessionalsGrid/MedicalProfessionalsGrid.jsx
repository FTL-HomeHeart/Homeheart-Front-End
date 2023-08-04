import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container, Box, Typography } from "@mui/material";
import MedicalProfessionalCard from "./MedicalProfessionalCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const BASE_URL = "http://localhost:3001";
const FLASK_URL = "http://127.0.0.1:5000";
import SavedMedicalProfessionals from "../SavedMedicalProfessionals/SavedMedicalProfessionals";
import MedicalProfessionalsDummyData from "../../../data/medical_professionals_with_bios.json";

// this is the banner component that displays on the top of the page
const BannerComponent = () => {
  // get the user data so we can display their name in the banner
  const userData = JSON.parse(localStorage.getItem("user"));
  const { firstName } = userData;
  return (
    <Box
      sx={{
        backgroundColor: "#768599",
        padding: "40px",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
        marginBottom: "50px",
      }}
    >
      <Box
        sx={{
          width: "60%",
          color: "#fff",
          margin: "0 auto",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Typography gutterBottom sx={{ fontSize: "40px" }}>
          Welcome {firstName} to your personalized reccomendations
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "18px" }}>
          With our matching process, we hope that you are able to find the right
          professionals to help you with your mental health. Feel free to save
          any professionals that you are interested in and book an appointment
          with them. Wanna see more details about a specific professinal? Click
          on the "Learn More" button!
        </Typography>
      </Box>
    </Box>
  );
};

export default function MedicalProfessionalsGrid({
  userSavedMedicalProfessionals,
  setUserSavedMedicalProfessionals,
  user,
}) {
  const [professionals, setProfessionals] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/recommendations/${id}`)
      .then((response) => {
        setProfessionals(response.data);
      })
      .catch((error) => {
        // This is just so that I can still view the page without the backend running -Ethan
        setProfessionals(MedicalProfessionalsDummyData);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, [id]);

  // @Ethan take this out to the new file created named MedicalProfessionalSaved
  const handleGetAllSavedMedicalProfessionals = () => {
    console.log("user in med prof GRID:", user);
    console.log("id in med prof GRID:", id);
    axios
      .get(`http://localhost:3001/api/saved_professionals/getAllSaved/${id}`)
      .then((response) => {
        console.log("RESPONSE in GRID", response.data.result);
        setUserSavedMedicalProfessionals(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
      });
  };

  useEffect(() => {
    handleGetAllSavedMedicalProfessionals();
  }, []);

  return (
    <div>
      <BannerComponent />
      <Container sx={{ marginBottom: "300px" }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          style={{ display: "flex" }}
        >
          {/* The index is so that I don't have to render all 200+ entries with the dummy data - Ethan */}
          {professionals.map(
            (professional, index) =>
              index < 6 && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={professional.professional_id}
                >
                  <MedicalProfessionalCard
                    professional={professional}
                    setUserSavedMedicalProfessionals={
                      setUserSavedMedicalProfessionals
                    }
                    userSavedMedicalProfessionals={
                      userSavedMedicalProfessionals
                    }
                    handleGetAllSavedMedicalProfessionals={
                      handleGetAllSavedMedicalProfessionals
                    }
                    userID={id}
                  />
                </Grid>
              )
          )}
        </Grid>
      </Container>
    </div>
  );
}
