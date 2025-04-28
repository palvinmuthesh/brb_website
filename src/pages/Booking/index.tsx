import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  useTheme
} from '@mui/material';
import styles from './Booking.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addBooking } from '../../redux/slices/bookingSlice';
import { toast } from 'react-toastify';

const timeSlots = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM'
];

const Booking: React.FC = () => {
  const { vendorId, serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const [formData, setFormData] = useState({
    userId: '',
    date: '',
    timeSlot: '',
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setFormData(prev => ({
        ...prev,
        userId: parsed?.user?._id || ''
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(addBooking({
        ...formData,
        vendorId,
        serviceId
      })).unwrap();
      toast.success('Booking successful!', {
        position: 'top-right',
      });
      navigate('/confirmation');
    } catch (error: any) {
      console.error('Booking error:', error);
      alert('This time slot is already booked.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cloudBackground}></div>

      <Container className={styles.container} style={{
                background: isLight ? '#ffffff' : '#1e1e1e',
                boxShadow: isLight
                  ? '0 4px 20px rgba(0, 0, 0, 0.1)'
                  : '0 4px 20px rgba(0, 0, 0, 0.5)',
                // color: isLight ? 'black' : 'white'
              }}>
        <Typography variant="h5" gutterBottom>Book Your Service</Typography>
        <form className={styles.form}>
          <TextField
            label="User ID"
            name="userId"
            value={formData.userId}
            disabled
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Time Slot"
            name="timeSlot"
            select
            value={formData.timeSlot}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {timeSlots.map(slot => (
              <MenuItem key={slot} value={slot}>
                {slot}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            style={{width: "max-content", alignSelf: "center"}}
          >
            Confirm Booking
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Booking;
