import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import moment from "moment-timezone";
import UpdateAppointmentDialog from "../AppointmentScheduling/UpdateAppointment";

const BASE_URL = "http://localhost:3001";

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { id: userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/appointments/upcoming_appointments/${userId}`
      );
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (updatedAppointment) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/appointments/${updatedAppointment.appointment_id}`,
        updatedAppointment
      );
      // Update the appointment in your state
      setAppointments(
        appointments.map((app) =>
          app.appointment_id === updatedAppointment.appointment_id
            ? res.data.appointment
            : app
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`${BASE_URL}/api/appointments/${appointmentId}`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Appointment Start</TableCell>
            <TableCell>Appointment End</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => {
            const appointmentStart = moment(appointment.appointment_start)
              .tz("America/Los_Angeles")
              .format("YYYY-MM-DD HH:mm:ss");
            const appointmentEnd = moment(appointment.appointment_end)
              .tz("America/Los_Angeles")
              .format("YYYY-MM-DD HH:mm:ss");
            return (
              <TableRow key={appointment.appointment_id}>
                <TableCell>{appointmentStart}</TableCell>
                <TableCell>{appointmentEnd}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                  <UpdateAppointmentDialog
                    appointment={appointment}
                    onUpdate={handleUpdate}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      cancelAppointment(appointment.appointment_id)
                    }
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate(`/saved_medical_professionals/${userId}`);
        }}
      >
        Book New Appointment
      </Button>
    </TableContainer>
  );
}
