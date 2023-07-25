import React from "react"; 
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import SavedMedicalProfessionalsCard from "./SavedMedicalProfessionalCard";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    heading: {
        fontFamily: 'Inter, sans-serif',
        fontSize: "36px", 
        marginBottom: theme.spacing(6),
    },
}));

const SavedMedicalProfessionals = ({userSavedMedicalProfessionals, setUserSavedMedicalProfessionals, handleGetAllSavedMedicalProfessionals, userID  }) => {

    const classes = useStyles(); 

    useEffect(() => {
        console.log("userSavedMedicalProfessionals updated:", userSavedMedicalProfessionals);
    }, [userSavedMedicalProfessionals]);

    return (
        <Container className={classes.container}>
            <Typography variant="h4" gutterBottom className={classes.heading}>
                Saved Medical Professionals
            </Typography>
            {userSavedMedicalProfessionals?.length > 0 ? (
                userSavedMedicalProfessionals.map((professional) => (
                    <SavedMedicalProfessionalsCard
                        key={professional.professional_id}
                        professional={professional}
                        userID={userID}
                        setUserSavedMedicalProfessionals={setUserSavedMedicalProfessionals}
                        handleGetAllSavedMedicalProfessionals={handleGetAllSavedMedicalProfessionals} 
                    />
                ))
            ) 
            : 
            (
                <Typography variant="body1">No saved professionals yet.</Typography>
            )}
        </Container>

    );
};

export default SavedMedicalProfessionals; 