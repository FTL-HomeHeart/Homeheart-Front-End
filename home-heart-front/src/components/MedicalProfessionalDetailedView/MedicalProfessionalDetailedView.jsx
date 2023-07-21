import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MedicalProfessionalCard from "../MedicalProfessionalsGrid/MedicalProfessionalCard";


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
        marginBottom: theme.spacing(1),
        fontFamily: "Poppins, sans-serif !important",
        fontSize: "30px", 
        fontWeight: 500
    },
}));

const MedicalProfessionalDetailedView = () => {

    const classes = useStyles();

    // just for now

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
    ];
    
    
    // const { name, image, bio, country, languages, yearsOfExperience, specialization, education } = professional;

    return (
        <Container>
            <Grid container spacing={3}>
        {/* Left Half: Medical Professional Image and Name */}
                <Grid item xs={12} md={6}>
                    <img
                        src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                        alt={name}
                        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                    />
                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap",  }}>
                        <Typography variant="h4" className={classes.doctorName}>
                            {"Ethan Pineda"}
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
                        {"Meet Dr. Emily, a compassionate mental health professional with a profound commitment to healing and supporting individuals. With extensive experience in therapy and research, she empowers her patients to embrace positive change and achieve lasting well-being."}
                    </Typography>
                    <div className={classes.details5Section}>
                        <Typography variant="h6" className={classes.details5}>
                            Country: {"Kenya"}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Languages: {"English, Swahili"}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Availability: {"Weekends"}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Years of Experience: {"2"}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Specialization: {"Clinical Psychology"}
                        </Typography>
                        <Typography variant="h6" className={classes.details5}>
                            Education: {"PhD in Clinical Psychology from University of Nairobi"}
                        </Typography>
                    </div>
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
                        style={{ marginTop: "1rem", marginLeft: "1rem" }}
                        >
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
        </Container>
    );
};

export default MedicalProfessionalDetailedView;