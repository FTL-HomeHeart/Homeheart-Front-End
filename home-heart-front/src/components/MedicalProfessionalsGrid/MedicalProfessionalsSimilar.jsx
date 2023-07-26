import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import MedicalProfessionalCard from "../MedicalProfessionalsGrid/MedicalProfessionalCard";

export default function MedicalProfessionalsSimilar({ currentProfessionalID }) {
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const BASE_URL = "http://localhost:3001"; // replace with your base URL

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

  return (
    <Container>
      <h1>Similar Professionals</h1>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{ display: "flex" }}
      >
        {filteredProfessionals.map((professional) => (
          <Grid item xs={12} sm={6} md={4} key={professional.professional_id}>
            <MedicalProfessionalCard professional={professional} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
