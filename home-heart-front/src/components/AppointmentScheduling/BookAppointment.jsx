import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppointmentConfirmed from "../AppointmentConfirmed/AppointmentConfirmed";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader, 
  Box,
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton
} from "@material-ui/core";
import moment from "moment-timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
// useHistory is used to redirect the user to a different page once the the appointment is booked
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

const useStyles = makeStyles((theme) => ({
  bannerBox2: {
    backgroundColor: "#768599",
    padding: "40px",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    marginBottom: "125px",
  },
  bannerHeader2: {
    width: "60%", 
    color: "#fff", 
    margin: "0 auto",
    fontSize: "40px",
    marginBottom: "20px",
  }, 
  bannerSubHeading: {
    fontSize: "18px", 
    color: "#fff", 
    width: "50%",
    margin: "0 auto",
  },
  appointmentButtons: {
    backgroundColor: "#7693B0",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#4777b8",
    },
  appointmentButtonsActive: {
    backgroundColor: "red",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#4777b8",
    }, 
  }, 
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timeGridContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    fontFamily: "Inter, sans-serif",
  }, 
  timeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Adjust the number of columns as needed
    gap: theme.spacing(2),
    
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: 300,
    height: 400,
    // margin: "0 auto",
  },
  dialog: {
    "& .MuiPaper-root": {
      maxWidth: "min-content", 
      height: "min-content",

    }
}
}));

