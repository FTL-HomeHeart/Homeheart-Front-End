import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography, Button } from "@material-ui/core";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: theme.spacing(2),
    alignItems: "center",
    width: 1000,
  },
  media: {
    width: 180,
    height: 180,
    borderRadius: "8px",
    objectFit: "cover", 
    marginLeft: theme.spacing(2),
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& .MuiTypography-root": {
      marginBottom: theme.spacing(0.5), // Reduce margin between Typography elements
    },
  },
  doctorHeading: {
    fontFamily: 'Inter, sans-serif',
  },
  labels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(0.5), // Reduce margin from 1 to 0.5
    width: "50%",
  },
  label: {
    color: theme.palette.text.secondary,
    fontFamily: 'Inter, sans-serif',
    "&:not(:last-child)": {
      marginRight: theme.spacing(2), // Add margin between labels
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
}));

const SavedMedicalProfessionalsCard = ({ professional, userID, setUserSavedMedicalProfessionals, handleGetAllSavedMedicalProfessionals }) => {
    console.log("IM HERE"); 
    console.log("professionals in SAVED MED PROF CARD", professional)
  const classes = useStyles();
  

  // TODO: Implement this
  const handleRemoveMedicalProfessional = () => {
    axios.delete("http://localhost:3001/api/saved_professionals/deleteSavedProfessional", {
        data: {
            professional: professional, 
            user_id: userID
        }
    }).then((response) => {
        console.log("RESPONSE IN MED PROF CARD", response.data.result.professional);
        setUserSavedMedicalProfessionals(response.data.result.professional);
        handleGetAllSavedMedicalProfessionals(); 
    }).catch((error) => {
        console.log(error);
    })
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={professional.image}
        title={professional.first_name}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom className={classes.doctorHeading}>
          Dr. {professional?.first_name} {professional.last_name}
        </Typography>
        <div className={classes.labels}>
          <Typography variant="body2" className={classes.label}>
            Specialization: <br /> {professional.specialization}
          </Typography>
          <Typography variant="body2" className={classes.label}>
            Country of Origin: <br />{professional.country}
          </Typography>
        </div>
        <div className={classes.labels}>
          <Typography variant="body2" className={classes.label}>
            Languages: <br /> {professional.language_proficiency}
          </Typography>
          <Typography variant="body2" className={classes.label}>
            Rating: <br /> {professional.rating}/5
          </Typography>
          <Typography variant="body2" className={classes.label}>
            Years of Experience: <br /> {professional.years_of_experience}
          </Typography>
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" size="small">
            Book Appointment
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={handleRemoveMedicalProfessional}>
            <PersonRemoveIcon /> 
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedMedicalProfessionalsCard;
