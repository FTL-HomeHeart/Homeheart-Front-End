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

export default function MedicalProfessionalsGrid({setUserSavedMedicalProfessionals, userSavedMedicalProfessionals, user}) {
  // const [professionals, setProfessionals] = useState([]);
  // const { id } = useParams();
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

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/api/recommendations/${id}`)
  //     .then((response) => {
  //       setProfessionals(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.log(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log("Error", error.message);
  //       }
  //       console.log(error.config);
  //     });
  // }, [id]);


  const professionals = [
    {
        professional_id: 1,
        first_name: "Ethan", 
        last_name: "Pineda", 
        specialization: "Cardiologist",
        years_of_experience: 5, 
        location: "New York, NY",
        rating: 4.5,
        reviews: 100,
        country: "United States",
        language_proficiency: "English",
        modality: "In-Person",
        image: "https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg", 
        bio: "Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being."
    },
    {
      professional_id: 2,
      first_name: "Ethan2", 
      last_name: "Pineda2", 
      specialization: "Cardiologist2",
      years_of_experience: 5, 
      location: "New York, NY",
      rating: 4.5,
      reviews: 100,
      country: "United States",
      language_proficiency: "English",
      modality: "In-Person",
      image: "https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg", 
      bio: "Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being."
  },
];

const handleGetAllSavedMedicalProfessionals = () => {
  console.log("user", user);
  axios.get(`http://localhost:3001/api/saved_professionals/getAllSaved/5`)
    .then((response) => {
      console.log("RESPONSE", response.data.result);
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
        {professionals.map((professional) => (
          <Grid item xs={12} sm={6} md={4} key={professional.professional_id}>
            <MedicalProfessionalCard professional={professional} user={user} setUserSavedMedicalProfessionals={setUserSavedMedicalProfessionals} handleGetAllSavedMedicalProfessionals={handleGetAllSavedMedicalProfessionals} />
          </Grid>
        ))}
      </Grid>
      <SavedMedicalProfessionals userSavedMedicalProfessionals={userSavedMedicalProfessionals} setUserSavedMedicalProfessionals={setUserSavedMedicalProfessionals} user={user} handleGetAllSavedMedicalProfessionals={handleGetAllSavedMedicalProfessionals}  /> 
    </Container>
  );
}
