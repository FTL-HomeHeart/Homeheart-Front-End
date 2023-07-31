import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export default function UpdateAppointmentDialog({ appointment, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(appointment.appointment_start);
  const [end, setEnd] = useState(appointment.appointment_end);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onUpdate({
      ...appointment,
      appointment_start: start,
      appointment_end: end,
    });
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update this appointment, please enter the new start and end
            times.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="start"
            label="Start Time"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="end"
            label="End Time"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
