import {
  makeStyles,
  Snackbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import { FormControl, InputLabel, Input } from "@material-ui/core";

const useStyles = makeStyles({
  dialog: {
    backgroundColor: "transparent",
    borderRadius: "15px",
  },
  button: {
    color: "#7693B0",
  },
  saveButton: {
    color: "green",
  },
  closeButton: {
    position: "absolute",
    right: "5px",
    top: "5px",
    color: "#7693B0",
  },
});

export default function UpdateAppointmentDialog({ appointment, onUpdate }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(appointment.appointment_start);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 30); // duration is always 30 minutes
    onUpdate({
      ...appointment,
      appointment_start: start,
      appointment_end: end.toISOString(),
    });
    setOpen(false);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Update
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">
          Update Appointment
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update this appointment, please enter the new start time.
          </DialogContentText>

          <FormControl fullWidth>
            <TextField
              id="start-time"
              label="Start Time"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button className={classes.saveButton} onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Appointment updated successfully"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}
