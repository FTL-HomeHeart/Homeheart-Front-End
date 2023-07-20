import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@mui/material/Button";

const MedicalProfessionalDetailedView = () => {


    // const { name, image, bio, country, languages, yearsOfExperience, specialization, education } = professional;

    return (
        <Container>
            <Grid container spacing={3} alignItems="center">
                {/* Left Half: Medical Professional Image and Name */}
                <Grid item xs={12} md={6}>
                    <img 
                        src={"https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"} 
                        alt={name} 
                        style={{ width: "100%", height: "auto", borderRadius: "8px"}} /> 
                    <Typography variant="h4" gutterBottom>{"Ethan Pineda"}</Typography>
                    <Typography variant="h6" gutterBottom>${"5"} per session</Typography>
                </Grid>

                {/* Right Half: Bio and Details */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                        {"Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being."}
                    </Typography>
                    <Typography variant="h6">
                        Country: {"Kenya"}
                    </Typography>
                    {/* <Typography variant="h6">
                        Languages: {languages.join(", ")}
                    </Typography> */}
                    <Typography variant="h6">
                        Years of Experience: {"2"}
                    </Typography>
                    {/* <Typography variant="h6">
                        Specialization: {specialization}
                    </Typography> */}
                    {/* <Typography variant="h6">
                        Education: {education}
                    </Typography> */}
                    <Button 
                        variant="contained" 
                        size="small" 
                        color="primary" 
                        style={{ marginTop: "1rem" }}
                        >
                            Book Appointment
                    </Button>
                    <Button 
                        variant="contained" 
                        size="small"  
                        color="primary" 
                        style={{ marginTop: "1rem" }}
                        >
                            Send Message
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MedicalProfessionalDetailedView;