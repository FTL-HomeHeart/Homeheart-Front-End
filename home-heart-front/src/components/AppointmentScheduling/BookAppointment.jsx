import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { TimePicker } from "@mui/lab";
import moment from "moment-timezone";

const BASE_URL = "http://localhost:3001";

export default function BookAppointment() {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeStart, setSelectedTimeStart] = useState(null);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);

  const { professionalId } = useParams();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    // Fetch the professional's availability when the component mounts
    axios
      .get(`${BASE_URL}/api/appointments/availability/${professionalId}`)
      .then((response) => {
        setAvailability(response.data);
      })
      .catch((error) => console.error(error));
  }, [professionalId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a POST request to create the appointment
    axios
      .post(`${BASE_URL}/api/appointments/booking`, {
        user_id: localStorage.getItem("userId"),
        professional_id: professionalId,
        appointment_start: selectedDate + " " + selectedTimeStart,
        appointment_end: selectedDate + " " + selectedTimeEnd,
        status: "pending",
      })
      .then((response) => {
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error data:", error.response.data);
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
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4">Book an appointment</Typography>
      </Grid>

      <Grid item>
        <Typography variant="h6">My availability</Typography>
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
          </TableBody>
        </Table>
      </Grid>

      <Grid item>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Select date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />

          <TextField
            label="Select session start time"
            type="time"
            value={selectedTimeStart}
            onChange={(e) => setSelectedTimeStart(e.target.value)}
            required
          />

          <TextField
            label="Select session end time"
            type="time"
            value={selectedTimeEnd}
            onChange={(e) => setSelectedTimeEnd(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Book appointment
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
