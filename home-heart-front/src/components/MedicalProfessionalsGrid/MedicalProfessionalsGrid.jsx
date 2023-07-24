import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@mui/material";
import MedicalProfessionalCard from "./MedicalProfessionalCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const BASE_URL = "http://localhost:3001";
const FLASK_URL = "http://localhost:5000";
const MedicalProfessionalsGrid = () => {
  const [professionals, setProfessionals] = useState([]);
  const { id } = useParams(); // Extract id from the route parameters
  //fetch the professionals data from the database through the API /recommended_professionals
  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/api/recommended_professionals`)
  //     .then((response) => {
  //       // console.log("response data", response.data);
  //       setProfessionals(response.data);
  //       // console.log(professionals);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`${FLASK_URL}/api/recommendations/${id}`)
      .then((response) => {
        setProfessionals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
