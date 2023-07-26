import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@mui/material";
import MedicalProfessionalDetailedView from "../MedicalProfessionalDetailedView/MedicalProfessionalDetailedView";

export default function MedicalProfessionalsGrid({ similarProfessionals }) {
  // rest of your component code

  return (
    <Container>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{ display: "flex" }}
      >
        {similarProfessionals.map((professional) => (
          <Grid item xs={12} sm={6} md={4} key={professional.professional_id}>
            <MedicalProfessionalDetailedView professional={professional} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
