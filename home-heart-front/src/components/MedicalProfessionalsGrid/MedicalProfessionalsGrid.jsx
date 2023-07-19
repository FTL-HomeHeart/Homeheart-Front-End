import React from "react"; 
import Grid from '@material-ui/core/Grid';
import { Container } from "@mui/material";
import MedicalProfessionalCard from "./MedicalProfessionalCard";
const MedicalProfessionalsGrid = () => {

    // name, image, country, language, modality
    const professionals = [
        {
            id: 1,
            name: "Dr. John Doe",
            specialty: "Cardiologist",
            location: "New York, NY",
            rating: 4.5,
            reviews: 100,
            country: "United States",
            language: "English",
            modality: "In-Person",
            image: "https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg", 
            bio: "Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being."
        },
        {
            id: 2,
            name: "Dr. John Doe",
            specialty: "Cardiologist",
            location: "New York, NY",
            rating: 4.5,
            reviews: 100,
            country: "United States",
            language: "English",
            modality: "In-Person",
            image: "https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg", 
            bio: "Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being."
        },
        {
            id: 3,
            name: "Dr. John Doe",
            specialty: "Cardiologist",
            location: "New York, NY",
            rating: 4.5,
            reviews: 100,
            country: "United States",
            language: "English",
            modality: "In-Person",
            image: "https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg", 
            bio: "Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being."
        },
        {
            id: 4,
            name: "Dr. John Doe",
            specialty: "Cardiologist",
            location: "New York, NY",
            rating: 4.5,
            reviews: 100,
            country: "United States",
            language: "English",
            modality: "In-Person",
            image: "https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg", 
            bio: "Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being."
        },
    ];


    return (
        <Container>
            <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ display: 'flex' }}>
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