export default function BookAppointment() {
  // state to store the professional's availability
  const [availability, setAvailability] = useState([]);
  // state to store the user selected date (starts off at today)
  const [selectedDate, setSelectedDate] = useState(dayjs());
  // state to store the user selected time
  const [selectedTimeStart, setSelectedTimeStart] = useState(null);

  // state to determine if a button was clicked or not
  const [timeSlotPicked, setTimeSlotPicked] = useState(false);
  
  // state to determine if the dialog is open or not (the appointment confirmed pop up)
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [appointmentData, setAppointmentData] = useState({});

  // const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);

  const [error, setError] = useState("");

  const classes = useStyles();
  // useHistory is used to redirect the user to a different page once the the appointment is booked
  const navigate = useNavigate();
  const { professionalId } = useParams();

  // This array is used to convert the day of the week to the day of the week it corresponds to
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // handles when users clicks a new date in the DateCalendar
  const handleDataChange = (newValue) => {
    const dayOfWeek = (newValue.day() + 6) % 7;
    setSelectedDate(newValue);
    setError("");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  

  // Function to convert "hh:mm AM/PM" format to "hh:mm:ss" format
  // this is to so I can format the time when we make the post request
  const convertToTimeFormat = (timeStr) => {
    // Parse the input time string using moment.js
    const parsedTime = moment(timeStr, "hh:mm A");
    // Format the time in "hh:mm:ss" format
    return parsedTime.format("HH:mm:ss");
  };

  const findDayOfWeek = (day, availabilityData) => {
    for (let i = 0; i < availabilityData.length; i++) {
      if (parseInt(availabilityData[i].day_of_week) === parseInt(day)) {
        // console.log("found day of week");
        return i;
      }
    }
  }

  // This function generates the available appointment times for the selected date
  // the intervals are 30 minutes each (we can change this later)
  const generateAppointmentIntervals = () => {

    if (!availability) {
      return [];
    }

    const doctorAvailabilityMap = [];
    const dayID = selectedDate?.day().toString();

    const dayOfWeek = findDayOfWeek(dayID, availability);
      
    if (!availability[dayOfWeek]) {
      return [];
    }
  
    const dayOfWeek = selectedDate?.day().toString();

    // get the shift start and end times for the selected day of the week from the doctor's availability
    const { start_time, end_time } = availability[dayOfWeek];
    // set the start and end times for the appointment
    const [startHours, startMinutes, startSeconds] = start_time
      .split(":")
      .map(Number);
    // set the start and end times for the appointment
    const [endHours, endMinutes, endSeconds] = end_time.split(":").map(Number);

    // create a new date object with the start time
    let currTime = new Date(0, 0, 0, startHours, startMinutes, startSeconds);

    // create a new date object with the end time
    const endTime = new Date(0, 0, 0, endHours, endMinutes, endSeconds);

    // while the current time is less than the end time, add 30 minutes to the current time
    while (currTime < endTime) {
      // format the current time to "hh:mm A" using moment.js
      const formattedTime = moment(currTime).format("hh:mm A");
      // add the formatted time to the doctor availability map
      doctorAvailabilityMap.push(formattedTime);
      // add 30 minutes to the current time
      currTime.setMinutes(currTime.getMinutes() + 30);
    }

    // done
    return doctorAvailabilityMap;
  };
  
  let availableTimes; 

  if (availability.length > 0) {
    availableTimes = generateAppointmentIntervals();
  } else {
    availableTimes = [];
  }

  // availableTimes = generateAppointmentIntervals();

  useEffect(() => {
    // Fetch the professional's availability when the component mounts
    axios
      .get(`${BASE_URL}/api/appointments/availability/${professionalId}`)
      .then((response) => {
        setAvailability(response.data);
        // console.log("Response data:", response.data)
      })
      .catch((error) => console.error(error));
  }, [professionalId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // make the date the format it needs to be for the backend
    const selectedDateFormatted = selectedDate.format("YYYY-MM-DD");
    const formattedStartTime = convertToTimeFormat(selectedTimeStart);
    // calculate the end time (add 30 minutes to seledtedTimeStart)
    const formattedEndTime = moment(formattedStartTime, "HH:mm:ss")
      .add(30, "minutes")
      .format("HH:mm:ss");

    // Send a POST request to create the appointment
    axios
      .post(`${BASE_URL}/api/appointments/booking`, {
        user_id: localStorage.getItem("userId"),
        professional_id: professionalId,
        appointment_start: selectedDateFormatted + " " + formattedStartTime,
        appointment_end: selectedDateFormatted + " " + formattedEndTime,
        status: "pending",
      })
      .then((response) => {
        // redirect the user to the upcoming appointments page
        // and we pass the appointment data to the page
        setDialogOpen(true); 
        setAppointmentData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error data:", error.response.data.message);
          setError(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
   <div>
      <Box className={classes.bannerBox2}>
        <Box>
          <Typography gutterBottom className={classes.bannerHeader2}>
            Book an Appointment
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.bannerSubHeading}>
            Select a Date and Time to Schedule your Appointment
          </Typography>
        </Box>
      </Box>
     <Grid container direction="column" alignItems="center" spacing={4}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {error && <Typography color="error" gutterBottom>{error}</Typography>}
        <Grid container item alignItems="center" justifyContent="center" spacing={10} className={classes.textContainr} >
          <Grid item>
            <Card> 
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom marginBottom={4}>
          Book an appointment
        </Typography>
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="h6" gutterBottom>
          Select a date and time
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          spacing={10}
        >
          <Grid item>
            <Card>
              <CardHeader title="Availability Time Table" />
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Day of week</TableCell>
                      <TableCell>Start time</TableCell>
                      <TableCell>End time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availability.map((avail, index) => {
                  const startTimeFormatted = moment(
                    avail.start_time,
                    "HH:mm:ss"
                  ).format("hh:mm A");
                  const endTimeFormatted = moment(
                    avail.end_time,
                    "HH:mm:ss"
                  ).format("hh:mm A");

                  return (
                    <TableRow key={index}>
                      <TableCell>{daysOfWeek[avail.day_of_week]}</TableCell>
                      <TableCell>{startTimeFormatted}</TableCell>
                      <TableCell>{endTimeFormatted}</TableCell>
                    </TableRow>
                  );
                })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {availability.map((avail, index) => {
                      const startTimeFormatted = moment(
                        avail.start_time,
                        "HH:mm:ss"
                      ).format("hh:mm A");
                      const endTimeFormatted = moment(
                        avail.end_time,
                        "HH:mm:ss"
                      ).format("hh:mm A");

                      return (
                        <TableRow key={index}>
                          <TableCell>
                            {daysOfWeek[(avail.day_of_week + 6) % 7]}
                          </TableCell>
                          <TableCell>{startTimeFormatted}</TableCell>
                          <TableCell>{endTimeFormatted}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <DateCalendar 
              disablePast 
              value={selectedDate} 
              onChange={handleDataChange} 
              sx={{ width: 400, height: 400, }}
              />
          </Grid>
          <Grid item>
            <Grid item className={classes.mainContainer}>
            {availableTimes?.length > 0 ? (
              <div className={classes.timeGridContainer}>
                <Typography variant="h6" gutterBottom>
                      Select a time for {selectedDate.format("dddd, MMMM D, YYYY")}
                </Typography>
                <Grid item className={classes.timeGrid}>
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant="contained"
                        onClick={() => {
                          setSelectedTimeStart(time);
                          setError('');
                          setTimeSlotPicked(true);
                        }}
                        className={timeSlotPicked && time === selectedTimeStart ? classes.appointmentButtonsActive : classes.appointmentButtons}
                      >
                        {time}
                      </Button>
                    ))}
                </Grid>
              </div>
            ) : (
              <Grid item>
                <Typography variant="h6" gutterBottom textAlign="center">
                  No available times for
                </Typography>
                <Typography variant="h6" gutterBottom textAlign="center">
                  {selectedDate.format("dddd, MMMM D, YYYY")}
                </Typography>
              </Grid>
            )}
            </Grid>
            <DateCalendar
              disablePast
              value={selectedDate}
              onChange={handleDataChange}
            />
          </Grid>
          <Grid item className={classes.timeGrid}>
            {availableTimes.map((time) => (
              <Button
                key={time}
                variant="contained"
                className={classes.appointmentButtons}
                onClick={() => {
                  setSelectedTimeStart(time);
                  setError("");
                }}
                size="medium"
              >
                {time}
              </Button>
            ))}
          </Grid>
        </Grid>
      </LocalizationProvider>
      <form onSubmit={handleSubmit} className={classes.appointmentForm}>
        <Button type="submit" variant="contained" 
          className={classes.appointmentButtons}
            >
              Book Appointment
        </Button>
      </form>
    </Grid>
    <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        className={classes.dialog}
    >
        <DialogContent>
          <AppointmentConfirmed appointmentData={appointmentData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className={classes.appointmentButtons}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
