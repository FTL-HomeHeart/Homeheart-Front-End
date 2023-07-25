import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MedicalProfessionalCard from "../MedicalProfessionalsGrid/MedicalProfessionalCard";
import MedicalProfessionalCommentSection from "./MedicalProfessionalCommentSection";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    doctorName: {
        fontFamily: 'Inter, sans-serif',
        color: "#111010", 
        fontSize: "36px",
    },
    bookmark: {
        marginLeft: theme.spacing(2), 
    }, 
    pricing: {
        fontFamily: 'Inter, sans-serif',
        color: "#111010",
        fontStyle: "normal",
        fontWeight: 400, 
    }, 
    autobiography: {
        fontFamily: 'Inter, sans-serif',
        color: "#616161",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "28px", 
        marginBottom: "3rem" 
        
    }, 
    detailsSection: {
        marginTop: theme.spacing(3), 
    },
    details5: {
        marginBottom: theme.spacing(2),
        fontFamily: 'Poppins, sans-serif !important', 
        fontSize: "18px", 
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: 'normal', 
    }, 
    similarProfessionalsSection: {
        marginTop: theme.spacing(3),
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        gap: "4rem",
        marginTop: "5rem",
    },
    
    similarProfessionalsHeader: {
        fontWeight: "bold",
        marginBottom: theme.spacing(10),
        fontFamily: "Poppins, sans-serif",
        fontSize: "30px", 
        fontWeight: 500
    },
    commentSectionContainer: {
        marginTop: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: theme.spacing(5),
    },
    sendMessageButton: {
        marginTop: "1rem", 
        backgroundColor: "#7693B0", 
        textTransform: "none",
        color: "#FFF",
        marginLeft: theme.spacing(2),
        "&:hover": {
            backgroundColor: "#4777b8",
        }
    },
    bookAppointmentButton: {
        marginTop: "1rem", 
        backgroundColor: "#7693B0", 
        textTransform: "none",
        color: "#FFF",
        "&:hover": {
            backgroundColor: "#4777b8",
        }
    },
}));

const MedicalProfessionalDetailedView = ({professionalsArr}) => {

    const classes = useStyles();
    const { id } = useParams();
    const [professional, setProfessional] = useState(null);
    const [comments, setComments] = useState([]); 

    const handleFetchMedicalProfessionalData = () => {
        axios.get(`http://localhost:3001/api/medical_professional/getMedicalProfessionalById/${id}`)
        .then((response) => {
            console.log("RESPONSE IN DETAILED VIEW: ", response.data.result);
            setProfessional(response.data.result);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleFetchMedicalProfessionalData();
    }, []);

    // This is just a placeholder, we can update this to make a GET request to the backend for the reccomend medical professionals 
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
            bio: "Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being.", 
            comments: [
                {
                    id: 1,
                    name: "John Doe",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam ultrices. Sed vitae eros quis nisl aliquam ultrices.",
                    rating: 4.5,
                    date: "2021-10-10",
                    profile_image: "https://images.unsplash.com/photo-1533108344127-a586d2b02479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnZXJpYW4lMjBtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80", // Replace with the actual image URL
                },
                {
                    id: 2,
                    name: "Mary Jane",
                    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam ultrices. Sed vitae eros quis nisl aliquam ultrices.",
                    rating: 1,
                    date: "2023-07-24",
                    profile_image: "https://media.istockphoto.com/id/914835632/photo/mexican-latin-woman-with-mayan-dress.jpg?s=612x612&w=0&k=20&c=bftiKHuDh73LQTwv8uVaGHqV9YsjDPfkFjpVIkxuzgY=", // Replace with the actual image URL
                }
            ], 
        },
    ];

    console.log("PROFESSIONALS: ", professionals[0].comments);
    // setComments(professionals.comments); 
    
    
    // const { name, image, bio, country, languages, yearsOfExperience, specialization, education } = professional;

    return (
        <Container>
            <Grid container spacing={3}>
        {/* Left Half: Medical Professional Image and Name */}
                <Grid item xs={12} md={6}>
                    <img
                        src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                        alt={professional?.first_name}
                        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                    />
                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap",  }}>
                        <Typography variant="h4" className={classes.doctorName}>
                            Dr. {professional?.first_name} {professional?.last_name}
                        </Typography>
                        <BookmarkIcon className={classes.bookmark}/>
                    </div>
                    <Typography variant="h6" gutterBottom className={classes.pricing}>
                        {"$5"} per session
                    </Typography>
                </Grid>
                {/* Right Half: Bio and details5 */}
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" className={classes.autobiography}>
                        {professional?.bio}
                    </Typography>
                    <div className={classes.details5Section}>
                        <Typography variant="h6" className={classes.details5}>
                            Country: {professional?.country}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Languages: {professional?.language_proficiency}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Availability: {"Weekends"}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Years of Experience: {professional?.years_of_experience}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Specialization: {professional?.specialization}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Education: {professional?.education || "N/A"}
                        </Typography>
                    </div>
                    <Button variant="contained" size="medium" className={classes.bookAppointmentButton}>
                        Book Appointment
                    </Button>
                    <Button variant="contained" size="medium" className={classes.sendMessageButton}>
                        Send Message
                    </Button>
                </Grid>
            </Grid>
            <div className={classes.similarProfessionalsSection}>
                <Typography variant="h5" className={classes.similarProfessionalsHeader}>
                Similar Professionals
                </Typography>
                <Grid container spacing={3} justifyContent="space-between">
                <Grid item xs={3}>
                    <MedicalProfessionalCard professional={professionals[0]} />
                </Grid>
                <Grid item xs={3}>
                    <MedicalProfessionalCard professional={professionals[0]} />
                </Grid>
                <Grid item xs={3}>
                    <MedicalProfessionalCard professional={professionals[0]} />
                </Grid>
                <Grid item xs={3}>
                    <MedicalProfessionalCard professional={professionals[0]} />
                </Grid>
                </Grid>
            </div>
            <div className={classes.commentSectionContainer}>
                <Typography variant="h5" className={classes.similarProfessionalsHeader}>
                    Hear from other patients who have worked with Dr. {professional?.last_name}
                </Typography>
                <MedicalProfessionalCommentSection comments={professionals[0].comments} />
            </div>
        </Container>
    );
};

export default MedicalProfessionalDetailedView;