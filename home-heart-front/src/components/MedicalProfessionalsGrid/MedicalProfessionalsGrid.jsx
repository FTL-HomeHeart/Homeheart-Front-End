import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@mui/material";
import MedicalProfessionalCard from "./MedicalProfessionalCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const BASE_URL = "http://localhost:3001";
const FLASK_URL = "http://127.0.0.1:5000";
export default function MedicalProfessionalsGrid() {
  const [professionals, setProfessionals] = useState([]);
  const { id } = useParams();
  // fetch the professionals data from the database through the API /recommended_professionals
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
      .get(`${BASE_URL}/api/recommendations/${id}`)
      .then((response) => {
        setProfessionals(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
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
          <Grid item xs={12} sm={6} md={4} key={professional.professional_id}>
            <MedicalProfessionalCard professional={professional} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
