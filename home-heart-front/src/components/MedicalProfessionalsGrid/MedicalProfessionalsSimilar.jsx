import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MedicalProfessionalCard from "../MedicalProfessionalsGrid/MedicalProfessionalCard";

export default function MedicalProfessionalsSimilar({
  professionals,
  currentProfessionalID,
}) {
  console.log("Professionals:", professionals);
  console.log("Current Professional ID:", currentProfessionalID);
  let filteredProfessionals = [];

  if (professionals) {
    filteredProfessionals = professionals.filter(
      (professional) => professional.professional_id !== currentProfessionalID
    );
  }

  console.log("filteredProfessionals", filteredProfessionals);

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
