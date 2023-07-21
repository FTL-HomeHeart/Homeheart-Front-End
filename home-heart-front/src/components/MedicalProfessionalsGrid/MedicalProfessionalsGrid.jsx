import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@mui/material";
import MedicalProfessionalCard from "./MedicalProfessionalCard";
import axios from "axios";
import { useState, useEffect } from "react";
const BASE_URL = "http://localhost:3001";
const MedicalProfessionalsGrid = () => {
  const [professionals, setProfessionals] = useState([]);
  //fetch the professionals data from the database through the API /recommended_professionals
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/recommended_professionals`)
      .then((response) => {
        console.log("response data", response.data);
        setProfessionals(response.data);
        // console.log(professionals);
      })
      .catch((error) => {
        console.log(error);
      });
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
        {professionals.map((professional) => (
          <Grid item xs={12} sm={6} md={4} key={professional.id}>
            <MedicalProfessionalCard professional={professional} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MedicalProfessionalsGrid;
