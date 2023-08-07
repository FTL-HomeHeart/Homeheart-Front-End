import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Dialog } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    borderRadius: 8,
    width: 850,
    height: 700,
    padding: theme.spacing(4),
    fontFamily: "Inter, sans-serif",
    fontStyle: "cursive",
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
    color: "black",
    fontSize: "48px",
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    width: 650,
    margin: "0 auto",
    color: "black",
    fontFamily: "Inter, sans-serif",
  },
  message: {
    marginBottom: theme.spacing(4),
    fontFamily: "Inter, sans-serif",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#7693B0",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#7693B0",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#4777b8",
    },
    width: "350px",
  },
}));

const AppointmetConfirmedPage = ({ appointmentData }) => {
  const { professional_id, appointment_start, appointment_end } =
    appointmentData;

  const [medProfFirstName, setMedProfFirstName] = useState("");
  const [medProfLastName, setMedProfLastName] = useState("");

  // Function to format date and time
  function formatDateTime(dateTimeString) {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Date(dateTimeString).toLocaleString(undefined, options);
  }

  // Function to format the appointment range
  function formatAppointmentRange(startDateTime, endDateTime) {
    const formattedStartTime = formatDateTime(startDateTime);
    const formattedEndTime = formatDateTime(endDateTime);

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  // Format the appointment start_time and end_time
  const formattedAppointmentTime = formatAppointmentRange(
    appointment_start,
    appointment_end
  );

  console.log("appointmentData", appointmentData);
  console.log(formattedAppointmentTime);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/api/medical_professional/getMedicalProfessionalById/${professional_id}`
      )
      .then((response) => {
        setMedProfFirstName(response.data.result.first_name);
        setMedProfLastName(response.data.result.last_name);
      });
  });
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
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
          Dear {user.firstName || "NOT FOUND"},
        </Typography>
        <Typography className={classes.message}>
          We are pleased to inform you that your appointment has been
          successfully scheduled with Dr.{" "}
          {medProfFirstName + " " + medProfLastName || "NOT FOUND"}.
        </Typography>
        <Typography className={classes.message}>
          We appreciate your trust in our services and look forward to
          supporting you on your journey towards a healthier life and better
          mental well-being
        </Typography>
        <Typography className={classes.message}>
          Appointment Details: {formattedAppointmentTime || "NOT FOUND"}
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
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            navigate(`/upcoming_appointments/${user.userId}`);
          }}
        >
          View Upcoming Appointments
        </Button>
      </div>
    </Container>
  );
};

export default AppointmetConfirmedPage;