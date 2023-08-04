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
  Box,
} from "@material-ui/core";
import moment from "moment-timezone";
import UpdateAppointmentDialog from "./AppointmentScheduling/UpdateAppointment";
import { makeStyles } from "@material-ui/core/styles";
import PendingIcon from "@material-ui/icons/AccessTime";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const BASE_URL = "http://localhost:3001";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: "#fafafa",
    boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
  },
  tableHead: {
    backgroundColor: "#7693B0",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1em",
    borderBottom: "1px solid white",
    textAlign: "center",
  },
  tableCell: {
    color: "#7693B0",
    fontSize: "1em",
    textAlign: "center",
  },
  button: {
    margin: "20px auto",
    display: "block",
    backgroundColor: "#7693B0",
    color: "white",
    "&:hover": {
      backgroundColor: "#567AA3",
    },
    width: "200px",
    height: "40px",
  },
  bookButton: {
    margin: "20px auto",
    display: "block",
    backgroundColor: "#7693B0",
    color: "white",
    "&:hover": {
      backgroundColor: "#567AA3",
    },
    width: "200px",
    height: "60px",
  },
  cancelButton: {
    marginLeft: "10px",
    backgroundColor: "#f50057",
    color: "white",
    "&:hover": {
      backgroundColor: "#c51162",
    },
    paddingLeft: "45px",
    paddingRight: "45px",
  },
  tableContainer: {
    borderRadius: "15px",
    margin: "20px 0",
    maxWidth: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "150px",
  },
  statusPending: {
    display: "flex",
    alignItems: "center",
  },
  pendingIcon: {
    color: "#7693B0",
    marginRight: "5px",
  },
  updateButton: {
    backgroundColor: "#7693B0",
    color: "white",
    "&:hover": {
      backgroundColor: "#567AA3",
    },
  },
  dialog: {
    backgroundColor: "transparent",
    height: "90%",
  },
  dialogContent: {
    color: "#7693B0",
  },
  dialogTitle: {
    color: "#7693B0",
    marginTop: "20px",
  },
  cancelNoButton: {
    color: "#7693B0",
    marginBottom: "20px",
    border: "1px solid #7693B0",
  },
  confirmYesButton: {
    color: "red",
    marginRight: "20px",
    marginBottom: "20px",
    border: "1px solid red",
  },
});

export default function UpcomingAppointments() {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
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

  const handleCancelClick = (appointmentId) => {
    setAppointmentToCancel(appointmentId);
    setDialogOpen(true);
  };

  const cancelAppointment = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/appointments/${appointmentToCancel}`);
      setDialogOpen(false);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableHeadCell}>Date</TableCell>
            <TableCell className={classes.tableHeadCell}>
              Appointment Start
            </TableCell>
            <TableCell className={classes.tableHeadCell}>
              Appointment End
            </TableCell>
            <TableCell className={classes.tableHeadCell}>Status</TableCell>
            <TableCell className={classes.tableHeadCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => {
            const appointmentStart = moment(appointment.appointment_start)
              .tz("America/Los_Angeles")
              .format("hh:mm A");
            const appointmentEnd = moment(appointment.appointment_end)
              .tz("America/Los_Angeles")
              .format("hh:mm A");
            const appointmentDate = moment(appointment.appointment_start)
              .tz("America/Los_Angeles")
              .format("MM-DD-YYYY");
            return (
              <TableRow key={appointment.appointment_id}>
                <TableCell className={classes.tableCell}>
                  {appointmentDate}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {appointmentStart}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {appointmentEnd}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <div className={classes.statusPending}>
                    {appointment.status === "pending" && (
                      <PendingIcon className={classes.pendingIcon} />
                    )}
                    {appointment.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={classes.actionButtons}>
                    <UpdateAppointmentDialog
                      appointment={appointment}
                      onUpdate={handleUpdate}
                      className={classes.updateButton}
                    />
                    <Button
                      variant="contained"
                      className={classes.cancelButton}
                      onClick={() =>
                        handleCancelClick(appointment.appointment_id)
                      }
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          className={classes.dialog}
        >
          <DialogTitle className={classes.dialogTitle}>
            {"Are you sure you want to cancel this appointment?"}
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              className={classes.cancelNoButton}
            >
              No
            </Button>
            <Button
              onClick={cancelAppointment}
              color="primary"
              autoFocus
              className={classes.confirmYesButton}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Table>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          className={classes.bookButton}
          onClick={() => {
            navigate(`/saved_medical_professionals/${userId}`);
          }}
        >
          Book New Appointment
        </Button>
      </Box>
    </TableContainer>
  );
}
