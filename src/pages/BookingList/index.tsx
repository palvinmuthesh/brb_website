import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme
} from '@mui/material';
import styles from './BookingList.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addBooking, fetchUserBooking, fetchBookings } from '../../redux/slices/bookingSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RootState } from '../../redux/store';
import SkeletonCard from '../../components/SkeletonCard';

const timeSlots = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM'
];

const BookingList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: bookList, status, error } = useAppSelector((state: RootState) => state.booking);
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user, JSON.parse(user!).user._id)
    try {
      if (JSON.parse(user!).user.role == "user") {
        dispatch(fetchUserBooking(JSON.parse(user!).user._id)).unwrap();
      } else {
        dispatch(fetchBookings());
      }
    } catch (error) {
      console.error('Booking Data error:', error);
    }
  }, [dispatch])

  if (status === "loading") {
    return (
      <div className={styles.container} style={{
        marginLeft: (screenWidth > 600) ? 240 : 0
      }}>
        <Typography variant="h4" gutterBottom>Booking List</Typography>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (status === "failed")
    return <div className={styles.error}>Error: {error}</div>;

  return (
    <Container className={styles.container} style={{ marginLeft: (screenWidth > 600) ? 240 : 0 }}>
      <Typography variant="h4" gutterBottom>Booking List</Typography>
      <div className={styles.grid}>
      {
        Array.isArray(bookList) && bookList.length > 0 ? bookList.map((books: any) =>
          <Card key={books._id} className={styles.card}>
            <CardMedia
              component="img"
              height="140"
              image={"https://t3.ftcdn.net/jpg/11/64/02/96/360_F_1164029674_4jVE2G6yTKuDopNfoK6ED9m3umcaYUIe.jpg"}
              alt={books._id}
            />
            <CardContent>
              <Typography variant="h6">{books.date}</Typography>
              <Typography variant="h6">{books.timeSlot}</Typography>
              <Typography variant="h6">{books.status}</Typography>
            </CardContent>
          </Card>
        )
          : <Typography>No bookings done.</Typography>}
      </div>
    </Container>
  );
};

export default BookingList;