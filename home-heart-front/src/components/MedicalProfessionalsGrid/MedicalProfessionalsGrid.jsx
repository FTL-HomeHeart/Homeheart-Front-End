import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@mui/material";
import MedicalProfessionalCard from "./MedicalProfessionalCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const BASE_URL = "http://localhost:3001";
const FLASK_URL = "http://127.0.0.1:5000";
import SavedMedicalProfessionals from "../SavedMedicalProfessionals/SavedMedicalProfessionals";
import MedicalProfessionalsDummyData from "../../../data/medical_professionals_with_bios.json"

export default function MedicalProfessionalsGrid({
  setUserSavedMedicalProfessionals,
  userSavedMedicalProfessionals,
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
    <Container>
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
  );
}
