import React, { useEffect, useMemo } from 'react';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import styles from './Reporting.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchBookings } from '../../redux/slices/bookingSlice';
import { RootState } from '../../redux/store';
import ThemeToggle from '../../components/ThemeToggle';

const Reports: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: bookings, status, error } = useAppSelector((state: RootState) => state.booking);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const reportData = useMemo(() => {
    if (!bookings || bookings.length === 0) return null;

    const dayCounts: Record<string, number> = {};
    const dateCounts: Record<string, number> = {};

    bookings.forEach((booking: any) => {
      const dateObj = new Date(booking.date); // booking.date = "2025-04-25"
      const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      const dateStr = booking.date;

      dayCounts[day] = (dayCounts[day] || 0) + 1;
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
    });

    const mostBookedDay = Object.entries(dayCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    const mostBookedDate = Object.entries(dateCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    return {
      totalBookings: bookings.length,
      mostBookedDay,
      mostBookedDate,
    };
  }, [bookings]);

  if (status === 'loading') {
    return <div className={styles.container}><CircularProgress /></div>;
  }

  if (status === 'failed') {
    return <div className={styles.container}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* <ThemeToggle /> */}
      <Typography variant="h4" gutterBottom>Reports</Typography>

      <div className={styles.cards}>
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{reportData?.totalBookings || 0}</Typography>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h6">Most Bookings on Day</Typography>
            <Typography variant="h5">{reportData?.mostBookedDay || '-'}</Typography>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h6">Most Bookings on Date</Typography>
            <Typography variant="h5">{reportData?.mostBookedDate || '-'}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
