import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container, Box, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import MedicalProfessionalCard from "./MedicalProfessionalCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";
import SavedMedicalProfessionals from "../SavedMedicalProfessionals/SavedMedicalProfessionals";

// import MedicalProfessionalsDummyData from "../../../data/medical_professionals_with_bios.json";


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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom sx={{ fontSize: "40px" }}>
            Welcome {firstName} to your personalized reccomendations
          </Typography>
          <div style={{ width: "60%" }}>
            <Typography variant="body1" gutterBottom sx={{ fontSize: "18px" }}>
              We have found the following medical professionals that match your
              needs. Please review the list below and click on the
              to save the medical professional to your profile.
            </Typography>
          </div>
        </div>
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
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/recommendations/${id}`)
      .then((response) => {
        setProfessionals(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // This is just so that I can still view the page without the backend running -Ethan
        // setProfessionals(MedicalProfessionalsDummyData);
        if (error.response) {
          // The request was made and the server responded with a status code
          setIsLoading(false);
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
    // console.log("user in med prof GRID:", user);
    // console.log("id in med prof GRID:", id);
    axios
      .get(`${BASE_URL}/api/saved_professionals/getAllSaved/${id}`)
      .then((response) => {
        // console.log("RESPONSE in GRID", response.data.result);
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
          {isLoading === true ? (
            <div style={{display:"flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
              <CircularProgress color="primary" />
              <Typography variant="h5" color="primary_color">
                Loading your personalized recommendations...
              </Typography>
            </div>
          ): (
            isLoading === false && professionals.length === 0 ? 
              (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ color: "#7693B0" }}>
                    Sorry! We weren't able to find any doctor matches based on your
                    provided information. We are still working on finding the right
                    professionals for you.
                  </Typography>
                  <Button variant="contained" component={Link} to="/">
                    Back to Home
                  </Button>
                </div>
              ) : ( 
              professionals.map((professional, index) => (
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
                    userSavedMedicalProfessionals={userSavedMedicalProfessionals}
                    handleGetAllSavedMedicalProfessionals={
                      handleGetAllSavedMedicalProfessionals
                    }
                    userID={id}
                  />
                </Grid>
              )))
            )}
        </Grid>
      </Container>
    </div>
  );
}
