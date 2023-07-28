import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import SavedMedicalProfessionalsCard from "./SavedMedicalProfessionalCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Inter, sans-serif",
    fontSize: "36px",
    marginBottom: theme.spacing(6),
  },
}));

const SavedMedicalProfessionals = () => {
  const classes = useStyles();
  const [savedMedicalProfessionals, setSavedMedicalProfessionals] = useState(
    []
  );
  const { id } = useParams();

  const handleFetchAllSavedMedicalProfessionals = () => {
    axios
      .get(`http://localhost:3001/api/saved_professionals/getAllSaved/${id}`)
      .then((response) => {
        console.log("response.data:", response.data.result);
        setSavedMedicalProfessionals(response.data.result);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  useEffect(() => {
    handleFetchAllSavedMedicalProfessionals();
  }, []);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom className={classes.heading}>
        Saved Medical Professionals
      </Typography>
      {savedMedicalProfessionals?.length > 0 ? (
        savedMedicalProfessionals.map((professional) => (
          <SavedMedicalProfessionalsCard
            key={professional.professional_id}
            professional={professional}
            id={id}
            handleFetchAllSavedMedicalProfessionals={
              handleFetchAllSavedMedicalProfessionals
            }
          />
        ))
      ) : (
        <Typography variant="body1">No saved professionals yet.</Typography>
      )}
    </Container>
  );
};

export default SavedMedicalProfessionals;
