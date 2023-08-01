import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay, unavailable }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
  ...(unavailable && {
    color: theme.palette.text.disabled,
  }),
}));

function Day(props) {
  const { day, selectedDay, unavailable, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const start = selectedDay.startOf('week');
  const end = selectedDay.endOf('week');

  const dayIsBetween = day.isBetween(start, end, null, '[]');
  const isFirstDay = day.isSame(start, 'day');
  const isLastDay = day.isSame(end, 'day');

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={dayIsBetween ? { px: 2.5, mx: 0 } : {}}
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
      unavailable={unavailable}
    />
  );
}

export default function AppointmentCalendar() {
  const [availability, setAvailability] = useState([]);

  // State for holding the date for the appointment, starts off at today by default
  const [selectedDate, setSelectedDate] = useState(dayjs());
  // State for holding the time for the appointment (starts off empty)
  const [selectedTime, setSelectedTime] = useState('');

  const BASE_URL = 'http://localhost:3001';
  const professionalId = 76;

  useEffect(() => {
    // Fetch the professional's availability when the component mounts
    axios
      .get(`${BASE_URL}/api/appointments/availability/${professionalId}`)
      .then((response) => {
        setAvailability(response.data);
        console.log('Response data:', response.data);
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


  // Dummy data for doctor availability (you can fetch this from the backend)
  const doctorAvailability = {
    '2023-07-31': ['09:00 AM', '10:00 AM', '11:00 AM'],
    '2023-08-01': ['02:00 PM', '03:00 PM', '04:00 PM'],
    '2023-08-02': [], // No availability for this day
  };

  // Handler to update the selected time
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    console.log('Time:', event.target.value)
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    console.log('Date:', date.format('YYYY-MM-DD'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex', flexDirection: 'column', width: "750px" }}>
        <div style={{ display: 'flex' }}>
          <DateCalendar
            disablePast
            value={selectedDate}
            onChange={handleDateChange}
            slots={{ day: Day }}
            slotProps={{
              day: {
                selectedDay: selectedDate,
                unavailable: !doctorAvailability[selectedDate.format('YYYY-MM-DD')],
              },
            }}
            // style={{ width: '500px', height: '700px' }}
            // mode="portrait"
          />
          <div style={{ marginLeft: '20px', flex: 1 }}>
            {doctorAvailability[selectedDate.format('YYYY-MM-DD')] && (
              <div>
                <h2>Available Times for {selectedDate.format('YYYY-MM-DD')}:</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {doctorAvailability[selectedDate.format('YYYY-MM-DD')].map((time) => (
                    <Button
                      key={time}
                      variant="contained"
                      color="primary"
                      value={time}
                      onClick={(event) => handleTimeChange(event)}
                      style={{ marginBottom: '10px' }}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {!doctorAvailability[selectedDate.format('YYYY-MM-DD')] && (
              <div>
                <h2>No available times for {selectedDate.format('YYYY-MM-DD')}.</h2>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained" color="primary">
            Book appointment
          </Button>
        </div>
      </div>
    </LocalizationProvider>
  );
}
