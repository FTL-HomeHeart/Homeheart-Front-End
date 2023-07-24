import React from "react"; 
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from "@material-ui/core"; 
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    border: "1px solid #000", 
    backgroundColor: "rgba(0,0,0,0.36)", 
    backdropFilter: "blur(17px)", 
    borderRadius: 8,
    width: 850,
    height: 700, 
    padding: theme.spacing(4),
    fontFamily: 'Inter, sans-serif',
    fontStyle: "cursive"
  },
    iconContainer: {
        textAlign: "center",
    },
  icon: {
    fontSize: "6rem",
    color: "#7693B0",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
    color: "#FFFFFF", 
    fontSize: "48px", 
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    width: 650,
    margin: "0 auto",
    color: "#FFFFFF", 
  },
  message: {
    marginBottom: theme.spacing(4),
    fontFamily: 'Inter, sans-serif',
  },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",

    },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#7693B0", 
    fontFamily: 'Inter, sans-serif',
  },
}));

const AppointmetConfirmedPage = ({props}) => {

    const navigate = useNavigate();

    const classes = useStyles();

  return (
    <Container className={classes.container}>
        <div className={classes.iconContainer}>
             <CheckCircleOutlineIcon className={classes.icon} />
        </div>
      <Typography variant="h4" className={classes.title}>
        Appointment Confirmed!
      </Typography>
      <div className={classes.messageContainer}>
        <Typography variant="body1" className={classes.message}>
        Dear {props?.patientName || "NOT FOUND"},
        </Typography>
        <Typography className={classes.message}>
            We are pleased to inform you that your appointment has been successfully scheduled with {props?.doctorName || "NOT FOUND"} at {props?.doctorLocation || "NOT FOUND"} 
        </Typography>
        <Typography className={classes.message}>
            We appreciate your trust in our services and look forward to supporting you on your journey towards a healthier life and better mental well-being
        </Typography>
        <Typography className={classes.message}>
            Appointment Details: {props?.appointmentDate || "NOT FOUND"} at {props?.appointmentTime || "NOT FOUND"}
        </Typography>
        <Typography className={classes.message}>
            Location: {props?.doctorLocation || "NOT FOUND"}
        </Typography>
        <Typography className={classes.message}>
            Doctor: {props?.doctorName || "NOT FOUND"}
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
              <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
            navigate("/");
        }}
      >
        Back to Home
      </Button>
      </div>
    </Container>
  );
};

export default AppointmetConfirmedPage;